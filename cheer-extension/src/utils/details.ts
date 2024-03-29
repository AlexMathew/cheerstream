type ExpectedMatchGroups = 'sport' | 'event' | 'match';

type RegexpMatchGroups = {
  [key in ExpectedMatchGroups]?: string;
};

export type EventDetails = {
  sport: string;
  event: string;
  match: string;
};

const LIVE_STREAM_URL_REGEX: RegExp =
  /in\/sports\/(?<sport>\w+)\/?(?<event>tata-ipl-2022|indian-premier-league|asia-cup-2022|mens-t20-asia-cup|icc-mens-t20-world-cup)?\/(?<match>[\w-]+)(\/live-streaming)?\/\d+/i;

export function getEventAndMatchDetails(path: string): EventDetails {
  const match: RegExpExecArray | null = LIVE_STREAM_URL_REGEX.exec(path);
  const groups: RegexpMatchGroups | undefined = match?.groups ?? {};

  return {
    sport: groups?.sport ?? 'default',
    event: groups?.event ?? 'default',
    match: groups?.match ?? 'default',
  };
}
