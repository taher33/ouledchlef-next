import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <h1>Hello Next.js</h1>
      <Link href="/signup">create acount</Link>
      <br />
      <Link href="/login">login</Link>
      <br />
      <Link href="/chat">chat</Link>
    </div>
  );
};

export default Home;
