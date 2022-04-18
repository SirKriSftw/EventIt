using EventIt.Models.EF;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;

namespace EventIt.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanController : ControllerBase
    {
        #region Logger Setup
        private readonly ILogger<PlanController> _logger;

        public PlanController(ILogger<PlanController> logger)
        {
            _logger = logger;
        }
        #endregion

        static Plan _plan = new Plan();

        #region POST
        [HttpPost]
        [Route("createplan")]
        public IActionResult createPlan(Plan newplan)
        {
            try
            {
                return Created("", _plan.createPlan(newplan));
            }
            catch (System.Exception ex)
            
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }

        }
        #endregion

        #region GET
        [HttpGet]
        [Route("getPlan/All")]
        public IActionResult getPlanListAll()
        {
            try
            {
                return Ok(_plan.getPlanListAll());
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("getPlan/{id:int}")]
        public IActionResult getPlanList(int? id)
        {
            try
            {
                return Ok(_plan.getPlanList(id));
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region PUT
        [HttpPut]
        [Route("updatePlan")]
        public IActionResult updatePlan(Plan updatePlan, int? id)
        {
            try
            {
                return Accepted(_plan.updatePlan(updatePlan, id));
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
        #endregion

        #region DELETE
        [HttpDelete]
        [Route("deletePlan")]
        public IActionResult deletePlan(bool? confirmation, int? planId)
        {
            try
            {
                return Accepted(_plan.deletePlan(confirmation, planId));
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
        #endregion

    }
}
