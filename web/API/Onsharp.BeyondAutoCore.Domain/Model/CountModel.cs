using System.ComponentModel.DataAnnotations;

namespace Onsharp.BeyondAutoCore.Domain.Model;

public class CountModel
{

    [Key]
    public int Count { get; set; }

}