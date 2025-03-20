'use client';
import { VolunteerEntity } from '@/types/dataModel/volunteer';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';

interface Props {
  vols: VolunteerEntity[];
}

export default function CSVButton({ vols }: Props) {
  async function onChange() {
    const converter = await import('json-2-csv');

    try {
      // Explicitly remove _id and __v
      const formattedVols = vols.map((vol) => {
        const newVol = { ...vol } as any;
        delete newVol._id;
        delete newVol.__v;
        return newVol;
      });

      const csv = await converter.json2csv(formattedVols);

      // Create a Blob from the CSV string
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

      // Trigger file download
      saveAs(blob, 'volunteers.csv');
    } catch (error) {
      console.error('Error converting to CSV:', error);
    }
  }

  return (
    <Button
      variant="contained"
      className="manage-event-buttons"
      onClick={onChange}
    >
      Download CSV
    </Button>
  );
}
