﻿using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    //we derive from IdentityDbContext instead of just dbcontext
    //since we are adding auth
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Fish> FishCaught { get; set; }
        public DbSet<UserFish> UserFishCaught { get; set; }

        protected override void OnModelCreating(ModelBuilder builder){
            //allows us to give our AppUser a primary key of a string. will get error if we dont add this
            base.OnModelCreating(builder);
            builder.Entity<Value>()
                .HasData(
                    new Value {Id = 1, Name = "Value 101"},
                    new Value { Id = 2, Name = "Value 102" },
                    new Value { Id = 3, Name = "Value 103" }

                );
            builder.Entity<UserFish>(x => x.HasKey(ua => 
                new {ua.AppUserId, ua.FishId}));
            //must define the relationship between the two tables here
            //User fish will have one user, many fishcaught, with a foreign key of the user Id
            builder.Entity<UserFish>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.UserFishCaught)
                .HasForeignKey(u => u.AppUserId);
            builder.Entity<UserFish>()
                .HasOne(a => a.Fish)
                .WithMany(u => u.UserFishCaught)
                .HasForeignKey(a => a.FishId);
        }
    }
} 
