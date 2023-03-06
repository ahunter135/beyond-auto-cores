import { HttpHeadersPagination } from './http';

export interface Alert {
  photoGradeId: number;
  photoGradeUserId: number;
  title: string;
  message: string;
  dateSent: string;
  status: number;
  id: number;
  isDeleted: boolean;
  createdBy: number;
  createdOn: string;
  updatedBy: any;
  updatedOn: any;
  success: boolean;
}

export interface AlertList {
  data: Alert[];
  pagination: HttpHeadersPagination;
}

export interface AlertUpdateInput {
  photoGradeId: number;
  photoGradeUserId: number;
  title: string;
  message: string;
  dateSent: string;
  status: number;
  id: number;
}
