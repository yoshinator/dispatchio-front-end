//JOIN COMPANY CONTROLLER FOR MANAGERS AND EMPLOYEES NOT FOR OWNERS
import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { getCompaniesAction } from '../../actions/companies'
import { updateUserAction } from '../../actions/user'


//functional component that is outside of the JoinCompany component. It is needed to display locations on this same page (component)
const Locations = ({locations}) => {
  if(locations && locations.length > 0){
    return locations.map(location => {
      return <option key={location.id} value={location.id}>Name: {location.nickname}, ID: {location.id}</option>
    })
  }else return ""

}

class JoinCompany extends Component {

  state = {
    companySearch: "",
    foundCompanies: [],
    chosenCompany: {},
    chosenLocation: []
  }

  componentDidMount(){
    this.props.getCompanies()
  }
  
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, this.findCompanies)

  }

  findCompanies = () => {
    this.setState({
      foundCompanies: this.props.companies.filter(company => {
        return company.name.toLowerCase().includes(this.state.companySearch.toLowerCase())
      }) 
    }) 
  }

  displayCompanies = () => {
   return this.state.foundCompanies.map(company => {
     return <option key={company.id} value={company.id}>{company.name}</option>
   })
  }

  selectCompany = (event) => {
    this.setState({
      chosenCompany: this.state.foundCompanies.find(company => company.id === event.target.value)
    })
  }

  selectLocation = (event) => {
    this.setState({
      chosenLocation: [this.state.chosenCompany.locations.find(location => location.id === event.target.value )]
    })
  }


  // This updates the users work location
  updateUserLocation = () => {
    const body ={
      company_id: this.state.chosenCompany.id,
      location_id: this.state.chosenLocation[0].id
    }
    this.props.updateUser(body, this.props.user.id)
  }

  render() {

    if (this.props.user === null || this.props.user.location.id !== 1) {
      return <Redirect to="/"></Redirect>
    } else

      return (
        <div className="eighty">
          <h1>Find Your Company</h1>

            <div className="form-group">
              <label htmlFor="companySearch">Type to start searching for your company</label>
              <input onChange={this.handleChange} className="form-control" name="companySearch" id="companySearch" autoComplete="off"></input>
              <select className="thirty" size="3" onChange={this.selectCompany} defaultValue=""> {this.displayCompanies()}</select>
            </div>
            <h2>Find your main work location</h2>
            <select className="thirty" size="3" onChange={this.selectLocation} defaultValue="">
            <Locations locations={this.state.chosenCompany.locations}></Locations>
          </select>
          {this.state.chosenLocation.length > 0 ? <button onClick={this.updateUserLocation} className="create-new-button" style={{ display: "block" }}>Go</button> : null} 
        </div>
      )
  }
}

const mapsStateToProps = ({loginReducer: {user}, companiesReducer: {companies}}) => {
  return {
    user, companies
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: () => {
      dispatch(getCompaniesAction())
    },
    updateUser: (body, userId) => {
      dispatch(updateUserAction(body, userId))
    }
  };
}

export default connect(mapsStateToProps, mapDispatchToProps)(JoinCompany)
