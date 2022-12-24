import type { NextApiRequest, NextApiResponse } from "next";

interface HelloResponseData {
  name: string;
}

export default function handler(
  _request: NextApiRequest,
  response: NextApiResponse<HelloResponseData>,
) {
  return response.status(200).json({
    name: "John Doe",
  });
}
