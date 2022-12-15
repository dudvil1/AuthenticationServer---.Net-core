using AuthenticationServer_.Net_core.Data.ApplicationQuaryBase;
using AuthenticationServer_.Net_core.Models.Dto;
using AuthenticationServer_.Net_core.Models.ModelsBase;
using Microsoft.AspNetCore.Mvc;

namespace AuthenticationServer_.Net_core.Controllers
{
    [ApiController]
    [Route("Forgot")]
    public class ForgotPasswordController : Controller
    {
        private readonly IResetTokenQuerys _dbResetTokenQuery;

        public ForgotPasswordController(IResetTokenQuerys resetToken)
        {
            _dbResetTokenQuery = resetToken;
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            try
            {
                var resetToken = await _dbResetTokenQuery.CreateResetToken(dto.Email);
                return Ok(resetToken);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
