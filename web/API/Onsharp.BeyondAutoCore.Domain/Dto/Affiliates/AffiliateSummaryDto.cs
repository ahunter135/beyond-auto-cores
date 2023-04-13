using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onsharp.BeyondAutoCore.Domain.Dto.Affiliates
{
    public class AffiliateSummaryDto : ResponseDto
    {
        public char Lock { get; set; }
        public long NumOfAffiliates { get; set; }
        public decimal TotalCommissionsEarned { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }
}
