function setup() {
  createCanvas(600, 400);
  noLoop();

  const base = min(width, height); // 400
  const M = base * 0.05;           // 안전 여백

  // 0) 네온이 잘 받치는 다크 배경 + 은은한 레이어링
  background(8, 6, 12);
  noStroke();
  for (let y = 0; y < height; y += 8) {
    const t = y / height;
    fill(30 * (1 - t), 12 + 24 * t, 40 + 80 * t, 32);
    rect(0, y, width, 10);
  }

  // 1) 그래피티 패널(사각형/정사각형/사변형) — 힙한 배경 요소
  // 좌측 네온 패널
  fill(30, 220, 200, 30);
  stroke(40, 240, 220, 120);
  strokeWeight(3);
  rect(M * 1.2, M * 1.2, width * 0.28, height * 0.22);
  // 우측 상단 정사각
  fill(255, 60, 160, 26);
  stroke(255, 100, 200, 150);
  square(width - M * 1.2 - width * 0.18, M * 1.3, width * 0.18);
  // 하단 사변형 라벨
  fill(255, 220, 60, 26);
  stroke(255, 220, 120, 150);
  quad(
    width * 0.12, height * 0.80,
    width * 0.40, height * 0.76,
    width * 0.44, height * 0.92,
    width * 0.16, height * 0.94
  );

  // 2) 네온 링(원/타원) — 무대 같은 오라
  noFill();
  stroke(120, 200, 255, 120);
  strokeWeight(3);
  circle(width * 0.5, height * 0.55, base * 0.70);
  stroke(255, 90, 180, 120);
  ellipse(width * 0.5, height * 0.55, base * 0.80, base * 0.42);

  // 3) 고양이 얼굴(원) + 귀(삼각형)
  const cx = width * 0.5;
  const cy = height * 0.55;
  const faceR = base * 0.22; // 얼굴 반지름

  // 얼굴: 네온 테두리
  stroke(80, 255, 220);
  strokeWeight(4);
  fill(10, 10, 18, 180);
  circle(cx, cy, faceR * 2);

  // 귀: 삼각형 2개
  fill(20, 20, 28, 200);
  stroke(255, 120, 220);
  strokeWeight(4);
  triangle(cx - faceR * 0.9, cy - faceR * 0.2, cx - faceR * 0.35, cy - faceR * 1.25, cx - faceR * 0.05, cy - faceR * 0.25);
  triangle(cx + faceR * 0.9, cy - faceR * 0.2, cx + faceR * 0.35, cy - faceR * 1.25, cx + faceR * 0.05, cy - faceR * 0.25);

  // 귀 안쪽(작은 삼각형)
  fill(255, 80, 200, 90);
  noStroke();
  triangle(cx - faceR * 0.65, cy - faceR * 0.25, cx - faceR * 0.40, cy - faceR * 0.95, cx - faceR * 0.15, cy - faceR * 0.32);
  triangle(cx + faceR * 0.65, cy - faceR * 0.25, cx + faceR * 0.40, cy - faceR * 0.95, cx + faceR * 0.15, cy - faceR * 0.32);

  // 4) 눈(타원) + 하이라이트(작은 원)
  fill(0, 220, 160, 180);
  stroke(0, 250, 200);
  strokeWeight(3);
  ellipse(cx - faceR * 0.45, cy - faceR * 0.10, faceR * 0.40, faceR * 0.22);
  ellipse(cx + faceR * 0.45, cy - faceR * 0.10, faceR * 0.40, faceR * 0.22);
  noStroke();
  fill(255, 255, 255, 160);
  circle(cx - faceR * 0.52, cy - faceR * 0.14, faceR * 0.08);
  circle(cx + faceR * 0.38, cy - faceR * 0.14, faceR * 0.08);

  // 5) 코(삼각형) + 입(선 2개 V자)
  fill(255, 120, 160);
  noStroke();
  const noseY = cy + faceR * 0.02;
  triangle(cx - faceR * 0.06, noseY, cx + faceR * 0.06, noseY, cx, noseY + faceR * 0.08);
  stroke(255, 140, 200);
  strokeWeight(3);
  line(cx, noseY + faceR * 0.08, cx - faceR * 0.10, noseY + faceR * 0.16);
  line(cx, noseY + faceR * 0.08, cx + faceR * 0.10, noseY + faceR * 0.16);

  // 6) 수염(선)
  stroke(120, 250, 255);
  strokeWeight(2.5);
  // 좌측 수염 3줄
  line(cx - faceR * 0.15, noseY + faceR * 0.06, cx - faceR * 0.70, noseY);
  line(cx - faceR * 0.15, noseY + faceR * 0.09, cx - faceR * 0.72, noseY + faceR * 0.10);
  line(cx - faceR * 0.15, noseY + faceR * 0.12, cx - faceR * 0.68, noseY + faceR * 0.20);
  // 우측 수염 3줄
  line(cx + faceR * 0.15, noseY + faceR * 0.06, cx + faceR * 0.70, noseY);
  line(cx + faceR * 0.15, noseY + faceR * 0.09, cx + faceR * 0.72, noseY + faceR * 0.10);
  line(cx + faceR * 0.15, noseY + faceR * 0.12, cx + faceR * 0.68, noseY + faceR * 0.20);

  // 7) 네온 목걸이(사각형 + 원)
  fill(255, 230, 70, 60);
  stroke(255, 230, 120);
  strokeWeight(3);
  rect(cx - faceR * 0.65, cy + faceR * 0.55, faceR * 1.3, faceR * 0.18, 0);
  noStroke();
  fill(255, 200, 100);
  circle(cx, cy + faceR * 0.65, faceR * 0.16);

  // 8) 스파클/별(점/작은 원) — 네온 팝업
  stroke(255, 255, 255, 180);
  const stars = [
    [width*0.12, height*0.18], [width*0.20, height*0.30], [width*0.32, height*0.12],
    [width*0.76, height*0.20], [width*0.86, height*0.28], [width*0.72, height*0.12]
  ];
  for (let i = 0; i < stars.length; i++) {
    strokeWeight(i % 2 === 0 ? 3 : 2);
    point(stars[i][0], stars[i][1]);
  }
  noFill();
  stroke(255, 120, 220, 120);
  strokeWeight(2);
  circle(width*0.86, height*0.28, base*0.06);
  stroke(120, 255, 220, 120);
  circle(width*0.12, height*0.18, base*0.05);

  // 9) 프레임(사각형) — 캔버스 안쪽 테두리
  noFill();
  stroke(255, 255, 255, 24);
  strokeWeight(2);
  rect(M, M, width - 2*M, height - 2*M);
}
