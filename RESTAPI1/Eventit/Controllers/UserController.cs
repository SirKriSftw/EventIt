using System.Linq;
using Eventit.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        #region Logger Setup
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }
        #endregion


        // static User object for method calls
        static User _user = new User();
        EventitContext _db = new EventitContext();

        #region POST
        [HttpPost]
        [Route("createUser")]
        public IActionResult createUser(User newUser)
        {
            try
            {
                return Created("", _user.createUser(newUser));
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
        [Route("getUser")]
        public IActionResult getUserList()
        {
            try
            {
                return Ok(_user.getUserList());
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

    [HttpGet]
    [Route("getUser/{id:int}")]
    public IActionResult getUser(int? id)
    {
      try
      {
        return Ok(_user.getUser(id));
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
        [Route("updateUser")]
        public IActionResult updateUser(User updateUser, int? id)
        {
            try
            {
                return Accepted(_user.updateUser(updateUser, id));
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("updateUserPassword/{userEmail}")]
        public IActionResult updateUserPassword(string userEmail, string updatedPwd)
        {
            try
            {
                return Accepted(_user.updateUserPassword(userEmail, updatedPwd));
            }
            catch (System.Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return BadRequest(ex.Message);
            }
        }
    #endregion

    [HttpPost]
    [Route("authenticate")]
    public IActionResult authenticateUser(User authUser)
    {
      try
      {
        return Ok(_user.authenticate(authUser));
      }
      catch (System.Exception ex)
      {
        _logger.LogError(ex, ex.Message);
        return BadRequest(ex.Message);
      }
    }

      #region DELETE
      [HttpDelete]
        [Route("deleteUser")]
        public IActionResult deleteUser(bool? confirmation, int? userId)
        {
            try
            {
                return Accepted(_user.deleteUser(confirmation, userId));
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