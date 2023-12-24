// ShooterRobot.js
import React, { useEffect, useRef, useState } from "react";
import { createPhysicsSimulation } from "./PhysicsSimulation";
import { sketch } from "./P5Sketch";
import { ReactP5Wrapper } from "@p5-wrapper/react";

const ShooterRobot = () => {
  const { engine } = createPhysicsSimulation();
  const [state, setState] = useState(0);

  return (
    <div>
      <div>
        {state % 2 === 0 && (
          <ReactP5Wrapper sketch={(p5) => sketch(p5, engine)} />
        )}
      </div>

      <button onClick={() => setState((prev) => prev + 1)}>click</button>
      <h1>{state}</h1>
    </div>
  );
};

export default ShooterRobot;
