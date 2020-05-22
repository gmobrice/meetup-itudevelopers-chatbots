using System;

namespace HitTheRoad.Classes
{
    public class Destination
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Flag { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
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
}
