using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Eventit.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly EventitContext _db;

        public UserController(ILogger<UserController> logger, EventitContext eventitContext)
        {
            _logger = logger;
            _db = eventitContext;
        }

        [HttpGet]
        public IActionResult GetUsers()
        {

            return Ok(_db.Users);
        }

        [HttpPost]
        public IActionResult Post(User user)
        {
            _db.Add(user);
            _db.SaveChanges();
            return Created("https://localhost:5001/user/created", JsonConvert.SerializeObject(user));

        }


    }
}