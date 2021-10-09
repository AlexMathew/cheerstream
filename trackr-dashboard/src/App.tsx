import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const loadEvents = async () => {
      const response: AxiosResponse<StatsResponse> =
        await trackr.get<StatsResponse>('/stats/');

      const eventMap = _.keyBy(response.data.events, 'event');
      setEvents(eventMap);

      const socket = new WebSocket(response.data.realtime);
      socket.onmessage = (e: MessageEvent<WebsocketEvent>) => {
        console.log(e);
      };

      socket.onclose = () => {
        console.log('Socket closed');
      };
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
