import { HttpHeadersPagination } from './http';

export interface PhotoGradeRequest {
  fullNess: number;
  notes: string;
  formData: any;
}

export interface PhotoGradeListResponse {
  requestorName: any;
  fullness: number;
  dateRequested: string;
  photoGradeStatus: number;
  price: number;
  comments: string;
  codeId: number;
  converterName: string;
  photoGradeId: number;
  photoGradeItemId: any;
  fileKey: any;
  fileUrl: any;
}

export interface PhotoGradeList {
  data: PhotoGradeListResponse[];
  pagination: HttpHeadersPagination;
}

export interface PhotoGradeItemsResponse {
  photoGradeId: number;
  fileKey: string;
  fileName: string;
  isUploaded: boolean;
  id: number;
  isDeleted: boolean;
  createdBy: number;
  createdOn: string;
  updatedBy: any;
  updatedOn: any;
  success: boolean;
  message: string;
  fileUrl: string;
}

export interface PhotoGradeResponse {
  photoGradeItems: PhotoGradeItemsResponse[];
  requestorName: string;
  notes: string;
  fullness: number;
  dateRequested: string;
  photoGradeStatus: number;
  price: number;
  comments: any;
  id: number;
  isDeleted: boolean;
  createdBy: number;
  createdOn: string;
  updatedBy: any;
  updatedOn: any;
  success: boolean;
  message: string;
}
