using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Net.Http;
using WebApiFridges.CLIENT.Models;
using WebApiFridges.CLIENT.MyResponceClasses;

namespace WebApiFridges.CLIENT.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly HttpClient _httpClient;

        public HomeController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory)
        {
            _logger = logger;
            _httpClient = httpClientFactory.CreateClient();
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> FridgeList()
        {
            using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, "https://localhost:7196/api/Fridges");
            using HttpResponseMessage response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                List<ResponceFridges> fridgesList = JsonConvert.DeserializeObject<List<ResponceFridges>>(content);
                return View(fridgesList);
            }
            else
                return View("Error", $"Ошибка при выполнении запроса. Код ошибки: {response.StatusCode}");
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
