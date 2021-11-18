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
  /in\/sports\/(?<sport>\w+)\/?(?<event>new-zealand-tour-of-india-202122|new-zealand-tour-of-india-2021)?\/(?<match>[\w-]+)(\/live-streaming)?\/\d+/i;

export function getEventAndMatchDetails(path: string): EventDetails {
  const match: RegExpExecArray | null = LIVE_STREAM_URL_REGEX.exec(path);
  const groups: RegexpMatchGroups | undefined = match?.groups ?? {};

  return {
    sport: groups?.sport ?? 'default',
    event: groups?.event ?? 'default',
    match: groups?.match ?? 'default',
  };
}
