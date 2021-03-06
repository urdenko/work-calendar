import { Document } from 'mongoose';

export interface HolidaysEntity extends Document {
  data: HolidaysYearEntity[];
}

interface HolidaysYearEntity extends Document {
  year: string;
  Jan: string;
  Feb: string;
  Mar: string;
  Apr: string;
  May: string;
  June: string;
  July: string;
  Aug: string;
  Sept: string;
  Oct: string;
  Nov: string;
  Dec: string;
  allDays: string;
  allWork: string;
  hours24: string;
  hours36: string;
  hours40: string;
  fileName: string;
}
