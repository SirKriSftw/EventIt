using System;
using System.Collections.Generic;

#nullable disable

namespace Eventit.Models
{
    public partial class Plan
    {
        public int PlanId { get; set; }
        public int? UserId { get; set; }
        public DateTime? PlanDateStart { get; set; }
        public DateTime? PlanDateEnd { get; set; }
        public string Details { get; set; }

        public virtual User User { get; set; }
    }
}
