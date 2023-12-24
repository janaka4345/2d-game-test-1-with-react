import { collitionDetection, createBullet } from "./PhysicsSimulation";

// P5Sketch.js
export function sketch(p5, engine) {
  // p5.preload = preload(p5);
  p5.setup = setup(p5);
  p5.draw = draw(p5, engine);
  p5.mousePressed = () => mousePressed(p5);
}
function setup(p5) {
  return () => {
    p5.createCanvas(400, 400);
  };
}
function draw(p5, engine) {
  return () => {
    p5.background(250, 120, 0);
    renderBodies(p5, engine);

    collitionDetection();
  };
}

const renderBodies = (p5, engine) => {
  engine.current.world.bodies.forEach((body) => {
    if (body.label === "player") {
      p5.push();
      p5.fill(255, 204, 0);
      p5.circle(body.position.x, body.position.y, 100);
      p5.fill(255, 255, 255);
      p5.circle(
        body.position.x +
          Math.cos(
            Math.atan2(
              p5.mouseY - body.position.y,
              p5.mouseX - body.position.x,
            ),
          ) *
            10,
        body.position.y +
          Math.sin(
            Math.atan2(
              p5.mouseY - body.position.y,
              p5.mouseX - body.position.x,
            ),
          ) *
            10,
        60,
      );
      p5.fill(0, 0, 0);
      p5.circle(
        body.position.x +
          Math.cos(
            Math.atan2(
              p5.mouseY - body.position.y,
              p5.mouseX - body.position.x,
            ),
          ) *
            20,
        body.position.y +
          Math.sin(
            Math.atan2(
              p5.mouseY - body.position.y,
              p5.mouseX - body.position.x,
            ),
          ) *
            20,
        30,
      );
      p5.pop();
    }
    if (body.label === "wall") {
      if (body.label === "wall") {
        p5.push();
        p5.fill(0, 255, 0);
        p5.quad(
          body.vertices[0].x,
          body.vertices[0].y,
          body.vertices[1].x,
          body.vertices[1].y,
          body.vertices[2].x,
          body.vertices[2].y,
          body.vertices[3].x,
          body.vertices[3].y,
        );
        p5.pop();
      }
    }
    if (body.label === "bullet") {
      p5.push();
      p5.fill(0, 0, 0);
      p5.circle(body.position.x, body.position.y, 20);
      p5.pop();
    }
  });
};

// Add separate functions for renderPlayer, renderWall, and renderBullet if needed
function mousePressed(p5) {
  createBullet(p5);
}
