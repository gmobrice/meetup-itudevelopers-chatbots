using System;
using Newtonsoft.Json;

namespace HitTheRoad.Classes
{
    public class Destination
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Flag { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Photo { get; set; }
    }

    public class Trip
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Destination Origin { get; set; }
        public int OriginId { get; set; }
        public Destination Destination { get; set; }
        public int DestinationId { get; set; }
        public double Price { get; set; }
    }

    // Paste JSON as Classes
    public class LuisModel
    {
        [JsonProperty("query")]
        public string Query { get; set; }

        [JsonProperty("prediction")]
        public Prediction Prediction { get; set; }
    }

    public class Prediction
    {
        [JsonProperty("topIntent")]
        public string TopIntent { get; set; }

        [JsonProperty("intents")]
        public Intents Intents { get; set; }

        [JsonProperty("entities")]
        public Entities Entities { get; set; }
    }

    public class Entities
    {
        [JsonProperty("destination")]
        public string[][] Destinations { get; set; }
    }

    public class Destinations
    {
        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("startIndex")]
        public long StartIndex { get; set; }

        [JsonProperty("length")]
        public long Length { get; set; }

        [JsonProperty("modelTypeId")]
        public long ModelTypeId { get; set; }

        [JsonProperty("modelType")]
        public string ModelType { get; set; }

        [JsonProperty("recognitionSources")]
        public string[] RecognitionSources { get; set; }
    }

    public class Intents
    {
        [JsonProperty("findTrip")]
        public IntentScore FindTrip { get; set; }

        [JsonProperty("findDestinations")]
        public IntentScore FindDestinations { get; set; }

        [JsonProperty("greetings")]
        public IntentScore greetings { get; set; }

        [JsonProperty("None")]
        public IntentScore None { get; set; }
    }

    public class IntentScore
    {
        [JsonProperty("score")]
        public double Score { get; set; }
    }
}