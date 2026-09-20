import { useState, useEffect } from 'react'
import { PRIORITIES, CATEGORIES } from '../constants'

const emptyTask = {
  title: '',
  description: '',
  dueDate: '',
  priority: 2,
  categoryId: '',
}

export default function TaskForm({ task, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState(emptyTask)

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title ?? '',
        description: task.description ?? '',
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
        priority: task.priority ?? 2,
        categoryId: task.categoryId ?? '',
      })
    } else {
      setForm(emptyTask)
    }
  }, [task])

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return

    onSave({
      title: form.title.trim(),
      description: form.description.trim() || null,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
      priority: Number(form.priority),
      categoryId: form.categoryId === '' ? null : Number(form.categoryId),
      isCompleted: task?.isCompleted ?? false,
    })
  }

  return (
    <div className="panel-overlay" onClick={onCancel}>
      <form className="panel" onClick={e => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2 className="panel-title">{task ? 'Edit task' : 'New task'}</h2>

        <label className="field">
          <span className="field-label">Title</span>
          <input
            type="text"
            value={form.title}
            onChange={e => handleChange('title', e.target.value)}
            autoFocus
            required
          />
        </label>

        <label className="field">
          <span className="field-label">Description</span>
          <textarea
            value={form.description}
            onChange={e => handleChange('description', e.target.value)}
            rows={3}
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span className="field-label">Due date</span>
            <input
              type="date"
              value={form.dueDate}
              onChange={e => handleChange('dueDate', e.target.value)}
            />
          </label>

          <label className="field">
            <span className="field-label">Priority</span>
            <select
              value={form.priority}
              onChange={e => handleChange('priority', e.target.value)}
            >
              {PRIORITIES.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="field">
          <span className="field-label">Category</span>
          <select
            value={form.categoryId}
            onChange={e => handleChange('categoryId', e.target.value)}
          >
            {CATEGORIES.map(c => (
              <option key={c.label} value={c.value}>{c.label}</option>
            ))}
          </select>
        </label>

        <div className="panel-actions">
          {task && (
            <button type="button" className="btn-text-danger" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          )}
          <div className="panel-actions-right">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {task ? 'Save changes' : 'Add task'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
