export const fetch = async (url, options) => {
  const response = await window.fetch(url, options)
  return await response.json()
}

export const getItems = async (url) => {
  try {
    return await fetch(url)
  } catch (error) {
    console.error('Error:', error)
  }
}

export const getItem = async (url, id, query = '') => {
  try {
    return await fetch(`${url}/${id}${query}`)
  } catch (error) {
    console.error('Error:', error)
  }
}

export const postItem = async (url, item) => {
  try {
    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

export const putItem = async (url, id, item) => {
  try {
    return await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

export const patchItem = async (url, id, item, options = "") => {
  try {
    return await fetch(`${url}/${id}${options}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

export const deleteItem = async (url, id) => {
  try {
    return await fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
  } catch (error) {
    console.error('Error:', error)
  }
}
