using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Microsoft.Extensions.Configuration;

namespace HitTheRoad.Website.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ApiController : ControllerBase
    {
        private readonly IHttpClientFactory httpClientFactory;
        private readonly IConfiguration configuration;

        public ApiController(IHttpClientFactory httpClientFactory, IConfiguration configuration)
        {
            this.httpClientFactory = httpClientFactory;
            this.configuration = configuration;
        }

        [HttpGet("getDestinations")]
        public async Task<string> GetDestinations()
        {
            HttpClient client = httpClientFactory.CreateClient();

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, string.Concat(configuration["Endpoint:Api"], "destinations"));
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

            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, string.Concat(configuration["Endpoint:Api"], "trips/origin/", originId, "/destination/", destinationId));
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