namespace Onsharp.BeyondAutoCore.Domain.Interface
{
    public interface IBaseRepository<T> : IDisposable where T : class
    {


        // Read 
        Task<T> GetByIdAsync(long id);
        Task<IEnumerable<T>> GetByAllAsync();
        IQueryable<T> GetAllIQueryable();

        // Write
        bool Add(T entity);
        bool AddRange(List<T> entity);
        void Delete(T entity);
        void DeleteRange(IQueryable<T> entity);
        void Update(T entity);
        int SaveChanges();

    }
}
