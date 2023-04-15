export interface LotItemsRequest {
  codeId?: string | number;
  lotId: string | number;
  converterName: string;
  originalPrice: number;
  fullnessPercentage: number;
  photoGradeId?: number | undefined;
}

export interface LotItemsResponse {
  id: number;
  lotId: number;
  codeId: number;
  lotName: string;
  converterName: string;
  minUnitPrice: number;
  maxUnitPrice: number;
  photoGradeId: any;
  photoGradeItemId: any;
  fileKey: any;
  fileUrl: any;
  createdOn: any;
}

export interface LotItemsFullnessResponse {
  lotItemId: number | string;
  fullnessPercentage: number;
  unitPrice: number;
  qty: number;
  id: number | string;
  createdBy: number;
  createdOn: string;
  updatedBy: any;
  updatedOn: any;
  success: boolean;
  message: string;
}
