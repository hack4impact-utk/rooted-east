// 'use client';
// import { VolunteerEntity } from '@/types/dataModel/volunteer';
// import { Button } from '@mui/material';
// import { saveAs } from 'file-saver'; // Add this package to handle downloads

// interface Props {
// vols: VolunteerEntity[];
// }

// export default function CSVButton({ vols }: Props) {
// async function onChange() {
// Dynamically import json-2-csv since it's a client-side operation
// const converter = await import('json-2-csv');

// try {
// Convert JSON to CSV
// const csv = await converter.json2csv(vols);

// Create a Blob from the CSV string
// const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

// Use the file-saver library to trigger download
// saveAs(blob, 'volunteers.csv');
//   } catch (error) {
//     console.error('Error converting to CSV:', error);
//   }
// }

// return (
//   <Button variant="contained" onClick={onChange}>
//     Download CSV
//   </Button>
// );
// }
