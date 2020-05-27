using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace HitTheRoad.Chatbot
{
    public class Helpers
    {
        public static async Task<string> getLuisPrediction(HttpClient client, string phrase)
        {
            if (!string.IsNullOrEmpty(phrase))
            {
                string luisEndpoint = string.Concat("https://westus.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/ef477f80-57b7-4518-ac9c-ffc9d08fb68c/slots/staging/predict?subscription-key=134a3542888d4e5d8fe9ce2368ea0f2a&verbose=true&show-all-intents=true&log=true&query=", phrase);
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, luisEndpoint);

                HttpResponseMessage response = await client.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }
                else
                {
                    return "Error";
                }
            }
            else
            {
                return "Error";
            }
        }

        public static string getTopIntent(string prediction)
        {
            JObject predictionJson = JObject.Parse(prediction);
                
            if (predictionJson.ContainsKey("prediction"))
            {
                return predictionJson["prediction"]["topIntent"].Value<String>();
            }
            else
            {
                return "Error";
            }
        }

        public static Dictionary<string, string> getDestinations(string prediction)
        {
            Dictionary<string, string> ret = new Dictionary<string, string>();

            JObject predictionJson = JObject.Parse(prediction);

            if (predictionJson.ContainsKey("prediction"))
            {
                JObject entities = (JObject) predictionJson["prediction"]["entities"];

                if (entities.Count > 0)
                {
                    string entityType = ((JProperty) entities.First).Name;
                    foreach (JArray ent in entities[entityType])
                    {
                        ret.Add(ent[0].Value<string>(), entityType);
                    }
                }
            }

            return ret;
        }
    }
}