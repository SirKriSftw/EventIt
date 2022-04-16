using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace Eventit.Models
{
    public partial class User
    {
        public User()
        {
            Plans = new HashSet<Plan>();
        }
        [JsonIgnore]
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public virtual ICollection<Plan> Plans { get; set; }
    }
}
