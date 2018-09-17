using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;

namespace CodeForFun.Data.DbContexts
{
    public class DbContextFactory : IDesignTimeDbContextFactory<CodeForFunDbContext>
    {
        public CodeForFunDbContext CreateDbContext(string[] args)
        {
            var projectPath = AppDomain.CurrentDomain.BaseDirectory.Split(new string[] { @"bin\" }, StringSplitOptions.None)[0];
            var configuration = new ConfigurationBuilder()
                .SetBasePath(projectPath)
                .AddJsonFile("appsettings.local.json")
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");

            var optionsBuilder = new DbContextOptionsBuilder<CodeForFunDbContext>();
            optionsBuilder.UseSqlServer(connectionString);

            return new CodeForFunDbContext(optionsBuilder.Options);
        }
    }
}
