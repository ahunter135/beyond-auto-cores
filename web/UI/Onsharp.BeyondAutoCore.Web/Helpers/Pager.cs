using System;
using System.Collections.Generic;
using System.Linq;

namespace Onsharp.BeyondAutoCore.Web.Helpers
{
    public class Pager
    {
        public Pager(
            int totalItems = int.MaxValue,
            int currentPage = 1,
            int pageSize = 10,
            int maxPages = 10)
        {
            // calculate total pages
            var totalPages = (int)Math.Ceiling((decimal)totalItems / (decimal)pageSize);

            // ensure current page isn't out of range
            if (currentPage < 1)
            {
                currentPage = 1;
            }
            else if (currentPage > totalPages)
            {
                currentPage = totalPages;
            }

            int startPage, endPage;
            if (totalPages <= maxPages)
            {
                // total pages less than max so show all pages
                startPage = 1;
                endPage = totalPages;
            }

            // update object instance with all pager properties required by the view
            TotalItems = totalItems;
            CurrentPage = currentPage;
            PageSize = pageSize;
            TotalPages = totalPages;
        }

        public int TotalItems { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; private set; }
        public int TotalPages { get; set; }

        public int getNextPage()
        {
            if (CurrentPage <= TotalPages)
                return ++CurrentPage;
            else
                return -1;
        }

        public void setPageSize(int newPageSize)
        {
            if (newPageSize > 0)
            {
                this.CurrentPage = (newPageSize / PageSize) * this.CurrentPage;
                this.PageSize = newPageSize;
                var totalPages = (int)Math.Ceiling((decimal)TotalItems / (decimal)PageSize);
            }
        }

        
    }
}