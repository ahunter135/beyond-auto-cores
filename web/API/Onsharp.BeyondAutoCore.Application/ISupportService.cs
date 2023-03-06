
namespace Onsharp.BeyondAutoCore.Application
{
    public interface ISupportService
    {

        Task<ResponseDto> SendMessage(SendMessageCommand sendMessageCommand);

    }
}
