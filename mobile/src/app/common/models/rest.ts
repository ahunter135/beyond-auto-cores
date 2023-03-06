export type FilterRequest = {
  pageNumber?: number;
  pageSize?: number;
  searchCategory?: string;
  searchQuery?: string;
  isCustom?: boolean;
  isAdmin?: boolean;
  includeLogoUrl?: boolean;
  notIncludePGItem?: boolean;
};
