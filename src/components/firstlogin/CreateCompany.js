import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import {updateUserAction} from '../../actions/user'
import { createCompanyAction } from '../../actions/companies'
import withAuth from '../../hocs/withAuth';

class CreateCompany extends Component {

  state = {
    company: {
      name: "",
      phone: "",
      website: ""
    }, 
    location: {
      city: "",
      nickname: ""
    },
    user: {
      id: ""
    }
  }



  handleChangeCompany = (event) => {
    event.persist()
    console.log(this.props.user)
    this.setState(prevState => ({
      company: {...prevState.company, [event.target.name]: event.target.value}
    }))
    this.setState({user: {id: this.props.user.id}})
    }

  handleChangeLocation = (event) => {
    event.persist()
    this.setState(prevState => ({
      location: { ...prevState.location, [event.target.name]: event.target.value }
    }))
    this.setState({ user: { id: this.props.user.id } })
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createCompany(this.state)
    return <Redirect to="/"></Redirect>
  }
  render() {

    if (this.props.user === null || this.props.user.location.id !== 1) {
      return <Redirect to="/"></Redirect>
    } else {
      return (
        <div className="container">
          <h2>Create New Company</h2>
          <div className="form-container" >
            <div className="form">
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="name">Company Name</label>
                <input onChange={this.handleChangeCompany} type="text" minLength="4" name="name" id="name" value={this.state.company.name} />
              </div>
              <div>
                <label htmlFor="phone">Company Primary Phone</label>
                <input onChange={this.handleChangeCompany} type="tel" pattern="[0-9]{10}" placeholder="2015551111" name="phone" id="phone" value={this.state.company.phone} />
              </div>
              <div>
                <label htmlFor="website"> Company Website</label>
                <input onChange={this.handleChangeCompany} type="website" name="website" minLength="4" id="website" value={this.state.company.website} />
              </div>

              <h2>Main Location</h2>
              <div>
                <label htmlFor="nickname">Location Nickname</label>
                <input onChange={this.handleChangeLocation} type="text" minLength="4" name="nickname" id="nickname" value={this.state.location.nickname} />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input onChange={this.handleChangeLocation} type="text" minLength="4" name="city" id="city" value={this.state.location.city} />
              </div>
              <button className="button" type="submit">Create</button>
            </form>
            </div>
          </div>
        </div>
      )
    }
  }
}


const mapStateToProps = ({ loginReducer: {user}}) => {
  return {
    user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (body, userId) => {
      dispatch(updateUserAction(body, userId))
    }, 
    createCompany: (body) =>{
      dispatch(createCompanyAction(body))
    }
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(CreateCompany))