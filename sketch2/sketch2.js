function setup(){
  createCanvas(600, 400);
  noLoop();
  drawFriend();
}

function keyPressed(){
  if(key==='s' || key==='S') saveCanvas('caricature_friend_600x400','png');
}

function drawFriend(){
  // 팔레트
  const skin = color(245, 215, 185);
  const blush = color(255, 100, 120, 130);
  const hair = color(92, 62, 36);
  const hairShadow = color(60, 40, 24, 150);
  const iris = color(110, 75, 45);
  const pupil = color(20);
  const eyeWhite = color(255);
  const lipTop = color(240, 90, 120);
  const lipBot = color(230, 70, 110);
  const shirt = color(22);
  const earringColor = color(255); // 흰색 귀걸이

  // ---------------- 배경 (하늘색) ----------------
  background(135, 206, 235); // 밝은 하늘색

  // ---------------- 구름 ----------------
  drawCloud(80, 80, 80);
  drawCloud(300, 60, 120);
  drawCloud(480, 100, 100);

  const cx = width * 0.5;
  const cy = height * 0.48;

  // ---------------- 헤어 뒤쪽 ----------------
  fill(hair);
  noStroke();
  ellipse(cx, cy-30, 260, 230);

  const curlR = 24;
  function ringCurls(rx, ry, w, h, step){
    for(let a=0; a<360; a+=step){
      const rad = radians(a);
      const x = rx + cos(rad) * w/2;
      const y = ry + sin(rad) * h/2;
      circle(x, y, curlR);
    }
  }
  ringCurls(cx, cy-28, 270, 240, 22);

  rect(cx-150, cy-20, 60, 210, 20);
  rect(cx+90, cy-20, 60, 210, 20);

  // ---------------- 상의 ----------------
  fill(shirt);
  rect(cx-165, cy+115, 330, 90, 18);

  // ---------------- 목 ----------------
  fill(skin);
  noStroke();
  beginShape();
  vertex(cx-26, cy+100); // 왼쪽 상단
  bezierVertex(cx-36, cy+150, cx-20, cy+160, cx, cy+160); // 왼쪽 곡선
  bezierVertex(cx+20, cy+160, cx+36, cy+150, cx+26, cy+100); // 오른쪽 곡선
  endShape(CLOSE);

  // 목 그림자 (입체감)
  fill(200, 160, 130, 120);
  noStroke();
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
  for(let x=cx-92; x<=cx+92; x+=16){
    circle(x, cy-74, 14);
  }

  // 헤어 라인 음영
  noFill();
  stroke(hairShadow);
  strokeWeight(2);
  arc(cx, cy-78, 200, 130, PI, TWO_PI);

  // ---------------- 블러셔 ----------------
  fill(blush);
  noStroke();
  ellipse(cx-56, cy+28, 48, 28);
  ellipse(cx+56, cy+28, 48, 28);

  // ---------------- 눈 ----------------
  const eyeY = cy-12;
  const eyeW = 82;
  const eyeH = 36;

  fill(eyeWhite);
  ellipse(cx-58, eyeY, eyeW, eyeH);
  ellipse(cx+58, eyeY, eyeW, eyeH);

  fill(iris);
  ellipse(cx-58, eyeY, 34, 34);
  ellipse(cx+58, eyeY, 34, 34);

  fill(pupil);
  circle(cx-58, eyeY, 16);
  circle(cx+58, eyeY, 16);

  fill(255,255,255,230);
  circle(cx-50, eyeY-6, 6);
  circle(cx+66, eyeY-6, 6);

  // 아이라인
  noFill();
  stroke(30);
  strokeWeight(3.6);
  arc(cx-58, eyeY+2, eyeW, eyeH, PI, TWO_PI);
  arc(cx+58, eyeY+2, eyeW, eyeH, PI, TWO_PI);

  // 속눈썹
  stroke(20);
  strokeWeight(2.6);
  const lash = (ex, dir)=>{
    for(let i=0;i<8;i++){
      const lx = ex + dir * (14 + i*3.2);
      const ly = eyeY - 2 - i*0.2;
      line(ex, eyeY-13, lx, ly);
    }
  };
  lash(cx-74, -1);
  lash(cx+74, 1);

  // ---------------- 코 ----------------
  noFill();
  stroke(120, 90, 70);
  strokeWeight(2);
  line(cx, cy, cx, cy+12);
  arc(cx-7, cy+16, 14, 8, 0, PI);
  arc(cx+7, cy+16, 14, 8, 0, PI);

  // ---------------- 입술 ----------------
  noStroke();
  fill(lipBot);
  arc(cx, cy+60, 58, 20, 0, PI);

  // ---------------- 눈썹 ----------------
  stroke(50, 35, 20);
  strokeWeight(3.2);
  line(cx-86, cy-40, cx-28, cy-40);
  line(cx+28, cy-40, cx+86, cy-40);

  // ---------------- 귀걸이 ----------------
  drawEarrings(cx, cy, earringColor);

  // ---------------- 프레임 ----------------
  noFill();
  stroke(0,0,0,35);
  strokeWeight(2);
  rect(12, 12, width-24, height-24);
}

// ---------------- 귀걸이 그리기 ----------------
function drawEarrings(cx, cy, earringColor){
  fill(earringColor);
  noStroke();
  
  function drawHeart(x, y, size){
    beginShape();
    vertex(x, y);
    bezierVertex(x - size/2, y - size/2, x - size, y + size/3, x, y + size);
    bezierVertex(x + size, y + size/3, x + size/2, y - size/2, x, y);
    endShape(CLOSE);
  }

  const heartTopY = cy + 35; // 하트 꼭대기 y 좌표

  // 왼쪽 귀걸이
  drawHeart(cx-110, heartTopY, 12);
  stroke(200, 180, 0);
  strokeWeight(2);
  line(cx-110, cy+22, cx-110, heartTopY); // 귀에서 하트 꼭대기로 연결

  // 오른쪽 귀걸이
  drawHeart(cx+110, heartTopY, 12);
  line(cx+110, cy+22, cx+110, heartTopY);
}

// ---------------- 구름 그리기 ----------------
function drawCloud(x, y, size){
  noStroke();
  fill(255, 255, 255, 230);
  ellipse(x, y, size, size*0.6);
  ellipse(x+size*0.4, y-10, size*0.8, size*0.5);
  ellipse(x-size*0.4, y-5, size*0.7, size*0.4);
}