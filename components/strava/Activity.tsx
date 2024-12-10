import { formatDistanceToNow, parseISO, format } from "date-fns";
import Title from "@/components/Title";
import Content from "@/components/Content";
import Time from "./Time";
import Heartrate from "./Heartrate";
import { Activity as ActivityType } from "@/typings/strava";

function formatDate(dateString: string): string {
  const date = parseISO(dateString);

  // calculate the distance to now
  const distance = formatDistanceToNow(date, { addSuffix: true });

  // date is within the last 7 days
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  if (date > sevenDaysAgo) {
    return distance; // e.g., "2 days ago" or "5 hours ago"
  }

  return format(date, "MMM d, yyyy");
}

export default function Activity({ value }: { value: ActivityType }) {
  const activityUrl = `https://www.strava.com/activities/${value.id}`;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <p className="color-100">{formatDate(value.start_date_local)}</p>

      <div className="sm:col-span-2">
        <Title tag="h3">
          <a href={activityUrl} className="link" target="_blank">
            {value.name}
          </a>
        </Title>
        <div className="text-sm mb-4 color-100">
          <span>{value.sport_type}</span>
        </div>
        {value.description && <Content html={value.description} />}
        <div className="flex flex-wrap gap-x-1.5 gap-y-0.5">
          {value.moving_time && <Time value={value.moving_time}></Time>}
          {value.has_heartrate && <Heartrate value={value.average_heartrate} />}
        </div>
      </div>
    </div>
  );
}
