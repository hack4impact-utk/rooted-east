// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import React from 'react';
// import { Event } from '@/types/dataModel/event';

// interface EventObjectList {
//   events: Event[];
//   renderMoreInfoButton?: (event: Event) => React.ReactNode;
// }

// export default function EventList({ events, renderMoreInfoButton }: EventObjectList) {
//   return (
//     <div>
//       <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'grey' }}>
//         {events.map((event: Event, index) => (
//           <div>
//             <ListItem key={index}>{event.title}</ListItem>
//             {renderMoreInfoButton && renderMoreInfoButton(event)}
//           </div>
//         ))}
//       </List>
//     </div>
//   );
// }
