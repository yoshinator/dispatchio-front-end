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
  }
  render() {

    if (this.props.user === null || this.props.user.location.id !== 1) {
      return <Redirect to="/"></Redirect>
    } else {
      return (
        <div className="card inner-card">
          <h2 className="company-title">
            Create New Company
                </h2>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Company Name</label>
                <input onChange={this.handleChangeCompany} type="text" minLength="4" className="form-control" name="name" id="name" value={this.state.company.name} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Company Primary Phone</label>
                <input onChange={this.handleChangeCompany} type="tel" pattern="[0-9]{10}" placeholder="2015551111" className="form-control" name="phone" id="phone" value={this.state.company.phone} />
              </div>
              <div className="form-group">
                <label htmlFor="website"> Company Website</label>
                <input onChange={this.handleChangeCompany} type="website" className="form-control" name="website" minLength="4" id="website" value={this.state.company.website} />
              </div>

              <h2>Main Location</h2>
              <div className="form-group">
                <label htmlFor="nickname">Location Nickname</label>
                <input onChange={this.handleChangeLocation} type="text" minLength="4" className="form-control" name="nickname" id="nickname" value={this.state.location.nickname} />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input onChange={this.handleChangeLocation} type="text" minLength="4" className="form-control" name="city" id="city" value={this.state.location.city} />
              </div>
              <button type="submit" className="btn btn-primary">Create</button>
            </form>
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