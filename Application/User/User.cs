namespace Application.User
{
    //these are the properties we want to return when a user signs in to the application
    //b/c we dont want to send back the password and all the other information
    public class User
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string Image { get; set; }
    }
}