import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { editJobAction, addWeekAction, createJobAction } from '../../actions/job'
import withRoleManager from '../../hocs/withRoleManager'
import YOANHelpers from '../../helpers/helpers'
import Sidebar from '../Sidebar'
import Job from './Job'
import './job.css'

const YOANHelper = new YOANHelpers();


class Jobs extends Component {
state = {
  currentWeek: YOANHelper.getWeek()
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
    const filteredJobs = this.props.jobs.jobs.filter(job => job.schedule_date === day)
    return filteredJobs.map(job => {
      return (
        <small><p key={job.id} onClick={() => this.handleClick(job.id)} className="list-group-item">
            {job.city}  {job.customer.name} <a href={`tel:+1${job.customer.phone}`}>{job.customer.phone}</a>
          </p></small>

      )
    })
  }

  createJobButton =() => {
    this.props.createJob()
  }

  renderMain = () => {
    if (!this.props.jobs.jobForm){
      return this.state.currentWeek.map(day => {
        return <div key={day} className="col-sm">
            <div className="list-group">
              <span className="list-group-item list-group-item-action active">
                {day}{" "}
              </span>
              {this.renderJobsJsx(day)}
            </div>
          </div>;
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
    if(this.props.jobs.createJob){
      return <Redirect to="/createjob"></Redirect>
    } else {
    return <>
        <Sidebar>
          <main className="col">
            <div className="container">
             
              <button onClick={this.createJobButton} className="mx-auto create-new-job" style={{ display: "block" }}>
                Create New Job{" "}
              </button>
              <div className="row">{this.renderMain()}</div>
            </div>
          </main>
        </Sidebar>
      </>;
    }
  }
}


const mapStateToProps = (state) => {
  return {
    jobs: state.jobReducer,
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
      createJob: () => {
         dispatch(createJobAction())
      }
    };
}

export default withRoleManager(connect(mapStateToProps, mapDispatchToProps)(Jobs))