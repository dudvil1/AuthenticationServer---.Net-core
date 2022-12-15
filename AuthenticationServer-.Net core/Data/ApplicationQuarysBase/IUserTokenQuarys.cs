using AuthenticationServer_.Net_core.Models.ModelsBase;

namespace AuthenticationServer_.Net_core.Data.ApplicationQuaryBase
{
    public interface IUserTokenQuarys
    {
        Task<IUserToken> CreateUserToken(int id, string refreshToken, DateTime expired);

        Task<bool> IsTokenValid(int id, string refreshToken, DateTime expired);

        Task DeleteToken(string token);
    }
}
