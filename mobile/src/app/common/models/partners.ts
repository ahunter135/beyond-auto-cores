import { HttpHeadersPagination } from './http';

export interface Partner {
  partnerName: string;
  website: string;
  logo: string;
  logoFileKey: string;
  fileUrl: any;
  id: number;
  isDeleted: boolean;
  createdBy: number;
  createdOn: string;
  updatedBy: any;
  updatedOn: any;
  success: boolean;
  message: string;
}

export interface PartnerList {
  data: Partner[];
  pagination: HttpHeadersPagination;
}
