using CodeForFun.Data.DbContexts;
using CodeForFun.Data.Entities;
using CodeForFun.Data.Repositories.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Collections.Generic;
using System.Linq;

namespace CodeForFun.Data.Repositories
{
    public class BaseRepository<TContext, TEntity, TId> : IRepository<TEntity, TId>
        where TEntity : BaseEntity<TId>
        where TContext : DbContext
    {
        private readonly TContext _context;

        public BaseRepository(TContext context) => _context = context;

        public DbSet<TEntity> DbSet => _context.Set<TEntity>();

        public IEnumerable<TEntity> GetAll() => DbSet.ToList();

        public TEntity GetById(TId id) => DbSet.SingleOrDefault(x => x.Id.Equals(id));

        public EntityEntry Create(TEntity entity) => DbSet.Add(entity);

        public EntityEntry Update(TEntity entity) => DbSet.Update(entity);

        public EntityEntry Delete(TEntity entity) => DbSet.Remove(entity);
    }

    public class BaseRepository<TEntity> : BaseRepository<CodeForFunDbContext, TEntity, int> where TEntity : BaseEntity<int>
    {
        public BaseRepository(CodeForFunDbContext context) : base(context)
        {
        }
    }
}
