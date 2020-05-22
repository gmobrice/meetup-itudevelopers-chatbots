using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using HitTheRoad.Classes;
using Microsoft.EntityFrameworkCore;

namespace HitTheRoad.Api.Controllers
{
    [ApiController]
    [Route("destinations")]

    public class DestinationsController : ControllerBase
    {
        private readonly Context db;
        public DestinationsController(Context db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<IEnumerable<Destination>> Get()
        {
            return await db.Destinations.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<Destination> Get(int id)
        {
            return await db.Destinations.Where(d => d.Id == id).FirstOrDefaultAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Destination destination)
        {
            try 
            {  
                await db.Destinations.AddAsync(destination);
                await db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Destination destination)
        {
            if (id != destination.Id)
            {
                return BadRequest();
            }

            try
            {
                db.Entry(destination).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                if (!db.Destinations.Any(d => d.Id == id))
                    return BadRequest("Not Found");
                else
                    return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (db.Destinations.Any(d => d.Id == id))
            {
                try
                {
                    Destination destination = await db.Destinations.Where(d => d.Id == id).FirstOrDefaultAsync();
                    db.Destinations.Remove(destination);
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