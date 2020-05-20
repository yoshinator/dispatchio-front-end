
class JSONAPIAdapter {
  constructor(endpoint, token) {
    this.endpoint = `https://dispatch-io.herokuapp.com/${endpoint}`
  }
  getAll() {
    return fetch(this.endpoint,{
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
    },
    })
      .then(response => response.json())
  }
  
  getSingle(id) {
    return fetch(`${this.endpoint}/${id}`)
      .then(response => response.json())
  }
  // { key: 'value', key: { key: 'value', key: 'value'} }
  createItem(body) {
    return fetch(this.endpoint, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
    },
      body: JSON.stringify(body)// { key: 'value', key: { key: 'value', key: 'value'} }
    })
  }

  deleteItem(id) {
    return fetch(`${this.endpoint}/${id}`, {
      method: 'DELETE',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
    },
    }).then(response => response.json())
  }

  updateItem(body, id) {
    return fetch(`${this.endpoint}/${id}`, {
      method: 'PATCH',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('jwt')}`
    },
      body: JSON.stringify(body)
    })
  }
}

export default JSONAPIAdapter;

