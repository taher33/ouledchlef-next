import type { NextPage } from "next";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";

const Home: NextPage = () => {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });
  const ref = useRef<HTMLDivElement>(null);
  const dragControles = useDragControls();
  const startDrag = (e: any) => {
    dragControles.start(e, { snapToCursor: true });
  };

  return (
    <div>
      <h1>Hello Next.js</h1>

      <div className="flex">
        <div className="w-screen h-screen border relative border-black">
          <motion.div
            ref={ref}
            drag
            dragMomentum={false}
            dragControls={dragControles}
            className={`h-10 w-10 bg-slate-400 cursor-pointer absolute top-${position.top} left-${position.left} `}
          >
            <motion.div
              drag
              dragMomentum={false}
              dragControls={useDragControls()}
              dragConstraints={ref}
              dragElastic={false}
              className="w-4 h-4 bg-red-600"
            ></motion.div>
          </motion.div>
        </div>
        <div>controles</div>
      </div>
    </div>
  );
};

export default Home;
