const BASE_URL = 'http://localhost:5000/api/tasks'

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `Request failed with status ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export const taskApi = {
  getAll(sortByPriority = false) {
    return fetch(`${BASE_URL}?sortByPriority=${sortByPriority}`).then(handleResponse)
  },

  create(task) {
    return fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    }).then(handleResponse)
  },

  update(id, task) {
    return fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    }).then(handleResponse)
  },

  remove(id) {
    return fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }).then(handleResponse)
  },
}
