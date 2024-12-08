import type { Activity as ActivityType } from "@/types";
import Activity from "./Activity";
import List from "../List";
import ListItem from "../ListItem";

interface Props {
  activities: ActivityType[];
}

export default function Strava({ activities }: Props) {
  return (
    <List>
      {activities.map((activity: ActivityType, index: number) => (
        <ListItem key={index}>
          <Activity value={activity} />
        </ListItem>
      ))}
    </List>
  );
}
