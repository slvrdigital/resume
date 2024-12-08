import type { Activity } from "@/types";
import axios from "axios";

export const client = axios.create({
  baseURL: "https://www.strava.com/api/v3",
});

interface StravaAuthResponse {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
}

export async function getAccessToken(): Promise<string> {
  const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID!;
  const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET!;
  const STRAVA_REFRESH_TOKEN = process.env.STRAVA_REFRESH_TOKEN!;

  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    throw new Error(
      "Missing required environment variables: STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, or STRAVA_REFRESH_TOKEN."
    );
  }

  try {
    const response = await client.post<StravaAuthResponse>("/oauth/token", {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      refresh_token: STRAVA_REFRESH_TOKEN,
      grant_type: "refresh_token",
    });

    const { access_token, refresh_token, expires_at } = response.data;

    console.log("New access token fetched successfully.");

    // Optionally, log the expiration time for debugging (convert from UNIX timestamp)
    console.log(
      "Access token expires at:",
      new Date(expires_at * 1000).toISOString()
    );

    // Optionally update refresh token if it changes
    if (refresh_token !== STRAVA_REFRESH_TOKEN) {
      console.log("Refresh token has been updated:", refresh_token);
      // Save this to your secrets storage if necessary
    }

    return access_token;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Strava access token");
  }
}

export async function fetchActivities() {
  try {
    const accessToken = await getAccessToken();

    return client.get<Activity[]>("/athlete/activities", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        per_page: 3,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch activities");
  }
}

export async function fetchExtendedActivities() {
  try {
    const { data } = await fetchActivities();
    const list = await Promise.all(data.map((i) => fetchActivity(i.id)));

    return { data: list.map((i) => i.data).flat() };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch activities");
  }
}

export async function fetchActivity(id: number) {
  try {
    const accessToken = await getAccessToken();

    return client.get<Activity[]>(`/activities/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch activity");
  }
}
