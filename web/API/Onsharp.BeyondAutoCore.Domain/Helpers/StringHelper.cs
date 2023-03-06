using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Onsharp.BeyondAutoCore.Domain.Helpers
{
    public static class StringHelper
    {
        public static string RemoveEmailSpecialChars(this string str)
        {
            string[] chars = new string[] { ",", "+", "/", "!", "#", "$", "%", "^", "&", "*", "'", "\"", ";", "(", ")", ":", "|", "[", "]" };
            for (int i = 0; i < chars.Length; i++)
            {
                if (str.Contains(chars[i]))
                {
                    str = str.Replace(chars[i], " ");
                }
            }
            return str;
        }
    }
}
