using System.ComponentModel;

namespace Onsharp.BeyondAutoCore.Domain.Enums;

public enum PhotoGradeStatusEnum
{
    [Description("Pending")]
    InReview = 0,

    [Description("Approved")]
    Approved = 1,

    [Description("Rejected")]
    Rejected = 2
}
