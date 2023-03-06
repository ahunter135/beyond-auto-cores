
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class ParametersCommand
    {
        const int maxPageSize = int.MaxValue;
        
        public string SearchCategory { get; set; }
        public string SearchKey { get; set; }
        public string SearchQuery { get; set; }

        public int PageNumber { get; set; } = 1;

        private int _pageSize = int.MaxValue;
        public int PageSize { 
            get => _pageSize; 
            set => _pageSize = (value > maxPageSize) ? maxPageSize : value; }

    }
}
