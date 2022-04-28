let vs = []
function setup (){
  createCanvas( 400,400);
  v =new Vehicle (200,200);
}

function draw (){
   background(242);
  
  v.display()
  v.edges()
  v.update();
  v.wander();

}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 35;
    this.maxspeed = 0.8;
    this.maxforce = 0.08;
    this.wanderTheta = PI/2;
  }
  
  wander(){
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location);
    
    let wanderRadius = 30;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar, yBar));
    
    let debug = true;
    
    if (debug){
      push()
      fill(176,224,230);
      stroke('green')
      line(this.location.x, this.location.y, projPoint.x, projPoint.y)
      stroke('green');
      circle(projPoint.x, projPoint.y, 50);
      noFill();
      stroke('green');
      circle(projPoint.x, projPoint.y, wanderRadius*2);
      
      line(this.location.x, this.location.y, wanderPoint.x, wanderPoint.y)
      stroke('black')
      fill('red')
      circle(wanderPoint.x, wanderPoint.y, 8);
      pop()
    }
    
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.3, 0.3);
  }
  
  seek(vektorTarget){
    // percieve target location 
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 80, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    strokeWeight(2);
    translate(this.location.x, this.location.y)
    rotate(theta)
    fill('red')
     triangle(0, this.l/2, 0, -this.l/2, this.l,0)
     
fill(0,0,0)
  triangle(89,140,111,140,100,163)
  line(90,60,80,40)
  line(110,60,120,40)

  fill(176,224,230)
  ellipse(135,105,60,50)
  ellipse(65,105,60,50)

  fill(255,255,0)
  ellipse(100,120,60,70)
  ellipse(100,75,50,50)

  strokeWeight(8)
  point(80,40)
  point(120,40)

  strokeWeight(1)
  fill(0,0,0)
  ellipse(90,70,5,12)
  ellipse(110,70,5,12)
  arc(100,85,10,5,25,110)

  arc(100,105,55,13,25,110)
  arc(100,120,61,13,25,110)
  arc(100,135,55,13,25,110)
  arc(100,149,34,9,25,110)
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }
}