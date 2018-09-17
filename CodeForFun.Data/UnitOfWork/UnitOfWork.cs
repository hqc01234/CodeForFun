using CodeForFun.Data.UnitOfWork.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace CodeForFun.Data.UnitOfWork
{
    public class UnitOfWork<TContext> : IUnitOfWork<TContext> where TContext: DbContext
    {
        private readonly TContext _context;

        public UnitOfWork(TContext context) => _context = context;

        public DatabaseFacade Database => _context.Database;

        public ChangeTracker ChangeTracker => _context.ChangeTracker;

        public int SaveChange() => _context.SaveChanges();
    }
}
