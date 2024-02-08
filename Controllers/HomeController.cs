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
        private readonly IConfiguration _configuration;

        public HomeController(ILogger<HomeController> logger, IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            _logger = logger;
            _httpClient = httpClientFactory.CreateClient();
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> FridgeList()
        {
            string requestUrl = _configuration["ConnectionStrings:ApiString"] + "/Fridges";

            ViewData["ApiString"]= _configuration["ConnectionStrings:ApiString"];

			using HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get,requestUrl);
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
    }
}
