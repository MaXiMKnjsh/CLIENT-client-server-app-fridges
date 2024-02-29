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
		private readonly HttpClient _httpClient;
		private readonly IConfiguration _configuration;

		public HomeController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
		{
			_httpClient = httpClientFactory.CreateClient();
			_configuration = configuration;
		}
		private async Task<T> SendHttpRequest<T>(HttpMethod method, string requestUrl)
		{
			using HttpRequestMessage request = new HttpRequestMessage(method, requestUrl);
			using HttpResponseMessage response = await _httpClient.SendAsync(request);

			if (response.IsSuccessStatusCode)
			{
				string content = await response.Content.ReadAsStringAsync();
				return JsonConvert.DeserializeObject<T>(content);
			}
			else
			{
				throw new Exception($"Ошибка при выполнении запроса. Код ошибки: {response.StatusCode}");
			}
		}
		public async Task<IActionResult> FridgeList()
		{
			ViewData["ApiString"] = _configuration["ConnectionStrings:ApiString"];

			string requestUrl = _configuration["ConnectionStrings:ApiString"] + "/Fridges"; // запрос на список холоидльников
			var fridgesList = await SendHttpRequest<List<ResponceFridges>>(HttpMethod.Get, requestUrl);

			ViewData["FridgesList"] = fridgesList;

			return View();
		}
		public async Task<IActionResult> CreateFridge()
		{
			ViewData["ApiString"] = _configuration["ConnectionStrings:ApiString"];

			string requestUrl = _configuration["ConnectionStrings:ApiString"] + "/Products"; // запрос на список продуктов
			var productsList = await SendHttpRequest<List<ResponceProducts>>(HttpMethod.Get, requestUrl);

			ViewData["ProductsList"] = productsList;

			requestUrl = _configuration["ConnectionStrings:ApiString"] + "/FridgeModels"; // запрос на список моделей
			var modelsList = await SendHttpRequest<List<ResponceFridgeModels>>(HttpMethod.Get, requestUrl);

			ViewData["ModelsList"] = modelsList;

			return View();
		}
		public async Task<IActionResult> EditFridge()
		{
			ViewData["ApiString"] = _configuration["ConnectionStrings:ApiString"];

			string requestUrl = _configuration["ConnectionStrings:ApiString"] + "/Fridges"; // запрос на список холоидльников
			var fridgesList = await SendHttpRequest<List<ResponceFridges>>(HttpMethod.Get, requestUrl);
			ViewData["FridgesList"] = fridgesList;

			requestUrl =_configuration["ConnectionStrings:ApiString"] + "/FridgeModels";
			var models = await SendHttpRequest<List<ResponceFridgeModels>>(HttpMethod.Get, requestUrl);
			ViewData["ModelsList"] = models;

			return View();
		}
		public async Task<IActionResult> ShowProducts()
		{
			ViewData["ApiString"] = _configuration["ConnectionStrings:ApiString"];

			string requestUrl = _configuration["ConnectionStrings:ApiString"] + "/Fridges"; // запрос на список холоидльников
			var fridgesList = await SendHttpRequest<List<ResponceFridges>>(HttpMethod.Get, requestUrl);

			ViewData["FridgesList"] = fridgesList;

			return View();
		}
		public IActionResult Index()
		{
			return View();
		}
		public async Task<IActionResult> EditProducts()
		{
			ViewData["ApiString"] = _configuration["ConnectionStrings:ApiString"];

			string requestUrl = _configuration["ConnectionStrings:ApiString"] + "/Fridges"; // запрос на список холоидльников
			var fridgesList = await SendHttpRequest<List<ResponceFridges>>(HttpMethod.Get, requestUrl);
			ViewData["FridgesList"] = fridgesList;

			requestUrl = _configuration["ConnectionStrings:ApiString"] + "/Products";
			var prods = await SendHttpRequest<List<ResponceProducts>>(HttpMethod.Get, requestUrl);
			ViewData["ProductsList"] = prods;

			return View();
		}
	}
}
