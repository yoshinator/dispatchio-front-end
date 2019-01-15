import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import { getJobsAction } from '../actions/job'
import { addWeekAction } from '../actions/weekview'


class Jobs extends Component {

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


  // Takes a day as a string in the form "1/25/1990" 
  renderJobsJsx = (day) => {
    const filteredJobs = this.props.jobs.jobs.filter(job => job.schedule_date === day)
    return filteredJobs.map(job => {
      return (
        
        <a key={job.id} href="#" class="list-group-item">
            {job.city}  {job.customer.name} {job.customer.phone}
          </a>

      )
    })
  }



  render() {
    console.log(this.props.jobs.jobs)
    //TODO refactor to DRY this up when you get a chance
    return <Sidebar>
        <main className="col">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <div class="list-group">
                <span class="list-group-item list-group-item-action active">{this.getWeek()[0]} </span>
                  {this.renderJobsJsx(this.getWeek()[0])}
                </div>
              </div>

              <div className="col-sm">
                <div class="list-group">
                <span class="list-group-item list-group-item-action active">{this.getWeek()[1]} </span>
                  {this.renderJobsJsx(this.getWeek()[1])}
                </div>
              </div>

              <div className="col-sm">
                <div class="list-group">
                <span class="list-group-item list-group-item-action active">{this.getWeek()[2]} </span>
                  {this.renderJobsJsx(this.getWeek()[2])}
                </div>
              </div>

              <div className="col-sm">
                <div class="list-group">
                <span class="list-group-item list-group-item-action active">{this.getWeek()[3]} </span>
                  {this.renderJobsJsx(this.getWeek()[3])}
                </div>
              </div>
              <div className="col-sm">
                <div class="list-group">
                <span class="list-group-item list-group-item-action active">{this.getWeek()[4]} </span>
                  {this.renderJobsJsx(this.getWeek()[4])}
                </div>
              </div>
              <div className="col-sm">
                <div class="list-group">
                <span class="list-group-item list-group-item-action active">{this.getWeek()[5]} </span>
                  {this.renderJobsJsx(this.getWeek()[5])}
                </div>
              </div>

              <div className="col-sm">
              <div class="list-group">
                <span class="list-group-item list-group-item-action active">{this.getWeek()[6]} </span>
                {this.renderJobsJsx(this.getWeek()[6])}
              </div>
              </div>
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
      }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)