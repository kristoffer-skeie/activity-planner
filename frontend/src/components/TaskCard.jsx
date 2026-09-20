import { PRIORITY_LABEL } from '../constants'

function formatDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  const priorityClass = `priority-${PRIORITY_LABEL[task.priority]?.toLowerCase()}`

  return (
    <div className={`task-row ${task.isCompleted ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggleComplete(task)}
        className="task-checkbox"
        aria-label={`Mark "${task.title}" as complete`}
      />

      <div className="task-main" onClick={() => onEdit(task)}>
        <span className="task-title">{task.title}</span>
        {task.description && <span className="task-description">{task.description}</span>}
      </div>

      <div className="task-meta">
        {task.categoryName && <span className="task-category">{task.categoryName}</span>}
        {task.dueDate && <span className="task-due">{formatDate(task.dueDate)}</span>}
        <span className={`task-priority ${priorityClass}`}>{PRIORITY_LABEL[task.priority]}</span>
      </div>

      <button
        className="task-delete"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete "${task.title}"`}
      >
        ×
      </button>
    </div>
  )
}
