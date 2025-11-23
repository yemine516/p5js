// ================== 전역 변수 ==================
let autoBlink = true;
let headTilt = 0;
let demo = false;
let demoStart = 0;
let blushOffset = 0;
let cloudOffset = 0;
let earringScale = 1; // 귀걸이 크기
let bgColor; 
let bgColors = [
  [135, 206, 235], // 1: 하늘색
  [255, 228, 225], // 2: 연분홍
  [200, 255, 200]  // 3: 연녹색
];

// ================== 세팅 ==================
function setup(){
  createCanvas(600, 400);
  frameRate(60);
  bgColor = bgColors[0]; 
}

// ================== 메인 draw ==================
function draw(){
  background(bgColor[0], bgColor[1], bgColor[2]);

  const t = frameCount / 60.0;

  if (demo){
    const dt = (frameCount - demoStart) / 60.0;
    headTilt = sin(dt * 2.2) * PI/40;
    autoBlink = true;
    if (dt >= 10){
      demo = false;
      headTilt = 0;
      autoBlink = true;
    }
  }

  // 구름 애니메이션
  cloudOffset += 0.3;
  drawCloud(cloudOffset, 80, 80);
  drawCloud(cloudOffset*0.6 + 200, 60, 120);
  drawCloud(cloudOffset*0.8 + 400, 100, 100);

  // 머리 기울기 적용
  push();
  translate(width/2, height/2);
  rotate(headTilt);
  translate(-width/2, -height/2);
  drawCaricature();
  pop();

  // 안내 텍스트
  push();
  noStroke(); fill(0, 80);
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text(
    "[마우스] 눈동자 추적 / 클릭: 볼터치+웃음\n" +
    "[←/→] 귀걸이 크기  [SPACE] 눈 깜박임 ON/OFF  [D] 데모\n" +
    "[G] GIF 저장  [1/2/3] 배경색 변경", 
    12, height-12
  );
  pop();
}

// ================== 키보드 제어 ==================
function keyPressed(){
  if (keyCode === LEFT_ARROW)  earringScale = max(0.5, earringScale - 0.05);
  if (keyCode === RIGHT_ARROW) earringScale = min(2, earringScale + 0.05);
  if (key === ' ') autoBlink = !autoBlink;
  if (key === 'D' || key === 'd'){ demo = true; demoStart = frameCount; }
  if (key === 'G' || key === 'g'){ 
    if (typeof saveGif === 'function'){ saveGif('caricature_heart', 10); }
  }
  if (key === '1') bgColor = bgColors[0];
  if (key === '2') bgColor = bgColors[1];
  if (key === '3') bgColor = bgColors[2];
}

// ================== 마우스 제어 ==================
function mouseMoved(){
  blushOffset = map(mouseY, 0, height, -5, 5);
}

// ================== 캐리커쳐 ==================
function drawCaricature(){
  const skin = color(245, 215, 185);
  const blushBase = color(255, 100, 120, 130);
  const blushActive = color(255, 120, 150, 170);
  const hair = color(92, 62, 36);
  const hairShadow = color(60, 40, 24, 150);
  const irisCol = color(110, 75, 45);
  const pupilCol = color(20);
  const eyeWhite = color(255);
  const lipTop = color(240, 90, 120);
  const lipBot = color(230, 70, 110);
  const shirt = color(22);

  const cx = width*0.5;
  const cy = height*0.48;

  const blinkPhase = (autoBlink ? (0.5 - 0.5*cos((frameCount%180)/180*PI*2)) : 0);
  const smileK = mouseIsPressed ? 1 : 0.55;
  const blushCol = mouseIsPressed ? blushActive : blushBase;

  function eyeOffset(ex, ey){
    const dx = mouseX - ex, dy = mouseY - ey;
    const len = sqrt(dx*dx + dy*dy) || 1;
    const m = min(6, len*0.15);
    return {ox: dx/len * m, oy: dy/len * m};
  }

  // ---------------- 헤어 뒤쪽 ----------------
  fill(hair); noStroke();
  ellipse(cx, cy-30, 260, 230);
  rect(cx-150, cy-20, 60, 210, 20);
  rect(cx+90,  cy-20, 60, 210, 20);

  // ---------------- 상의 ----------------
  fill(shirt);
  rect(cx-165, cy+115, 330, 90, 18);

  // ---------------- 목 ----------------
  fill(skin);
  noStroke();
  beginShape();
  vertex(cx-26, cy+100);
  bezierVertex(cx-36, cy+150, cx-20, cy+160, cx, cy+160);
  bezierVertex(cx+20, cy+160, cx+36, cy+150, cx+26, cy+100);
  endShape(CLOSE);

  fill(200, 160, 130, 120);
  beginShape();
  vertex(cx-26, cy+100);
  bezierVertex(cx-26, cy+120, cx-16, cy+140, cx, cy+140);
  bezierVertex(cx+16, cy+140, cx+26, cy+120, cx+26, cy+100);
  endShape(CLOSE);

  // ---------------- 얼굴 ----------------
  fill(skin);
  ellipse(cx, cy, 210, 250);
  ellipse(cx-110, cy+10, 26, 40);
  ellipse(cx+110, cy+10, 26, 40);

  // ---------------- 앞머리 ----------------
  fill(hair);
  arc(cx, cy-74, 210, 120, PI, TWO_PI);
  noStroke();
  for(let x=cx-92; x<=cx+92; x+=16){ circle(x, cy-74, 14); }

  noFill(); stroke(hairShadow); strokeWeight(2);
  arc(cx, cy-78, 200, 130, PI, TWO_PI);

  // ---------------- 블러셔 ----------------
  fill(blushCol); noStroke();
  ellipse(cx-56, cy+28 + blushOffset, 48, 28);
  ellipse(cx+56, cy+28 + blushOffset, 48, 28);

  // ---------------- 눈 ----------------
  const eyeY = cy-12;
  const eyeW = 82;
  const eyeH = 36 * (1-blinkPhase);
  fill(eyeWhite);
  ellipse(cx-58, eyeY, eyeW, max(eyeH,2));
  ellipse(cx+58, eyeY, eyeW, max(eyeH,2));

  if (eyeH > 4) { 
    const L = eyeOffset(cx-58, eyeY);
    const R = eyeOffset(cx+58, eyeY);
    fill(irisCol);
    ellipse(cx-58 + L.ox, eyeY + L.oy, 34, 34);
    ellipse(cx+58 + R.ox, eyeY + R.oy, 34, 34);

    fill(pupilCol);
    circle(cx-58 + L.ox, eyeY + L.oy, 16);
    circle(cx+58 + R.ox, eyeY + R.oy, 16);

    fill(255,255,255,230);
    circle(cx-50 + L.ox, eyeY-6 + L.oy, 6);
    circle(cx+60 + R.ox, eyeY-6 + R.oy, 6);
  }

  noFill(); stroke(30); strokeWeight(3.6);
  arc(cx-58, eyeY+2, eyeW, eyeH, PI, TWO_PI);
  arc(cx+58, eyeY+2, eyeW, eyeH, PI, TWO_PI);

  // 속눈썹
  stroke(20); strokeWeight(2.6);
  const lash = (ex, dir)=>{
    for(let i=0;i<8;i++){
      const lx = ex + dir * (14 + i*3.2);
      const ly = eyeY - 2 - i*0.2;
      line(ex, eyeY-13, lx, ly);
    }
  };
  lash(cx-74, -1); lash(cx+74, 1);

  // ---------------- 코 ----------------
  noFill(); stroke(120, 90, 70); strokeWeight(2);
  line(cx, cy, cx, cy+12);
  arc(cx-7, cy+16, 14, 8, 0, PI);
  arc(cx+7, cy+16, 14, 8, 0, PI);

  // ---------------- 입술 ----------------
  noStroke(); fill(lipBot);
  arc(cx, cy+60, 58, 20*smileK, 0, PI);

  // ---------------- 눈썹 ----------------
  stroke(50, 35, 20); strokeWeight(3.2);
  line(cx-86, cy-40, cx-28, cy-40);
  line(cx+28, cy-40, cx+86, cy-40);

  // ---------------- 귀걸이 하트 ----------------
  drawHeartEarring(cx-110, cy+35, earringScale);
  drawHeartEarring(cx+110, cy+35, earringScale);

  // ---------------- 프레임 ----------------
  noFill(); stroke(0,0,0,35); strokeWeight(2);
  rect(12, 12, width-24, height-24);
}

// ================== 하트 귀걸이 ==================
function drawHeartEarring(x, y, s=1){
  push();
  translate(x, y);
  rotate(sin(frameCount*0.15) * PI/40);
  scale(s);
  fill(255); noStroke();
  beginShape();
  vertex(0,0);
  bezierVertex(-6,-6,-12,4,0,12);
  bezierVertex(12,4,6,-6,0,0);
  endShape(CLOSE);
  stroke(200,180,0); strokeWeight(2);
  line(0, -12, 0, 0);
  pop();
}

// ================== 구름 ==================
function drawCloud(x, y, size){
  x = x % width;
  noStroke();
  fill(255, 255, 255, 230);
  ellipse(x, y, size, size*0.6);
  ellipse(x+size*0.4, y-10, size*0.8, size*0.5);
  ellipse(x-size*0.4, y-5, size*0.7, size*0.4);
}
