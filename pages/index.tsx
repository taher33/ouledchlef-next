import type { NextPage } from "next";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useDragControls, useMotionValue } from "framer-motion";
import { flushSync } from "react-dom";

const Comp = ({ name }: any) => {
  const [scale, setScale] = useState(1);
  flushSync(() => {});
  if (name === "string") {
    return (
      <motion.div
        style={{
          scale: scale,
        }}
        drag
        className="bg-red-500 relative"
      >
        hey there
        <button
          onClick={() => {
            setScale(scale + 0.1);
          }}
          className="bg-slate-200 ml-3"
        >
          scale up
        </button>
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
  const [value, setValue] = useState("");
  const handleAddImg = (event: any) => {
    setPosition([...position, "img"]);
  };

  return (
    <div>
      <h1>Hello Next.js</h1>
      <form onSubmit={(evt) => {}}></form>
      <textarea
        name=""
        id=""
        onChange={(evt) => {
          setValue(evt.target.value);
        }}
        onKeyDownCapture={(e) => console.log(e.code)}
        value={value}
      />
      <Link href="/canvas">canvas</Link>
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
