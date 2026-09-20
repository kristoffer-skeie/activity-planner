export const PRIORITIES = [
  { value: 1, label: 'Low' },
  { value: 2, label: 'Medium' },
  { value: 3, label: 'High' },
  { value: 4, label: 'Critical' },
]

export const PRIORITY_LABEL = Object.fromEntries(PRIORITIES.map(p => [p.value, p.label]))

// Matches the categories seeded in AppDbContext (Chores, School, Personal)
export const CATEGORIES = [
  { value: '', label: 'No category' },
  { value: 1, label: 'Chores' },
  { value: 2, label: 'School' },
  { value: 3, label: 'Personal' },
]
