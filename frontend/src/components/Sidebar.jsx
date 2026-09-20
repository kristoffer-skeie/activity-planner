import { CATEGORIES } from '../constants'

export default function Sidebar({ activeCategory, onCategoryChange, sortByPriority, onSortToggle, onNewTask }) {
  return (
    <aside className="sidebar">
      <h1 className="sidebar-title">Planner</h1>

      <button className="btn-primary" onClick={onNewTask}>
        + New task
      </button>

      <nav className="sidebar-nav">
        <p className="sidebar-label">Filter</p>
        <button
          className={`sidebar-link ${activeCategory === null ? 'active' : ''}`}
          onClick={() => onCategoryChange(null)}
        >
          All tasks
        </button>
        {CATEGORIES.filter(c => c.value !== '').map(cat => (
          <button
            key={cat.value}
            className={`sidebar-link ${activeCategory === cat.value ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-sort">
        <label className="sort-toggle">
          <input
            type="checkbox"
            checked={sortByPriority}
            onChange={e => onSortToggle(e.target.checked)}
          />
          Sort by importance
        </label>
      </div>
    </aside>
  )
}
