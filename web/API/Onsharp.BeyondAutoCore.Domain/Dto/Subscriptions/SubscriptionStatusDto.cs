using System.ComponentModel.DataAnnotations;

namespace Onsharp.BeyondAutoCore.Domain.Dto
{
    public class SubscriptionStatusDto
    {
        [Key]
        public bool SubscriptionIsCancel { get; set; }
    }
}