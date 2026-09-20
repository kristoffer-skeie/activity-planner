using ActivityPlanner.Api.Models;

namespace ActivityPlanner.Api.DTOs;

public class TaskUpdateDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime? DueDate { get; set; }
    public Priority Priority { get; set; } = Priority.Medium;
    public bool IsCompleted { get; set; }
    public int? CategoryId { get; set; }
}
