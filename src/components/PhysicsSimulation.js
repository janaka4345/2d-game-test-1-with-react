// PhysicsSimulation.js
import { useEffect, useRef } from "react";
import { Engine, Bodies, Runner, Composite, Body } from "matter-js";
let player;
let engine;
export const createPhysicsSimulation = () => {
  engine = useRef(
    Engine.create({
      gravity: { x: 0, y: 0 },
    }),
  );

  useEffect(() => {
    console.log(engine.current);
    const cw = 400;
    const ch = 400;

    const walls = [
      Bodies.rectangle(cw / 2, -10, cw, 20, {
        isStatic: true,
        label: "wall",
      }),
      Bodies.rectangle(-10, ch / 2, 20, ch, {
        isStatic: true,
        label: "wall",
      }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, {
        isStatic: true,
        label: "wall",
      }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, {
        isStatic: true,
        label: "wall",
      }),
    ];

    player = Bodies.circle(cw / 2, ch / 2, 50, {
      label: "player",
      // isStatic: true,
    });

    Composite.add(engine.current.world, [...walls, player]);

    const runner = Runner.create();
    Runner.run(runner, engine.current);

    return () => {
      Runner.stop(runner);
      Composite.clear(engine.current.world, engine.current.world.bodies);
      Composite.remove(engine.current.world, engine.current.world.bodies);
      Engine.clear(engine.current);
    };
  }, []);

  return { engine };
};
export const createBullet = (p5) => {
  const bullet = Bodies.circle(
    player.position.x +
      50 *
        Math.cos(
          Math.atan2(
            p5.mouseY - player.position.y,
            p5.mouseX - player.position.x,
          ),
        ),
    player.position.y +
      50 *
        Math.sin(
          Math.atan2(
            p5.mouseY - player.position.y,
            p5.mouseX - player.position.x,
          ),
        ),
    10,
    {
      label: "bullet",
      gravity: { x: 0, y: 0 },
      // velocity: { x: 30, y: 30 },
      // setPosition: { x: 100, y: 100 },
    },
  );
  Body.setVelocity(bullet, {
    x:
      5 *
      Math.cos(
        Math.atan2(
          p5.mouseY - player.position.y,
          p5.mouseX - player.position.x,
        ),
      ),
    y:
      5 *
      Math.sin(
        Math.atan2(
          p5.mouseY - player.position.y,
          p5.mouseX - player.position.x,
        ),
      ),
  });

  Composite.add(engine.current.world, [bullet]);
};
