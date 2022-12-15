namespace AuthenticationServer_.Net_core.Models.ModelsBase
{
    public interface IResetToken
    {
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
