import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/prisma";
import { serialize } from "cookie";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") return postHandler(req, res);
  res.json({ name: "John Doe" });
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = JSON.parse(req.body);

  if (!name || !email || !password) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const cookie = serialize("token", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      maxAge: 1000 * 60 * 60 * 24 * 365,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      sameSite: "strict",
      path: "/",
    });

    res.setHeader("Set-Cookie", cookie).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
