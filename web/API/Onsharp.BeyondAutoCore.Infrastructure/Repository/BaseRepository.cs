using System.Linq.Expressions;

namespace Onsharp.BeyondAutoCore.Infrastructure.Repository
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected BacDBContext dBContext;
        protected readonly DbSet<T> dbSet;
        public BaseRepository(BacDBContext _dBContext)
        {
            dBContext = _dBContext;
            dbSet = dBContext.Set<T>();
        }

        public bool Add(T obj)
        {
            dbSet.Add(obj);

            return true;
        }

        public bool AddRange(List<T> obj)
        {
            dbSet.AddRange(obj);

            return true;
        }

        public void Delete(T obj)
        {
            dbSet.Remove(obj);
        }

        public void DeleteRange(IQueryable<T> obj)
        {
            dbSet.RemoveRange(obj);
        }

        public virtual void Update(T obj)
        {
            dbSet.Update(obj);
        }

       
        public async Task<T> GetByIdAsync(long id)
        {
            return await dbSet.FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetByAllAsync()
        {
            return await dbSet.ToListAsync();
        }

        public IQueryable<T> GetAllIQueryable()
        {
            return dbSet as IQueryable<T>;
        }

        public async Task<IEnumerable<T>> GetAllAsync(int pageNo, int pageSize, Expression<Func<T, bool>> filter, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null)
        {
            IQueryable<T> query = dbSet;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            if (orderBy != null)
            {
                query = orderBy(query);
            }

            return await query.Skip((pageNo - 1) * pageSize).Take(pageSize).ToListAsync();
        }
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (dBContext != null)
                {
                    dBContext.Dispose();
                    dBContext = null;
                }
            }
        }

        public int SaveChanges()
        {
            return dBContext.SaveChanges();
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
