using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace Eventit.Models
{
    public partial class Plan
    {
        [JsonIgnore]
        public int PlanId { get; set; }
        public int? UserId { get; set; }
        public DateTime? PlanDateStart { get; set; }
        public DateTime? PlanDateEnd { get; set; }
        public string Details { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
    }
}
