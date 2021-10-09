import { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Event, StatsResponse } from './api/responseTypes';
import trackr from './api/trackr';
import { Header } from './Header';
import { EventTable } from './EventTable';
import * as _ from 'lodash';
import { WebsocketEvent } from './api/websocket';

interface EventMap {
  [key: string]: Event;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<EventMap>({});
  const eventsRef = useRef(events);
  eventsRef.current = events;

  const setupRealtime = (wsUrl: string) => {
    const socket = new WebSocket(wsUrl);
    socket.onmessage = (e: MessageEvent<string>) => {
      const data: WebsocketEvent = JSON.parse(e.data);
      const updatedEvent: Event = eventsRef.current?.[data.message.event];
      if (updatedEvent) {
        updatedEvent.count += data.message.count_update;
        if (updatedEvent.count > updatedEvent.max) {
          updatedEvent.max = updatedEvent.count;
        }
        setEvents({ ...events, [data.message.event]: updatedEvent });
      }
    };
    socket.onclose = () => {
      console.log('Socket closed');
    };
  };

  useEffect(() => {
    const loadEvents = async () => {
      const response: AxiosResponse<StatsResponse> =
        await trackr.get<StatsResponse>('/stats/');

      const eventMap = _.keyBy(response.data.events, 'event');
      setEvents(eventMap);
      eventsRef.current = eventMap;
      setupRealtime(response.data.realtime);
    };

    loadEvents();
  }, []);

  return (
    <div style={{ display: 'grid', flexGrow: 1 }}>
      <Header />
      <EventTable events={events} />
    </div>
  );
};

export default App;
