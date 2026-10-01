/**
 * Strava service for fetching activities.
 * Ref.: https://developers.strava.com/docs/authentication/
 * IMPORTANT: Access to Strava API is now available only under paid subscriptions.
 * 
 * 1. Obtain code with
 * https://www.strava.com/oauth/authorize?client_id=141804&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&response_type=code&approval_prompt=auto&scope=activity%3Aread
 * 
 * 2. Redirect URL with code
 * http://localhost:3000/callback?state=&code=YOUR_AUTHORIZATION_CODE&scope=read,activity:read
 * 
 * 3. Use `code` from the URL above to exchange for an access token.
 * curl -X POST https://www.strava.com/api/v3/oauth/token \
 *   -d client_id=<YOUR_CLIENT_ID> \
 *   -d client_secret=<YOUR_CLIENT_SECRET> \
 *   -d code=<YOUR_AUTHORIZATION_CODE> \
 *   -d grant_type=authorization_code
 */

import axios from 'axios'
import { ActivityResourceSchema, ActivitSourceEnum } from '../schemas/ActivitySchema'

import type { StravaActivityResource } from '../schemas/StravaActivitySchema'

const client = axios.create({
  baseURL: 'https://www.strava.com/api/v3',
});

interface StravaAuthResponse {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
}

async function getStravaAccessToken(): Promise<string> {
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

export async function listStravaActivities() {
  try {
    const accessToken = await getStravaAccessToken();

    return client.get<StravaActivityResource[]>("/athlete/activities", {
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

export async function getStravaActivity(id: number) {
  try {
    const accessToken = await getStravaAccessToken();

    return client.get<StravaActivityResource[]>(`/activities/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch activity");
  }
}

export async function listExtendedStravaActivities(): Promise<StravaActivityResource[]> {
  try {
    const { data } = await listStravaActivities()
    const list = await Promise.all(data.map((i) => getStravaActivity(i.id)))

    return list.map((i) => i.data).flat()
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch activities')
  }
}

export async function listStravaActivitiesAsActions() {
  const data = await listExtendedStravaActivities()

  return data.map(i => ActivityResourceSchema.parse({
    date: i.start_date,
    title: i.name,
    url: `https://www.strava.com/activities/${i.id}`,
    source: ActivitSourceEnum.enum.strava,
    meta: i
  }))
}