using AuthenticationServer_.Net_core.Models.ModelsBase;

namespace AuthenticationServer_.Net_core.Data.ApplicationQuaryBase
{
    public interface IResetTokenQuerys
    {
        Task<IResetToken> CreateResetToken(string email);

        Task<IResetToken> GetResetTokenByToken(string token);
    }
}
