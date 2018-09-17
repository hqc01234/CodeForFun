using CodeForFun.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Collections.Generic;

namespace CodeForFun.Data.Repositories.Contracts
{
    public interface IRepository<TEntity, TId>
        where TEntity : BaseEntity<TId>
    {
        DbSet<TEntity> DbSet { get; }

        TEntity GetById(TId id);

        IEnumerable<TEntity> GetAll();

        EntityEntry Create(TEntity entity);

        EntityEntry Update(TEntity entity);

        EntityEntry Delete(TEntity entity);
    }

    public interface IRepository<TEntity> : IRepository<TEntity, int>
        where TEntity : BaseEntity<int>
    {

    }
}
