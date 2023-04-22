using System.Net;
using System.Net.Mail;

namespace Onsharp.BeyondAutoCore.Infrastructure.Core.Helpers
{
    public static class EmailHelper
    {
        public static async Task<bool> SendEmail(
            string toEmail, string fromEmail, string subject, string body, string cc = "",
            bool isBodyHtml = false, MemoryStream fileAttachment = null, string overrideFromEmail = null,
            string attachmentFileName = "", string fromName= "Beyond Auto Core")
        {
            MailMessage message = new MailMessage();
            
            message.From = new MailAddress(fromEmail, fromName);
            message.To.Add(new MailAddress(toEmail));
            message.Subject = subject;
            message.IsBodyHtml = isBodyHtml;
            message.Body = body;

            if (!string.IsNullOrWhiteSpace(attachmentFileName))
            {
                System.Net.Mail.Attachment attachment;
                attachment = new System.Net.Mail.Attachment(attachmentFileName);
                message.Attachments.Add(attachment);
            }

            var smtp = new SmtpClient();
            var smtpSetting = new SMTPConfig();

            smtp.Credentials = new NetworkCredential(smtpSetting.Username, smtpSetting.Password);
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;
            smtp.Port = smtpSetting.OutgoingEmailPort;
            smtp.Host = smtpSetting.Host;
                                        Console.WriteLine("INSIDE EMAIL!!!!!!");

            smtp.Send(message);

            return true;
        }
    }
}
