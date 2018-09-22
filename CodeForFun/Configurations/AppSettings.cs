namespace CodeForFun.Configurations
{
    public class AppSettings
    {
        public string AuthorityIssuer { get; set; } = "https://localhost:5003";

        public string ApiName { get; set; } = "codeforfun";

        public int HttpsPort { get; set; } = 5001;

        public string CORSPolicyName { get; set; } = "AllowIdentityServer";

		public string ApiPolicyName { get; set; } = "CodeForFun";
	}
}
