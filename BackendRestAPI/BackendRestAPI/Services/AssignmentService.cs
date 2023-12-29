using BackendRestAPI.Domain.Models;
using BackendRestAPI.Domain.Repositories;
using BackendRestAPI.Domain.Services;
using BackendRestAPI.Models;
using BackendRestAPI.Resources;

namespace BackendRestAPI.Services;

public class AssignmentService : IAssignmentService
{
    private readonly IAssignmentRepository _assignmentRepository;

    public AssignmentService(IAssignmentRepository assignmentRepository)
    {
        this._assignmentRepository = assignmentRepository;
    }

    public async Task<IEnumerable<Assignment>> ListAsync()
    {
        return await _assignmentRepository.ListAsync();
    }
    
    public async Task<IEnumerable<Assignment>> ListBySubjectIdAsync(int subjectId)
    {
        return await _assignmentRepository.ListBySubjectIdAsync(subjectId);
    }
}