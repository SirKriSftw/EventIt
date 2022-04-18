using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using EventIt.Controllers;
using EventIt.Models.EF;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace EventIt.Models.EF
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

        EventItContext db = new EventItContext();

        #region CREATE
        public string createPlan(Plan newPlan)
        {
            User user = new User();
            if (newPlan != null)
            {
                var vPlans = db.Plans;
                foreach (var plans in vPlans)
                {
                    if ((newPlan.UserId == plans.UserId) &&
                        (newPlan.PlanDateStart == plans.PlanDateStart) &&
                        (newPlan.PlanDateEnd == plans.PlanDateEnd))
                    {
                        throw new Exception("PLAN TIME-FRAME ALREADY EXIST IN SYSTEM");
                    }
                }

                SqlParameter userId = new SqlParameter("@userId", newPlan.UserId);
                SqlParameter startTime = new SqlParameter("@startTime", newPlan.PlanDateStart);
                SqlParameter endTime = new SqlParameter("@endTime", newPlan.PlanDateEnd);
                SqlParameter details = new SqlParameter("@details", newPlan.Details);

                var iDparam = new SqlParameter()
                {
                    ParameterName = "@iD",
                    SqlDbType = System.Data.SqlDbType.Int,
                    Direction = System.Data.ParameterDirection.Output
                };

                db.Database.ExecuteSqlRaw("exec addPlan @userId, @startTime, @endTime, @details, @iD output", userId, startTime, endTime, details, iDparam);
                db.SaveChanges();

                int PlanSuccess = Convert.ToInt32(iDparam.Value);
                if (PlanSuccess != -1)
                {
                    return "New Plan Created for USER#" + newPlan.UserId + " with ID#" + iDparam.Value;
                }
                else
                    throw new Exception("NEW PLAN CREATION FAILED");


            }
            else
                throw new Exception("INVALID INPUT");
        }
        // IMPLEMENTED ^
        #endregion

        #region READ
        public DbSet<Plan> getPlanListAll()
        {
            var vPlans = db.Plans;

            if (vPlans.Count() == 0)
            {
                throw new Exception("NO PLANS IN THE SYSTEM!");
            }
            else
            {
                return vPlans;
            }
        }
        // IMPLEMENTED ^
        public List<Plan> getPlanList(int? id)
        {
            //var vPlans = (from plans in db.Plans
            //             where plans.UserId == id
            //             select plans).ToList();

            var vPlans = db.Plans.Where(plans => plans.UserId == id).ToList();


            if (vPlans.Count() == 0)
            {
                throw new Exception("USER HAS NO PLANS IN THE SYSTEM!");
            }
            else
            {
                return vPlans;
            }

        }
        // IMPLEMENTED ^
        #endregion

        #region UPDATE
        public string updatePlan(Plan updatePlan, int? id)
        {
            if (updatePlan != null)
            {
                // LINQ Method Syntax Version
                var vPlans = db.Plans.Where(p => p.PlanId == id).Single();

                updatePlan.PlanId = id.Value;

                SqlParameter planId = new SqlParameter("@planId", updatePlan.PlanId);
                SqlParameter startTime = new SqlParameter("@startTime", updatePlan.PlanDateStart);
                SqlParameter endTime = new SqlParameter("@endTime", updatePlan.PlanDateEnd);
                SqlParameter details = new SqlParameter("@details", updatePlan.Details);

                var updateResult = new SqlParameter()
                {
                    ParameterName = "@result",
                    SqlDbType = System.Data.SqlDbType.Bit,
                    Direction = System.Data.ParameterDirection.Output
                };

                db.Database.ExecuteSqlRaw("exec updatePlan @planId, @startTime, @endTime, @details, @result output",
                                           planId, startTime, endTime, details, updateResult);
                db.SaveChanges();

                bool PlanUpdateSuccess = Convert.ToBoolean(updateResult.Value);
                if (PlanUpdateSuccess == true)
                {
                    return "Plan Updated for USER#" + updatePlan.UserId;
                }
                else
                    throw new Exception("PLAN UPDATE FAILED");
            }
            else
                throw new Exception("INVALID INPUT");
        }
        // IMPLEMENTED ^
        #endregion

        #region DELETE
        public string deletePlan(bool? confirmation, int? planId)
        {
            
            // LINQ Method Syntax Version
            var vPlan = db.Plans.Where(p => p.PlanId == planId).Single();

            if (confirmation == true)
            {
                if (vPlan != null)
                {
                    db.Plans.Remove(vPlan);
                    db.SaveChanges();
                    return "Plan removed from the system!";
                }
                else
                    throw new Exception("NO PLANS MATCHING PLAN#" + planId + " FOUND IN THE SYSTEM");
            }
            else
            {
                throw new Exception("PLAN DELETION CONFIRMATION FAILED!");
            }
        }
        // IMPLEMENTED ^
        #endregion
    }
}
