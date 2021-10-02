export type EventDetails = {
  eventName: string;
  matchName: string;
};

export function getEventAndMatchDetails(path: string): EventDetails {
  const parts = path.split('/');
  const [eventName, matchName] = parts.slice(4, 6);

  return {
    eventName: eventName,
    matchName: matchName,
  };
}
