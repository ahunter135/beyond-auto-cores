
namespace Onsharp.BeyondAutoCore.Infrastructure.Service
{
    public class SupportService : BaseService, ISupportService
    {
        public SupportService(IHttpContextAccessor httpContextAccessor)
           : base(httpContextAccessor)
        {
           
        }

        public async Task<ResponseDto> SendMessage(SendMessageCommand sendMessageCommand)
        {

            if (string.IsNullOrWhiteSpace(sendMessageCommand.Name))
                return new ResponseDto() { Success = 0, Message = "Name is required" };
            else if (string.IsNullOrWhiteSpace(sendMessageCommand.Email))
                return new ResponseDto() { Success = 0, Message = "Email is required" };
            else if (string.IsNullOrWhiteSpace(sendMessageCommand.Message))
                return new ResponseDto() { Success = 0, Message = "Message is required" };

            var smtpSetting = new SMTPConfig();
            var subject = $"Message from {sendMessageCommand.Name}";

            await EmailHelper.SendEmail(smtpSetting.SupportEmail, sendMessageCommand.Email, subject, sendMessageCommand.Message, isBodyHtml: true, fromName: sendMessageCommand.Name);

            return new ResponseDto() { Success = 1, Message = "Message successfully sent." };
        }

    }
}
