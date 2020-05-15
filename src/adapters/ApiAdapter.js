
class JSONAPIAdapter {
  constructor(endpoint) {
    this.endpoint = `https://dispatch-io.herokuapp.com/${endpoint}`
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  }
  getAll() {
    return fetch(this.endpoint,{
      headers: this.headers
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
      headers: this.headers,
      body: JSON.stringify(body)// { key: 'value', key: { key: 'value', key: 'value'} }
    })
  }

  deleteItem(id) {
    return fetch(`${this.endpoint}/${id}`, {
      method: 'DELETE',
      header: this.headers
    }).then(response => response.json())
  }

  updateItem(body, id) {
    return fetch(`${this.endpoint}/${id}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(body)
    })
  }
}

export default JSONAPIAdapter;

