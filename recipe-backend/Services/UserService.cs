using Microsoft.IdentityModel.Tokens;
using Models;
using Persistence;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Services
{
    public class UserService
    {
        private readonly RecipeContext context;
        private readonly Settings settings;

        public UserService(RecipeContext context, Settings settings)
        {
            this.context = context;
            this.settings = settings;
        }

        public bool CheckIfAuthorized(string token)
        {
            JwtSecurityToken jwtSecurityToken = new(token);

            return jwtSecurityToken.Issuer == settings.Backend && (jwtSecurityToken.ValidTo - DateTime.UtcNow).TotalSeconds > 0;
        }

        public bool CheckIfRegistered(string email)
        {
            User dbUser = context.GetRegisteredUserByEmail(email);

            if (dbUser == null)
            {
                return false;
            }

            return true;
        }

        public void RegisterUser(User user)
        {
            string password = EncryptPassword(user.Password);

            user.Password = password;

            context.AddUser(user);
        }

        private string EncryptPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                return null;
            }

            password += settings.Key;

            byte[] bytes = Encoding.UTF8.GetBytes(password);

            return Convert.ToBase64String(bytes);
        }

        public User GetUserByEmail(string email)
        {
            return context.GetRegisteredUserByEmail(email);
        }

        public JwtSecurityToken CheckIfCanSignIn(User user, string password)
        {
            if (user == null)
            {
                return null;
            }

            if (password == DecryptPassword(user.Password))
            {
                SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(settings.Jwt));
                SigningCredentials signingCredentials = new(key, SecurityAlgorithms.HmacSha256);

                var offset = TimeZoneInfo.Local.GetUtcOffset(DateTime.UtcNow);

                JwtSecurityToken token = new(
                    issuer: settings.Backend,
                    audience: settings.Backend,
                    claims: new List<Claim>(),
                    signingCredentials: signingCredentials,
                    expires: DateTime.UtcNow.AddMinutes(60 + offset.TotalMinutes)
                );

               return token;
            }

            return null;
        }

        private string DecryptPassword(string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                return null;
            }

            byte[] bytes = Convert.FromBase64String(password);
            string decryptedPassword = Encoding.UTF8.GetString(bytes);

            return decryptedPassword[..^settings.Key.Length];
        }
    }
}
