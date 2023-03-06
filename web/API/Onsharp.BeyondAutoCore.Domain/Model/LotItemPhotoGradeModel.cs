using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onsharp.BeyondAutoCore.Domain.Model
{
    public class LotItemPhotoGradeModel : BaseModel
    {
        public long LotId { get; set; }
        public long LotItemId { get; set; }
        public long PhotoGradeId { get; set; }
    }
}
