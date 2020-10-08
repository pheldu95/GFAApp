using System;

//this will be a join table. allow us to make joins from the db
namespace Domain
{
    public class UserFish
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid FishId { get; set; }
        public Fish Fish { get; set; }
        public bool Liked { get; set; }
    }
}