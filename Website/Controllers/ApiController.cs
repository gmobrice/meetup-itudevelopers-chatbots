using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using HitTheRoad.Classes;
using System.Net.Http;

namespace HitTheRoad.Website.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        private readonly IHttpClientFactory httpClientFactory;

        public ApiController(IHttpClientFactory httpClientFactory)
        {
            this.httpClientFactory = httpClientFactory;
        }

        [HttpGet("getDestinations")]
        public async Task<string> GetDestinations()
        {
            HttpClient client = httpClientFactory.CreateClient();

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, "https://localhost:5003/destinations");
            HttpResponseMessage response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync();
            }
            else
            {
                return "";
            }
        }

        [HttpGet("getTrip/origin/{originId}/destination/{destinationId}")]
        public async Task<string> GetTrip(int originId, int destinationId)
        {
            HttpClient client = httpClientFactory.CreateClient();

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, $"https://localhost:5003/trips/origin/{originId}/destination/{destinationId}");
            HttpResponseMessage response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync();
            }
            else
            {
                return "";
            }
        }
    }
}