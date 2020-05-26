using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace HitTheRoad.Chatbot
{
    public class Helpers
    {
        public static async Task<string> getTopIntent(HttpClient client, string phrase)
        {
            string luisEndpoint = string.Concat("https://westus.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/ef477f80-57b7-4518-ac9c-ffc9d08fb68c/slots/staging/predict?subscription-key=134a3542888d4e5d8fe9ce2368ea0f2a&verbose=true&show-all-intents=true&log=true&query=", phrase);
            HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, luisEndpoint);

            HttpResponseMessage response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                JObject responseJson = JObject.Parse(await response.Content.ReadAsStringAsync());
                
                if (responseJson.ContainsKey("prediction"))
                {
                    return responseJson["prediction"]["topIntent"].Value<String>();
                }
                else
                    return "Error";
            }
            else
            {
                return "Error";
            }
        }
    }
}