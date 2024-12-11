import { Activity as IActivity } from "@/typings/strava";
import { Activity, BarChart2 } from "react-feather";
import FlameIcon from "@/components/icons/Flame";
import TimerIcon from "@/components/icons/Timer";

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // pad with leading zeros if needed
  const formattedHours = hours > 0 ? String(hours).padStart(2, "0") + ":" : "";
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
}

export default function Stats({ value }: { value: IActivity }) {
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-0.5 text-sm color-100">
      {value.sport_type && (
        <li title="Activity type" className="flex items-center gap-0.5">
          <Activity className="w-3.5 h-3.5" />
          <span>{value.sport_type}</span>
        </li>
      )}

      {value.moving_time && (
        <li title="Moving time" className="flex items-center gap-0.5">
          <TimerIcon className="w-3.5 h-3.5" />
          <span>{formatTime(value.moving_time)}</span>
        </li>
      )}

      {value.calories && (
        <li title="Calories" className="flex items-center gap-0.5">
          <FlameIcon className="w-3.5 h-3.5" />
          <span>{value.calories} cal.</span>
        </li>
      )}

      {value.average_heartrate && (
        <li title="Average heartrate" className="flex items-center gap-0.5">
          <BarChart2 className="w-3.5 h-3.5" />
          <span>{value.average_heartrate} bpm.</span>
        </li>
      )}
    </ul>
  );
}
