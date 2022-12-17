using AuthenticationServer_.Net_core.Models.ModelsBase;
using AuthenticationServer_.Net_core.Services.ServicesBase;
using EmailService.Models;
using EmailService.Service.ServiceBase;

namespace AuthenticationServer_.Net_core.Services
{
    public class EmailService : IEmailService
    {
        private readonly IEmailSender _emailSender;

        public EmailService(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }
        public async Task SendResetPasswordEmailAsync(IResetToken resetToken)
        {
            var message = new Message(new string[] { resetToken.Email }, "Reset Password", resetToken.Token);
            await _emailSender.SendEmailAsync(message);
        }
    }
}