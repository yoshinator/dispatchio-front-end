//JOIN COMPANY CONTROLLER FOR MANAGERS AND EMPLOYEES NOT FOR OWNERS
import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import { getCompaniesAction } from '../../actions/companies'


class JoinCompany extends Component {

  state = {
    companySearch: "",
    foundCompanies: [],
    chosenCompany: {},
    foundLocations: [],
    chosenLocation: {}
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
      chosenCompany: this.state.foundCompanies.find(company => company.id == event.target.value)
    }, this.showLocation)
    
  }

  showLocations = () => {
    
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
              <select className="thirty" size="4" onChange={this.selectCompany} defaultValue=""> {this.displayCompanies()}</select>
            </div>

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
    }
  };
}

export default connect(mapsStateToProps, mapDispatchToProps)(JoinCompany)
