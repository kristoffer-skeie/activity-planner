namespace ActivityPlanner.Api.Models;

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;

    // Navigation property
    public List<TaskItem> Tasks { get; set; } = new();
}
