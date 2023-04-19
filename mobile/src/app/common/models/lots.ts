import { HttpHeadersPagination } from './http';

export interface Lots {
  lotName: string;
  lotId: string;
  createdBy: number;
  createdOn: string;
  updatedBy: any;
  updatedOn: any;
  success: boolean;
  message: string;
  id?: string;
}

export interface LotInventoryResponse {
  lotId: number;
  codeId: number;
  isSubmitted: boolean;
  lotName: string;
  invoiceNo: string;
  firstName: string;
  lastName: string;
  quantity: number;
  average: number;
  total: number;
  photoGradeId: any;
  photoGradeItemId: any;
  fileKey: any;
  fileUrl: any;
  id?: string;
  createdOn: string;
}

export interface LotInventoryList {
  data: LotInventoryResponse[];
  pagination: HttpHeadersPagination;
}

export interface LotRequest {
  lotName: string;
}

export interface UpdateLotRequest extends LotRequest {
  id: number;
  isSubmitted?: boolean;
}

export interface SubmitLotRequest {
  businessName: string;
  email: string;
  lotId: string | number;
  formData: any;
}
