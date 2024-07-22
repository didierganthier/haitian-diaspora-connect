// components/TimeAgo.tsx
import { useTimeAgo } from 'next-timeago';

const TimeAgo = ({ date }: { date: string | number | Date }) => {
  const { TimeAgo } = useTimeAgo();
  return <TimeAgo date={date} />;
};

export default TimeAgo;
