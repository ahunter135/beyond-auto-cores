using System.ComponentModel.DataAnnotations;

namespace Onsharp.BeyondAutoCore.Web.Model.Command
{
    public class LoginCommand
    {
        [Required(ErrorMessage = "Please enter Email Address")]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "Email Address")]
        [EmailAddress(ErrorMessage = "Please enter valid Email Address")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Please enter Password")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
}
