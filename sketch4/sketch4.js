function setup() {
  createCanvas(600, 400);
  frameRate(30); // GIF 용량 줄이기용
}

function draw() {
  const base = min(width, height); // 400
  const M = base * 0.05;           // 안전 여백
  const t = frameCount * 0.03;     // 시간 값

  // 0) 네온이 잘 받치는 다크 배경 + 스캔라인이 위아래로 살짝 움직이는 느낌
  background(8, 6, 12);
  noStroke();
  for (let y = 0; y < height; y += 8) {
    let ty = y + 12 * sin(t * 0.2);      // 줄무늬가 살짝 위아래로 출렁
    const v = constrain(ty, 0, height) / height;
    fill(30 * (1 - v), 12 + 24 * v, 40 + 80 * v, 32);
    rect(0, ty, width, 10);
  }

  // ===== 색상 보간용 색 정의 =====
  const panelC1 = color(30, 220, 200, 30);
  const panelC2 = color(80, 255, 240, 80);
  const panelMix = (sin(t * 0.7) + 1) / 2;

  const squareC1 = color(255, 60, 160, 26);
  const squareC2 = color(255, 140, 220, 90);
  const squareMix = (sin(t * 0.9 + 1.2) + 1) / 2;

  const labelC1 = color(255, 220, 60, 26);
  const labelC2 = color(255, 250, 160, 80);
  const labelMix = (sin(t * 0.8 + 2.2) + 1) / 2;

  // 1) 그래피티 패널(사각형/정사각형/사변형) — 힙한 배경 요소
  // 좌측 네온 패널 (색상 천천히 변함)
  fill(lerpColor(panelC1, panelC2, panelMix));
  stroke(40, 240, 220, 150);
  strokeWeight(3);
  rect(M * 1.2, M * 1.2, width * 0.28, height * 0.22);

  // 우측 상단 정사각 (색상 보간 + 살짝 위아래 이동)
  let squareY = M * 1.3 + 5 * sin(t * 0.6);
  fill(lerpColor(squareC1, squareC2, squareMix));
  stroke(255, 100, 200, 180);
  square(width - M * 1.2 - width * 0.18, squareY, width * 0.18);

  // 하단 사변형 라벨 (색상 보간 + 살짝 좌우 흔들림)
  fill(lerpColor(labelC1, labelC2, labelMix));
  stroke(255, 220, 120, 170);
  let labelShift = 8 * sin(t * 0.5);
  quad(
    width * 0.12 + labelShift, height * 0.80,
    width * 0.40 + labelShift, height * 0.76,
    width * 0.44 + labelShift, height * 0.92,
    width * 0.16 + labelShift, height * 0.94
  );

  // 2) 네온 링(원/타원) — 숨 쉬듯 크기 변화
  noFill();
  let rPulse = 10 * sin(t * 0.7);
  stroke(120, 200, 255, 150);
  strokeWeight(3);
  circle(width * 0.5, height * 0.55, base * 0.70 + rPulse);

  stroke(255, 90, 180, 150);
  let rw = base * 0.80 + rPulse * 1.1;
  let rh = base * 0.42 + rPulse * 0.6;
  ellipse(width * 0.5, height * 0.55, rw, rh);

  // 3) 고양이 얼굴(원) + 귀(삼각형)
  const cx = width * 0.5;
  const cy = height * 0.55;
  const faceR = base * 0.22; // 얼굴 반지름

  // 얼굴: 테두리 색이 조금씩 변함
  let faceGlowA = color(80, 255, 220);
  let faceGlowB = color(180, 255, 200);
  let faceMix = (sin(t * 0.9) + 1) / 2;
  stroke(lerpColor(faceGlowA, faceGlowB, faceMix));
  strokeWeight(4);
  fill(10, 10, 18, 200);
  circle(cx, cy, faceR * 2);

  // 귀(삼각형 2개)
  fill(20, 20, 28, 220);
  stroke(255, 120, 220);
  strokeWeight(4);
  triangle(cx - faceR * 0.9, cy - faceR * 0.2,
           cx - faceR * 0.35, cy - faceR * 1.25,
           cx - faceR * 0.05, cy - faceR * 0.25);
  triangle(cx + faceR * 0.9, cy - faceR * 0.2,
           cx + faceR * 0.35, cy - faceR * 1.25,
           cx + faceR * 0.05, cy - faceR * 0.25);

  // 귀 안쪽(작은 삼각형)
  fill(255, 80, 200, 120);
  noStroke();
  triangle(cx - faceR * 0.65, cy - faceR * 0.25,
           cx - faceR * 0.40, cy - faceR * 0.95,
           cx - faceR * 0.15, cy - faceR * 0.32);
  triangle(cx + faceR * 0.65, cy - faceR * 0.25,
           cx + faceR * 0.40, cy - faceR * 0.95,
           cx + faceR * 0.15, cy - faceR * 0.32);

  // 4) 눈(타원) + 하이라이트(작은 원) — 깜빡임 + 살짝 확대/축소
  // 깜빡임: 0~1 값
  let blinkPhase = 0.5 - 0.5 * cos((frameCount % 120) / 120 * TWO_PI);
  let eyeScaleY = 1 - 0.6 * blinkPhase; // Y축 줄어듦

  fill(0, 220, 160, 200);
  stroke(0, 250, 200);
  strokeWeight(3);
  let eyeW = faceR * 0.40;
  let eyeH = faceR * 0.22 * eyeScaleY;
  ellipse(cx - faceR * 0.45, cy - faceR * 0.10, eyeW, max(eyeH, 3));
  ellipse(cx + faceR * 0.45, cy - faceR * 0.10, eyeW, max(eyeH, 3));

  // 눈 하이라이트는 둥둥 떠다니는 느낌
  noStroke();
  fill(255, 255, 255, 180);
  let hlOffset = 4 * sin(t * 1.5);
  circle(cx - faceR * 0.52, cy - faceR * 0.14 + hlOffset, faceR * 0.08);
  circle(cx + faceR * 0.38, cy - faceR * 0.14 + hlOffset, faceR * 0.08);

  // 5) 코(삼각형) + 입(선 2개 V자) — 입은 살짝 위아래로 (숨쉬는 느낌)
  fill(255, 120, 160);
  noStroke();
  const noseYBase = cy + faceR * 0.02;
  const noseY = noseYBase + 2 * sin(t * 1.1);
  triangle(cx - faceR * 0.06, noseY,
           cx + faceR * 0.06, noseY,
           cx, noseY + faceR * 0.08);

  stroke(255, 140, 200);
  strokeWeight(3);
  line(cx, noseY + faceR * 0.08, cx - faceR * 0.10, noseY + faceR * 0.16);
  line(cx, noseY + faceR * 0.08, cx + faceR * 0.10, noseY + faceR * 0.16);

  // 6) 수염(선) — 약간 살랑살랑 흔들리게
  stroke(120, 250, 255);
  strokeWeight(2.5);
  let whiskerWiggle = 6 * sin(t * 0.9);
  // 좌측 수염 3줄
  line(cx - faceR * 0.15, noseY + faceR * 0.06,
       cx - faceR * 0.70, noseY + whiskerWiggle * 0.0);
  line(cx - faceR * 0.15, noseY + faceR * 0.09,
       cx - faceR * 0.72, noseY + faceR * 0.10 + whiskerWiggle * 0.2);
  line(cx - faceR * 0.15, noseY + faceR * 0.12,
       cx - faceR * 0.68, noseY + faceR * 0.20 + whiskerWiggle * 0.4);
  // 우측 수염 3줄
  line(cx + faceR * 0.15, noseY + faceR * 0.06,
       cx + faceR * 0.70, noseY + whiskerWiggle * 0.0);
  line(cx + faceR * 0.15, noseY + faceR * 0.09,
       cx + faceR * 0.72, noseY + faceR * 0.10 + whiskerWiggle * 0.2);
  line(cx + faceR * 0.15, noseY + faceR * 0.12,
       cx + faceR * 0.68, noseY + faceR * 0.20 + whiskerWiggle * 0.4);

  // 7) 네온 목걸이(사각형 + 원) — 펜던트 크기 변화
  fill(255, 230, 70, 80);
  stroke(255, 230, 120);
  strokeWeight(3);
  rect(cx - faceR * 0.65, cy + faceR * 0.55, faceR * 1.3, faceR * 0.18, 0);

  noStroke();
  let pendantR = faceR * 0.16 * (1 + 0.15 * sin(t * 1.7));
  fill(255, 200, 100);
  circle(cx, cy + faceR * 0.65, pendantR);

  // 8) 스파클/별(점/작은 원) — 반짝임
  const stars = [
    [width * 0.12, height * 0.18],
    [width * 0.20, height * 0.30],
    [width * 0.32, height * 0.12],
    [width * 0.76, height * 0.20],
    [width * 0.86, height * 0.28],
    [width * 0.72, height * 0.12]
  ];
  for (let i = 0; i < stars.length; i++) {
    let tw = (sin(t * 1.3 + i) + 1) / 2;       // 0~1
    stroke(255, 255, 255, 140 + 80 * tw);
    strokeWeight(i % 2 === 0 ? 3 : 2);
    point(stars[i][0], stars[i][1]);
  }
  noFill();
  stroke(255, 120, 220, 120 + 40 * sin(t * 0.7));
  strokeWeight(2);
  circle(width * 0.86, height * 0.28, base * 0.06);
  stroke(120, 255, 220, 120 + 40 * sin(t * 0.9));
  circle(width * 0.12, height * 0.18, base * 0.05);

  // 9) 프레임(사각형) — 캔버스 안쪽 테두리
  noFill();
  stroke(255, 255, 255, 24);
  strokeWeight(2);
  rect(M, M, width - 2 * M, height - 2 * M);
}

// GIF 저장: 's' 키 누르면 10초짜리 GIF
function keyPressed() {
  if (key === 's' || key === 'S') {
    if (typeof saveGif === 'function') {
      saveGif('hip_cat_neon', 10);
    }
  }
}