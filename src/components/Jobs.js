import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import Job from './Job'
import { getJobsAction } from '../actions/job'
import { setJobAction } from '../actions/job'
import { addWeekAction } from '../actions/weekview'


class Jobs extends Component {
  state = {
    weekView: true
  }

  // Returns an array of weeks. 
  //TODO SEND UP A WEEK START DATE AND RENDER THAT WEEK INSTEAD OF GETTING CURRENT DAY AND WEEK
  getWeek = () => {
    
    const week = []
    for (let i = 0;  i < 7; i++){
    const day = new Date()
     const a = new Date(day.setDate(day.getDate() + i))
     week.push(a.toLocaleString(
       "en-US",
       {
         month: "numeric",
         day: "numeric",
         year: "numeric"
       }
     ))
    }
    return week
  }

  componentDidMount(){
    console.log("IN COMPONENT DID MOUNT",this.props)
    this.props.addWeek(this.getWeek())
  }

  handleClick =(id)=> {
    const job = this.props.jobs.jobs.filter(job => job.id === id)
    this.props.setJob(job[0])
    this.setState({
      weekView: !this.state.weekView
    })
  }

  // Takes a day as a string in the form "1/25/1990" 
  renderJobsJsx = (day) => {
    const filteredJobs = this.props.jobs.jobs.filter(job => job.schedule_date === day)
    return filteredJobs.map(job => {
      return (
        <a key={job.id} href="#" onClick={() => this.handleClick(job.id)} class="list-group-item">
            {job.city}  {job.customer.name} {job.customer.phone}
          </a>

      )
    })
  }

  renderMain = () => {
    if (this.state.weekView){
      return this.getWeek().map(day => {
        return (
          <div className="col-sm">
            <div class="list-group">
              <span class="list-group-item list-group-item-action active">{day} </span>
              {this.renderJobsJsx(day)}
            </div>
          </div>
        )
      })
    }else {
     return <Job />
    }

  }



  render() {
    console.log(this.props.jobs.jobs)
    //TODO refactor to DRY this up when you get a chance
    return <Sidebar>
        <main className="col">
          <div className="container">
            <div className="row">
              {this.renderMain()}
            </div>
          </div>
        </main>
      </Sidebar>;
  }
}


const mapStateToProps = (state) => ({
  jobs: state.weekViewReducer
})

const mapDispatchToProps = (dispatch) => {
  return { getJobs: (day) => {
        dispatch(getJobsAction(day));
      },
      addWeek: (week) => {
        dispatch(addWeekAction(week))
      },
      setJob: (job) =>
        dispatch(setJobAction(job))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)