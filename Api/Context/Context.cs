using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using System;
using HitTheRoad.Classes;

namespace HitTheRoad.Api 
{
    public class Context : DbContext
    {
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Trip> Trips { get; set; }

        public Context(DbContextOptions<Context> options) : base(options)
        {}

        // protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlite("DataSource=database.db");

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Destination>()
                .HasKey(d => d.Id);

            builder.Entity<Trip>()
                .HasKey(t => t.Id);
        }
    }
}