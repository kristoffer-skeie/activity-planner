import { useState, useEffect, useMemo, useCallback } from 'react'
import Sidebar from './components/Sidebar'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { taskApi } from './api/taskApi'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [sortByPriority, setSortByPriority] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const loadTasks = useCallback(() => {
    setLoading(true)
    taskApi.getAll(sortByPriority)
      .then(data => {
        setTasks(data)
        setError(null)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [sortByPriority])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const visibleTasks = useMemo(() => {
    if (activeCategory === null) return tasks
    return tasks.filter(t => t.categoryId === activeCategory)
  }, [tasks, activeCategory])

  function openNewTaskForm() {
    setEditingTask(null)
    setShowForm(true)
  }

  function openEditForm(task) {
    setEditingTask(task)
    setShowForm(true)
  }

  function closeForm() {
    setShowForm(false)
    setEditingTask(null)
  }

  async function handleSave(taskData) {
    try {
      if (editingTask) {
        await taskApi.update(editingTask.id, taskData)
      } else {
        await taskApi.create(taskData)
      }
      closeForm()
      loadTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await taskApi.remove(id)
      closeForm()
      loadTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleToggleComplete(task) {
    try {
      await taskApi.update(task.id, {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        categoryId: task.categoryId,
        isCompleted: !task.isCompleted,
      })
      loadTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <Sidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        sortByPriority={sortByPriority}
        onSortToggle={setSortByPriority}
        onNewTask={openNewTaskForm}
      />

      <main className="main">
        {error && (
          <div className="error-banner">
            Couldn't reach the server. Is the backend running on port 5000?
          </div>
        )}

        {loading ? (
          <p className="loading-text">Loading tasks…</p>
        ) : (
          <TaskList
            tasks={visibleTasks}
            onToggleComplete={handleToggleComplete}
            onEdit={openEditForm}
            onDelete={handleDelete}
          />
        )}
      </main>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={handleSave}
          onCancel={closeForm}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
