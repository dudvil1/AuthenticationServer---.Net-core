using Microsoft.AspNetCore.Mvc;

namespace AuthenticationServer_.Net_core.Controllers
{
    [ApiController]
    [Route("/")]
    public class DefaultsController : Controller
    {
        [HttpGet("")]
        public async Task<IActionResult> Index()
        {
            return await Ok("Server alive");
        }
    }
}
