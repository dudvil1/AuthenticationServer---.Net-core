using Microsoft.AspNetCore.Mvc;

namespace AuthenticationServer_.Net_core.Controllers
{
    public class DefaultsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
