using System.Text.Json.Serialization;
using BackendRestAPI.Domain.Models;
using BackendRestAPI.Models;

namespace BackendRestAPI.Resources;

public sealed class AssignmentResource
{
    public int AssignmentPk { get; set; }

    public DateOnly CreationDate { get; set; }

    public decimal ReachablePoints { get; set; }
    
    public int SubjectFk { get; set; }
    
    public string AssignmentType { get; set; }
    
    public string Semester { get; set; }
    
    [JsonIgnore]
    public Subject? SubjectFkNavigation { get; set; }
}