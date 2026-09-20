using ActivityPlanner.Api.DTOs;

namespace ActivityPlanner.Api.Services;

public interface ITaskService
{
    Task<List<TaskResponseDto>> GetAllAsync(bool sortByPriority = false);
    Task<TaskResponseDto?> GetByIdAsync(int id);
    Task<TaskResponseDto> CreateAsync(TaskCreateDto dto);
    Task<bool> UpdateAsync(int id, TaskUpdateDto dto);
    Task<bool> DeleteAsync(int id);
}
