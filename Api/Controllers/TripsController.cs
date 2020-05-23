using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HitTheRoad.Classes;
using Microsoft.EntityFrameworkCore;

namespace HitTheRoad.Api.Controllers
{
    [ApiController]
    [Route("trips")]

    public class TripsController : ControllerBase
    {
        private readonly Context db;
        private readonly double pricePerKm;
        public TripsController(Context db)
        {
            this.db = db;
            pricePerKm = 0.2;
        }

        public static double ToRadians(double degrees)
        {
            return ((Math.PI / 180) * degrees);
        }

        public static double Distance(double latitude1, double latitude2, double longitude1, double longitude2)
        {
            latitude1 = ToRadians(latitude1);
            latitude2 = ToRadians(latitude2);
            longitude1 = ToRadians(longitude1);
            longitude2 = ToRadians(longitude2);

            double deltaLat = latitude2 - latitude1;
            double deltaLong = longitude2 - longitude1;

            double a = Math.Pow(Math.Sin(deltaLat / 2), 2) + Math.Cos(latitude1) * Math.Cos(latitude2) * Math.Pow(Math.Sin(deltaLong / 2), 2);
            double c = 2 * Math.Asin(Math.Sqrt(a));
            double r = 6371;

            return (c * r);
        }

        [HttpGet]
        public async Task<IEnumerable<Trip>> Get()
        {
            return await db.Trips.ToListAsync();
        }

        [HttpGet("origin/{originId}/destination/{destinationId}")]
        public async Task<IEnumerable<Trip>> Get(int originId, int destinationId)
        {
            return await db.Trips.Where(t => t.OriginId == originId && t.DestinationId == destinationId).Include(t => t.Origin).Include(t => t.Destination).ToListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Trip trip)
        {
            try 
            {  
                Destination dest1 = await db.Destinations.Where(d => d.Id == trip.OriginId).FirstOrDefaultAsync();
                Destination dest2 = await db.Destinations.Where(d => d.Id == trip.DestinationId).FirstOrDefaultAsync();
                double distance = Distance(dest1.Latitude, dest2.Latitude, dest1.Longitude, dest2.Longitude);

                trip.Price = distance * pricePerKm;

                await db.Trips.AddAsync(trip);
                await db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Trip trip)
        {
            if (id != trip.Id)
            {
                return BadRequest();
            }

            try
            {
                db.Entry(trip).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                if (!db.Trips.Any(t => t.Id == id))
                    return BadRequest("Not Found");
                else
                    return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (db.Trips.Any(t => t.Id == id))
            {
                try
                {
                    Trip trip = await db.Trips.Where(t => t.Id == id).FirstOrDefaultAsync();
                    db.Trips.Remove(trip);
                    await db.SaveChangesAsync();
                    return Ok();
                }
                catch (Exception e)
                {
                    return BadRequest(e.Message);
                }
            }
            else
            {
                return BadRequest("Not Found");
            }
        }
    }
}