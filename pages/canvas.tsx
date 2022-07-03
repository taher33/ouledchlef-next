import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const CanvasPage: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // useEffect(() => {
  //   let ctx = canvasRef.current?.getContext("2d", {});
  //   ctx?.drawImage("url(./img.png)", 0, 0);
  // }, []);

  return (
    <div>
      <Link href="/">
        <p className="underline text-cyan-600 inline">home</p>
      </Link>
      <div>
        <canvas
          className="border border-black w-screen mt-4"
          ref={canvasRef}
        ></canvas>
      </div>
    </div>
  );
};

export default CanvasPage;
