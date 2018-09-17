using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CodeForFun.Data.Extensions
{
    public static class ModelBuilderExtensions
    {
        public static void AddEntityConfigurationsFromAssembly(this ModelBuilder modelBuilder)
        {
            var entityTypeConfigs = GetEntityTypeConfigurations().Select(Activator.CreateInstance);

            foreach (dynamic config in entityTypeConfigs)
            {
                modelBuilder.ApplyConfiguration(config);
            }

            IEnumerable<Type> GetEntityTypeConfigurations()
            {
                return Assembly.GetExecutingAssembly().GetTypes().Where(
                    type => type.IsClass && !type.IsAbstract && IsEntityTypeConfiguration(type)
                );

                bool IsEntityTypeConfiguration(Type type)
                {
                    return type.GetInterfaces().Any(_interface =>
                    {
                        return _interface.IsGenericType && _interface.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>);
                    });
                };
            }
        }
    }
}
