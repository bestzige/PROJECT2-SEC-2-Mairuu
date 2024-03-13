export const fetch = async (url, options) => {
  const response = await window.fetch(url, options)
  return await response.json()
}

export const getItems = async (url) => {
  return await fetch(url)
}

export const getItem = async (url, id) => {
  return await fetch(`${url}/${id}`)
}

export const postItem = async (url, item) => {
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
}

export const putItem = async (url, id, item) => {
  return await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
}

export const deleteItem = async (url, id) => {
  return await fetch(`${url}/${id}`, {
    method: 'DELETE'
  })
}
