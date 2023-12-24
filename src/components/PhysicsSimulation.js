// PhysicsSimulation.js
import { useEffect, useRef } from "react";
import { Engine, Bodies, Runner, Composite } from "matter-js";

export const createPhysicsSimulation = () => {
  const engine = useRef(
    Engine.create({
      // gravity: { x: 0, y: 0 },
    }),
  );

  useEffect(() => {
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

    const player = Bodies.circle(cw / 2, ch / 2, 50, {
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
