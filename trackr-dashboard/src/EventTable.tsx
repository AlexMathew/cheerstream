import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Event } from './api/responseTypes';

interface EventMap {
  [key: string]: Event;
}

interface EventTableProps {
  events: EventMap;
}

export const EventTable: React.FC<EventTableProps> = ({ events }) => {
  const style = {
    background: 'black',
    color: 'limegreen',
    borderColor: 'limegreen',
  };

  return (
    <main
      style={{
        flexGrow: 1,
        padding: 80,
      }}
    >
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 400,
          }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={style} align="left">
                Event
              </TableCell>
              <TableCell sx={style} align="left">
                Created at
              </TableCell>
              <TableCell sx={style} align="left">
                Count
              </TableCell>
              <TableCell sx={style} align="left">
                Max
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(events).map((event) => (
              <TableRow key={events[event].event}>
                <TableCell sx={style} component="th" scope="row" align="left">
                  {events[event].event}
                </TableCell>
                <TableCell sx={style} align="left">
                  {events[event].created_at}
                </TableCell>
                <TableCell sx={style} align="left">
                  {events[event].count}
                </TableCell>
                <TableCell sx={style} align="left">
                  {events[event].max}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
};
