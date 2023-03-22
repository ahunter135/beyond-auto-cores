
using Microsoft.EntityFrameworkCore;

namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class CodesRepository : BaseRepository<CodeModel>, ICodesRepository
    {

        private BacDBContext _context = null;

        public CodesRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<CodeListDto>> GetCodes(List<SqlParameter> parameters)
        {
            return await _context.Set<CodeListDto>().FromSqlRaw("SProc_GetCodes @convertername, @isadmin, @iscustom, @notIncludePGItem", parameters.ToArray()).ToListAsync();
        }

        public async Task<List<CodeListDto>> GetCodes(List<SqlParameter> parameters, bool isPage = false)
        {
            if (isPage == true)
            {
                return await _context.Set<CodeListDto>().FromSqlRaw("SProc_GetCodesPage @convertername, @isadmin, @iscustom, @notIncludePGItem, @pagesize, @pagenumber, @direction, @sortColumn", parameters.ToArray()).ToListAsync();
            }
            return await _context.Set<CodeListDto>().FromSqlRaw("SProc_GetCodes @convertername, @isadmin, @iscustom, @notIncludePGItem", parameters.ToArray()).ToListAsync();
        }

        public async Task<int> GetCodesLength(List<SqlParameter> parameters, bool isPage = false)
        {
            var length = await _context.Set<CountModel>().FromSqlRaw("SProc_GetCodesCount @convertername, @isadmin, @iscustom, @notIncludePGItem", parameters.ToArray()).ToListAsync();
            if (length != null)
                return length[0].Count;
            else
                return -1;
        }

        public async Task<bool> IsUsed(long codeId)
        {
            return await _context.LotItems.Where(w => w.CodeId == codeId && w.IsDeleted == false).AnyAsync();
        }

        public async Task DeleteRelatedTableData(long codeId)
        {
            //LotItems
            var lotItems = await _context.LotItems.Where(c => c.CodeId == codeId && c.IsDeleted == false).ToListAsync();
            foreach(var lotItem in lotItems)
            {
                lotItem.IsDeleted = true;
            }

            var deleteLotItemsId = lotItems.Select(c => c.Id).ToList();
            _context.LotItems.UpdateRange(lotItems);
            await _context.SaveChangesAsync();

            //LotItemFullness
            var lotItemFullness = await _context.LotItemFullness.Where(c => deleteLotItemsId.Contains(c.LotItemId) && c.IsDeleted == false).ToListAsync();
            foreach(var item in lotItemFullness)
            {
                item.IsDeleted = true;
            }
            _context.LotItemFullness.UpdateRange(lotItemFullness);
            await _context.SaveChangesAsync();

            //LotItemPhotoGrades
            var lotItemPhotoGrades = await _context.LotItemPhotoGrades.Where(c => deleteLotItemsId.Contains(c.LotItemId) && c.IsDeleted == false).ToListAsync();
            foreach (var lotItemPhotoGrade in lotItemPhotoGrades)
            {
                lotItemPhotoGrade.IsDeleted = true;
            }
            _context.LotItemPhotoGrades.UpdateRange(lotItemPhotoGrades);
            await _context.SaveChangesAsync();

            //PhotoGrade
            var photoGrades = await _context.PhotoGrades.Where(c => c.CodeId == codeId && c.IsDeleted == false).ToListAsync();
            foreach (var photoGrade in photoGrades)
            {
                photoGrade.IsDeleted = true;
            }

            var deletePhotoGradeId = photoGrades.Select(c => c.Id).ToList();
            _context.PhotoGrades.UpdateRange(photoGrades);
            await _context.SaveChangesAsync();

            //PhotoGradeItems
            var PhotoGradeItems = await _context.PhotoGradeItems.Where(c => deletePhotoGradeId.Contains(c.PhotoGradeId) && c.IsDeleted == false).ToListAsync();
            foreach(var photoGradeItem in PhotoGradeItems)
            {
                photoGradeItem.IsDeleted = true;
            }
            _context.PhotoGradeItems.UpdateRange(PhotoGradeItems);
            await _context.SaveChangesAsync();

        }

    }
}
