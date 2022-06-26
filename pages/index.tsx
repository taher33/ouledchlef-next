import type { NextPage } from "next";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";

const Comp = ({ name }: any) => {
  if (name === "string") {
    return (
      <motion.div drag className="bg-red-500 relative">
        <motion.div
          drag
          className="w-2 h-2 border border-black absolute top-0 left-0"
        />
        <motion.div
          drag
          className="w-2 h-2 border border-black absolute top-full left-0"
        />
        <motion.div
          drag
          className="w-2 h-2 border border-black absolute top-0 left-full"
        />
        <motion.div
          drag
          className="w-2 h-2 border border-black absolute top-full left-full"
        />
        hey there
      </motion.div>
    );
  }
  return <motion.img src="" alt="hey" />;
};

const Home: NextPage = () => {
  const [position, setPosition] = useState<string[]>([]);
  const ref = useRef<HTMLImageElement>(null);
  const dragControles = useDragControls();
  const startDrag = (e: any) => {
    dragControles.start(e, { snapToCursor: true });
  };

  const setRef = useRef<HTMLDivElement>(null);

  const handleAddtext = (event: any) => {
    setPosition([...position, "string"]);
  };

  const handleAddImg = (event: any) => {
    setPosition([...position, "img"]);
  };

  return (
    <div>
      <h1>Hello Next.js</h1>

      <div className="flex">
        <div className="w-screen h-screen border relative border-black">
          <motion.div
            drag
            dragMomentum={false}
            ref={ref}
            dragControls={dragControles}
            className={`h-96 w-1/2 border border-black bg-slate-400 cursor-pointer flex flex-col justify-center`}
            style={{ backgroundImage: "url('img.png')" }}
          >
            <motion.div
              ref={setRef}
              drag
              dragMomentum={false}
              dragControls={useDragControls()}
              dragConstraints={ref}
              dragElastic={false}
              className="w-40 h-40 border border-black mx-auto "
            >
              {position.map((el: string, id) => (
                <Comp key={id} name={el} />
              ))}
            </motion.div>
          </motion.div>
        </div>
        <div>
          <button onClick={handleAddtext}>add text</button>
          <button onClick={handleAddImg}>add img</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
