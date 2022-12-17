using AuthenticationServer_.Net_core.Data.ApplicationQuaryBase;
using AuthenticationServer_.Net_core.Data.Interfaces;
using AuthenticationServer_.Net_core.Helpers;
using AuthenticationServer_.Net_core.Models.Dto;
using AuthenticationServer_.Net_core.Services.ServicesBase;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationServer_.Net_core.Controllers
{
    [ApiController]
    [Route("Forgot")]
    public class ForgotPasswordController : Controller
    {
        private readonly IResetTokenQuerys _dbResetTokenQuery;
        private readonly IUserQuerys _dbUserQuery;
        private readonly IEmailService _emailService;
        private static ControllerHelper _controllerHelper { get; } = new ControllerHelper();


        public ForgotPasswordController(IResetTokenQuerys resetToken, IEmailService emailService, IUserQuerys userQuerys)
        {
            _dbResetTokenQuery = resetToken;
            _emailService = emailService;
            _dbUserQuery = userQuerys;
        }

        [HttpPost("forgot")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            await _dbUserQuery.DeleteUserPassword(dto.Email);
            var resetToken = await _dbResetTokenQuery.CreateResetToken(dto.Email);
            await _emailService.SendResetPasswordEmailAsync(resetToken);
            return Ok("Reset link");
        }

        [HttpPost("reset")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {
            if (!_controllerHelper.CheckPasswordConfirm(dto.Password, dto.PasswordConfirm))
                return Unauthorized("Password didn't confirm");

            var resetUser = await _dbResetTokenQuery.GetResetTokenByToken(dto.Token);
            if (resetUser == null)
                return BadRequest("wrong token");

            await _dbUserQuery.UpdateUserPassword(resetUser.Email, dto.Password);
            return Ok("Reset Password successfully, you can login now");

        }
    }
}
