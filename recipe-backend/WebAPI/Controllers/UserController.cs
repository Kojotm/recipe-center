using Microsoft.AspNetCore.Mvc;
using Models;
using Services;
using System.IdentityModel.Tokens.Jwt;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserService userService;

        public UserController(UserService service)
        {
            userService = service;
        }

        [HttpPost("register")]
        public ActionResult Register(User user)
        {
            if (userService.CheckIfRegistered(user.Email))
            {
                return BadRequest("Email already in use");
            }

            userService.RegisterUser(user);

            return Ok();
        }

        [HttpPost("login")]
        public ActionResult Login(Login login)
        {
            if (!userService.CheckIfRegistered(login.Email))
            {
                return NotFound("No such email registered");
            }

            User user = userService.GetUserByEmail(login.Email);

            JwtSecurityToken jwtToken = userService.CheckIfCanSignIn(user, login.Password);

            string token = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            if(string.IsNullOrEmpty(token))
            {
                return BadRequest("Wrong password");
            }

            return Ok(new { Token = token, UserId = user.Id });
        }
    }
}
