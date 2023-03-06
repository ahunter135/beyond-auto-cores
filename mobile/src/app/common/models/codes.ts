import { HttpHeadersPagination } from './http';

export interface Code {
  converterName: string;
  isCustom: boolean;
  originalPrice: number;
  platinumPrice: number;
  palladiumPrice: number;
  rhodiumPrice: number;
  photoGradeId: number;
  photoGradeItemId: number;
  fileKey: string;
  fileUrl: string;
  id: number;
  isDeleted: boolean;
  createdBy: number;
  createdOn: string;
  updatedBy: any;
  updatedOn: any;
  success: boolean;
  message: string;
  make: string;
  finalUnitPrice: number;
}

export interface CodeList {
  data: Code[];
  pagination: HttpHeadersPagination;
}
