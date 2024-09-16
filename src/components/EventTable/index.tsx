import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import { getUpcomingEvents } from '@/server/actions/Event';
// import { Event } from '@/types/dataModel/event';

// function createData(
//   name: string,
//   date: Date,
//   startTime: Date,
//   endTime: Date,
//   location: string,
//   manager: string
// ) {
//   return { name, date, startTime, endTime, location, manager };
// }

// const events = [
//   createData('Frozen yoghurt', new Date("2026-01-01 10:00:00"), new Date("2026-01-01 10:00:00"), new Date("2026-01-01 14:00:00"), "Knoxville, TN", "Taylor Swift")
// ];

export default function EventTable() {
  // const events: Event[] = getUpcomingEvents();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="event table">
        <TableHead>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Manager</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {events.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.title}</TableCell>
              <TableCell align="right">{row.startTime.toLocaleString('default', {month: 'long'})}&nbsp;{row.startTime.getDate()},&nbsp;{row.startTime.getFullYear()}</TableCell>
              <TableCell align="right">{row.startTime.toLocaleTimeString()}</TableCell>
              <TableCell align="right">{row.endTime.toLocaleTimeString()}</TableCell>
              <TableCell align="right">{row.location}</TableCell>
              <TableCell align="right">{row.manager}</TableCell>
              <IconButton aria-label="info">
                <InfoOutlinedIcon />
              </IconButton>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
