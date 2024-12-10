import { fetchExtendedActivities } from "@/service/stravaApi";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = unknown[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const response = await fetchExtendedActivities();

  res.status(200).json(response);
}
