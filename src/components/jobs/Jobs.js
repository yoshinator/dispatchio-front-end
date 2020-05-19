//JOBS COMPONENT FOR MANAGERS AND OWNERS NOT FOR EMPLOYEES
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { editJobAction, addWeekAction, createJobFlagAction } from '../../actions/job'
import withRoleManager from '../../hocs/withRoleManager'
import YOANHelpers from '../../helpers/helpers'
import Job from './Job'
import './Jobs.css'

const YOANHelper = new YOANHelpers();


class Jobs extends Component {
state = {
  week: 0,
  currentWeek: YOANHelper.getWeek(0)
}

  componentDidMount(){
    this.props.addWeek(this.state.currentWeek, this.props.user.location.id);
  }


  handleClick = (id) => {
    const job = this.props.jobs.jobs.filter(job => job.id === id)
    this.props.editJob(job[0])
  }

  // Takes a day as a string in the form "1/25/1990" 
  renderJobsJsx = (day) => {
    console.log(this.props.jobs)
    const filteredJobs = this.props.jobs.filter(job => job.schedule_date === day)
    return filteredJobs.map(job => {
      return (<>
        <div className="card-content"  key={job.id}>
          <p className="button" onClick={() => this.handleClick(job.id)} > {job.city} {job.customer.name} </p>
          <a className="button" href={`tel:+1${job.customer.phone}`}><i className="fas fa-mobile-alt"></i> {job.customer.phone}</a>
          </div>
        </>
      )
    })
  }

  forward = () => {
      this.setState({ week: this.state.week + 1, currentWeek: YOANHelper.getWeek(this.state.week + 1 ) }, 
      ()=> this.props.addWeek(this.state.currentWeek, this.props.user.location.id))
  }
  backward = () => {
    this.setState({ week: this.state.week - 1, currentWeek: YOANHelper.getWeek(this.state.week - 1) }, 
    () => this.props.addWeek(this.state.currentWeek, this.props.user.location.id))
  }



  createJobButton =() => {
    this.props.createJobFlag()
  }

  renderMain = () => {
    if (!this.props.jobs.jobForm){
      return this.state.currentWeek.map(day => {
        return <div key={day} className="card">
              <span>{day}{" "}</span>
              {this.renderJobsJsx(day)}
            </div>
      });
    }else {
     return (
       <>
         <Job />
       </>
     )
    }
  }

  render() {

    if(this.props.user.location.id === 1 && this.props.user.user_type === "owner"){
      return <Redirect to="/createcompany"></Redirect>
    } else if (this.props.user.location.id === 1 && this.props.user.user_type === "manager"){
      return <Redirect to="/joincompany"></Redirect>
    }
    if(this.props.jobs.createJobFlag){
      return <Redirect to="/createjob"></Redirect>
    } else {
    return (
        <div className="container">
        <a className="transparent" onClick={this.backward}><i className="fas fa-arrow-alt-circle-left" /></a>
            <h2>Jobs</h2>
        <a className="transparent" onClick={this.forward}><i className="fas fa-arrow-alt-circle-right" /></a>
            <div className="card">{this.renderMain()}</div>
            <button className="button" onClick={this.createJobButton}>Create New Job</button>
          </div>
    )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    jobs: state.jobReducer.jobs,
    user: state.loginReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
      addWeek: (week, location_id) => {
        dispatch(addWeekAction(week, location_id))
      },
      editJob: (job) => {
        dispatch(editJobAction(job))
      },
      createJobFlag: () => {
         dispatch(createJobFlagAction())
      }
    };
}

export default withRoleManager(connect(mapStateToProps, mapDispatchToProps)(Jobs))