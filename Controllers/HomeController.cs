using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebApiFridges.CLIENT.Models;

namespace WebApiFridges.CLIENT.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult FridgeList()
        {
            return View();
        }
        public IActionResult CreateFridge()
        {
            return View();
        }
        public IActionResult EditFridge()
        {
            return View();
        }
        public IActionResult ShowProducts()
        {
            return View();
        }
        public IActionResult EditProducts()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
