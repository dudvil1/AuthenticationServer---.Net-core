using AuthenticationServer_.Net_core.Models.ModelsBase;

namespace AuthenticationServer_.Net_core.Services.ServicesBase
{
    public interface IEmailService
    {
        Task SendResetPasswordEmailAsync(IResetToken resetToken);
    }
}
