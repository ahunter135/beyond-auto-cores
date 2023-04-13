using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onsharp.BeyondAutoCore.Domain.Model
{
    public class AffiliateSummaryModel
    {
        [Key]
        public char Lock { get; set; }
        public long NumOfAffiliates { get; set; }
        public decimal TotalCommissionsEarned { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }
}
