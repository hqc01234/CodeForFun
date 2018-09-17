namespace IdentityServer.SeedData.Contracts
{
    public interface IDbInitializer
    {
        void Initialize();
    }

    public interface IAspNetIdentityDbInitializer : IDbInitializer
    {
    }

    public interface IIdentityServerDbInitializer : IDbInitializer
    {
    }
}
