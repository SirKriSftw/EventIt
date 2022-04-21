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
    public partial class User
    {
        public User()
        {
            Plans = new HashSet<Plan>();
        }
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        
        [JsonIgnore]
        public virtual ICollection<Plan> Plans { get; set; }

        EventItContext db = new EventItContext();

        public User authenticate(User authUser)
        {
          User loggedUser = new User();
          
          var vUser = db.Users.Where(u => u.Email == authUser.Email && u.Password == authUser.Password).SingleOrDefault();

          if (vUser != null)
          {
            loggedUser.UserId = vUser.UserId;
            loggedUser.Email = vUser.Email;
            loggedUser.Password = "";
            loggedUser.Name = vUser.Name;

            return loggedUser;
          }
          else
          {
            throw new Exception("Authentication failed");
          }
        }

        #region CREATE
        public string createUser(User newUser)
        {
            if (newUser != null)
            {
                var vUser = db.Users;
                foreach (var user in vUser)
                {
                    if ((newUser.Email == user.Email) &&
                        (newUser.Name == user.Name))
                    {
                        throw new Exception("USER ALREADY EXIST IN SYSTEM");
                    }
                }

                SqlParameter email = new SqlParameter("@email", newUser.Email);
                SqlParameter name = new SqlParameter("@name", newUser.Name);
                SqlParameter password = new SqlParameter("@password", newUser.Password);
                var iDparam = new SqlParameter()
                {
                    ParameterName = "@iD",
                    SqlDbType = System.Data.SqlDbType.Int,
                    Direction = System.Data.ParameterDirection.Output
                };

                db.Database.ExecuteSqlRaw("exec addUser @email, @password, @name, @iD output", email, password, name, iDparam);


                db.SaveChanges();
                return "New User Created with ID#" + iDparam.Value;

            }
            else
                throw new Exception("INVALID INPUT");
            
        }
        // IMPLEMENTED ^
        #endregion

        #region READ
        public DbSet<User> getUserList ()
        {
            var vUsers = db.Users;

            if (vUsers.Count() == 0)
            {
                throw new Exception("NO USER IN THE SYSTEM!");
            }
            else
            {
                return vUsers;
            }
        }
        // IMPLEMENTED ^
        public User getUser(int? id)
        {
            // LINQ Query Syntax version
            // var vUser = from user in db.Users
            //            where user.UserId == id
            //            select user;

            // LINQ Method Syntax version
            var vUser = db.Users.Where(u => u.UserId == id).ToList();

            int count = 0;

            User foundUser = new User();
            foreach (var u in vUser)
            {
                foundUser.UserId = u.UserId;
                foundUser.Email = u.Email;  
                foundUser.Password = u.Password;
                foundUser.Name = u.Name;
                
                count++;
            }

            if (count == 0)
            {
                throw new Exception("NO USER IN THE SYSTEM!");
            }
            else
            {
                return foundUser;
            }
        }
        // IMPLEMENTED ^
        public int getUserID(string email)
        {
            // LINQ Query Syntax version
            // var vUser = from user in db.Users
            //            where user.Email == email
            //            select user;

            // LINQ Method Syntax version
            var vUser = db.Users.Where(u => u.Email == email).ToList();

            int count = 0;
            User foundUser = new User();
            foreach (var u in vUser)
            {
                foundUser.UserId = u.UserId;
                foundUser.Email = u.Email;
                foundUser.Password = u.Password;
                foundUser.Name = u.Name;

                count++;
            }

            if (count == 0)
            {
                throw new Exception("NO USER IN THE SYSTEM!");
            }
            else
            {
                return foundUser.UserId;
            }
        }
        // IMPLEMENTED ^
        public User loginUser(User loginUser)
        {
            // LINQ Method Syntax version
            var vUser = db.Users.Where(u => u.Email == loginUser.Email && u.Password == loginUser.Password).Single();

            User foundUser = new User();
            if (vUser != null)
            {
                foundUser.UserId = vUser.UserId;
                foundUser.Email = vUser.Email;
                foundUser.Password = "";
                foundUser.Name = vUser.Name;

                return foundUser;
            }
            else
            { 
                throw new Exception("USER LOGIN NOT FOUND IN THE SYSTEM!");
            }
        }
        // IMPLEMENTED ^

        #endregion

        #region UPDATE
        // This method will update user name and email based on user ID given
        public string updateUser(User updateUser, int? id)
        { 
            updateUser.UserId = id.Value;

            // LINQ Method Syntax version
            var vUser = db.Users.Where(u => u.UserId == updateUser.UserId).Single();

            if (vUser == null)
            {
                throw new Exception("NO USER IN THE SYSTEM!");
            }
            else
            {
                vUser.Name = updateUser.Name;
                vUser.Email = updateUser.Email;
                db.SaveChanges();
                return "User Name and Email Updated";
            }
        }
        // IMPLEMENTED ^

        public string updateUserPassword(string userEmail, string updatedPwd)
        {
            // LINQ Method Syntax version
            var vUser = db.Users.Where(u => u.Email == userEmail).Single();
            
            if (vUser == null)
            {
                throw new Exception("NO USER IN THE SYSTEM!");
            }
            else
            {
                vUser.Password = updatedPwd;
                db.SaveChanges();
                return "User Password Updated";
            }
        }
        // IMPLEMENTED ^
        #endregion

        #region DELETE

        public string deleteUser(bool? confirmation, int? id)
        {
            // LINQ Query Syntax Version
            // var vUser = from u in db.Users
            //            where u.UserId == removeUser.UserId
            //            select u;

            // LINQ Method Syntax Version
            var vUser = db.Users.Where(u => u.UserId == id).Single();

            if (confirmation == true)
            {
                if (vUser != null)
                {
                    db.Users.Remove(vUser);
                    db.SaveChanges();
                    return "User removed from the system!";
                }
                else
                {
                    throw new Exception("NO USER IN THE SYSTEM!");
                }
            }
            else
            {
                throw new Exception("USER DELETION CONFIRMATION FAILED!");
            }
        }
        // IMPLEMENTED ^
        #endregion

    }
}
