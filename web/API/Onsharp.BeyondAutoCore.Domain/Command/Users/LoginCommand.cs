
namespace Onsharp.BeyondAutoCore.Domain.Command
{
    public class LoginCommand
    {
        /// <summary>
        /// A username input that is passed to perform authentication.
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Used in conjunction with username to perform authentication.
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Vald
        /// </summary>
        public bool ValidateSubscription { get; set; }

    }
}
