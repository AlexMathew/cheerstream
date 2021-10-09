export interface Event {
  event: string;
  created_at: string;
  count: number;
  max: number;
}

export interface StatsResponse {
  realtime: string;
  events: Event[];
}
