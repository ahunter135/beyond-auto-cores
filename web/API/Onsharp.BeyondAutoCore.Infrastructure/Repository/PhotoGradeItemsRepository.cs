
namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class PhotoGradeItemsRepository : BaseRepository<PhotoGradeItemModel>, IPhotoGradeItemsRepository
    {

        private BacDBContext _context = null;

        public PhotoGradeItemsRepository(BacDBContext context) : base(context)
        {
            _context = context;
        }

    }
}
