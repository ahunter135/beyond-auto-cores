namespace Onsharp.BeyondAutoCore.Domain.Model
{
    public class RefreshTokenModel: BaseModel
    {
        /// <summary>
        /// Initializes new instance of <see cref="RefreshToken"/>.
        /// </summary>
        /// <param name="userId">The user identifier.</param>
        /// <param name="token">The refresh token.</param>
        public RefreshTokenModel(long userId, string token, string tokenSalt, DateTime? expiryDate)
        {
            UserId = userId;
            Token = token;
            Platform = PlatformEnum.Web;
            TokenSalt = tokenSalt;
            ExpiryDate = expiryDate;
        }

        /// <summary>
        /// Gets or sets user primary key.
        /// </summary>
        public long UserId { get; set; }
        /// <summary>
        /// Gets or sets refresh token.
        /// </summary>
        public string Token { get; set; }
        public string TokenSalt { get; set; }
        public DateTime? ExpiryDate { get; set; }
        
        public long? DeviceId { get; set; }

        public PlatformEnum Platform { get; set; }

    }
}
