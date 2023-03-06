using Microsoft.EntityFrameworkCore;
using Onsharp.BeyondAutoCore.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class LotItemPhotoGradeRepository : BaseRepository<LotItemPhotoGradeModel>, ILotItemPhotoGradeRepository
    {
        private BacDBContext _context = null;
        public LotItemPhotoGradeRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }
    }
}
