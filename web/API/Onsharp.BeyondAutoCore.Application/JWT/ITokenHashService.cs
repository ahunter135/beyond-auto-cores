using Netjection;

namespace Onsharp.BeyondAutoCore.Application.JWT
{
    [InjectAsScoped]
    public interface ITokenHashService
    {
        //string CreateHash(string password);
        bool ValidatePassword(string password, string correctHash);
        byte[] GetSecureSalt();
        string HashUsingPbkdf2(string password, byte[] salt);

    }
}
