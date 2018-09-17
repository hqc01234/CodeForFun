using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace CodeForFun.Data.UnitOfWork.Contracts
{
    public interface IUnitOfWork<TContext> where TContext : DbContext
    {
        DatabaseFacade Database { get; }

        ChangeTracker ChangeTracker { get; }

        int SaveChange();
    }
}
