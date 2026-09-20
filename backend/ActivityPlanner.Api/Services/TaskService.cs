using ActivityPlanner.Api.DTOs;
using ActivityPlanner.Api.Models;
using ActivityPlanner.Api.Repositories;

namespace ActivityPlanner.Api.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repository;

    public TaskService(ITaskRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<TaskResponseDto>> GetAllAsync(bool sortByPriority = false)
    {
        var tasks = await _repository.GetAllAsync();

        IEnumerable<TaskItem> ordered = sortByPriority
            ? tasks.OrderByDescending(t => t.Priority)
                   .ThenBy(t => t.DueDate ?? DateTime.MaxValue)
            : tasks.OrderBy(t => t.DueDate ?? DateTime.MaxValue);

        return ordered.Select(MapToResponseDto).ToList();
    }

    public async Task<TaskResponseDto?> GetByIdAsync(int id)
    {
        var task = await _repository.GetByIdAsync(id);
        return task is null ? null : MapToResponseDto(task);
    }

    public async Task<TaskResponseDto> CreateAsync(TaskCreateDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            DueDate = dto.DueDate,
            Priority = dto.Priority,
            CategoryId = dto.CategoryId,
            CreatedAt = DateTime.UtcNow
        };

        var created = await _repository.AddAsync(task);
        var full = await _repository.GetByIdAsync(created.Id);
        return MapToResponseDto(full!);
    }

    public async Task<bool> UpdateAsync(int id, TaskUpdateDto dto)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing is null) return false;

        existing.Title = dto.Title;
        existing.Description = dto.Description;
        existing.DueDate = dto.DueDate;
        existing.Priority = dto.Priority;
        existing.IsCompleted = dto.IsCompleted;
        existing.CategoryId = dto.CategoryId;

        return await _repository.UpdateAsync(existing);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }

    private static TaskResponseDto MapToResponseDto(TaskItem task)
    {
        return new TaskResponseDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            DueDate = task.DueDate,
            Priority = task.Priority,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt,
            CategoryId = task.CategoryId,
            CategoryName = task.Category?.Name
        };
    }
}
