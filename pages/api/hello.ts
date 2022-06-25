// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};
const a =
  "EAAwYqjtZAQj8BAGURCzP4BMfXFDx3jw79nOhTFzF1PUZC3S5cx8cABpKh9xUa8XrER8d32fxjG13LAOUkOKwgGTQSni9XQNtBjLTqXxCee0gcF2M8fidxeBdTm6AbcEW6TcZAMaXZBZB3qqRIusWUdQ0nFOFTgk5tvH3S0jw7SLVdwwAY9lTlbMvJLUq0ybkZD";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
