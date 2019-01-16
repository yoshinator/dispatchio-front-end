import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import Job from './Job'
import { getJobsAction } from '../actions/job'
import { setJobAction } from '../actions/job'
import { addWeekAction } from '../actions/weekview'
import YOANHelpers from '../helpers/helpers'
const YOANHelper = new YOANHelpers();


class Jobs extends Component {
  state = {
    weekView: true,
    createJob: false,
  }


  componentDidMount(){
    console.log("IN COMPONENT DID MOUNT",this.props.user.location.id)
    this.props.addWeek(YOANHelper.getWeek(), this.props.user.location.id);
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
        <a key={job.id} href="#" onClick={() => this.handleClick(job.id)} className="list-group-item">
            {job.city}  {job.customer.name} {job.customer.phone}
          </a>

      )
    })
  }

  renderMain = () => {
    if (this.state.weekView){
      return YOANHelper.getWeek().map(day => {
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
         <h2 onClick={() => this.setState({ weekView: !this.state.weekView})}>Back</h2>
         <Job changeView={() => this.setState({ weekView: !this.state.weekView })}/>
       </>
     )
    }

  }


  createJobButton= () => {
    //change state and render form
    this.setState({
      createJob: true
    })
  }



  render() {
    return <>
    <button onClick={this.createJobButton} className="mx-auto" style={{display: "block"}} >Create New Job</button>
    <Sidebar>  
        <main className="col">
          <div className="container">
            <div className="row">
              {this.renderMain()}
            </div>
          </div>
        </main>
      </Sidebar>
      </>;
  }
}


const mapStateToProps = (state) => ({
  jobs: state.weekViewReducer,
  user: state.loginReducer.user
})

const mapDispatchToProps = (dispatch) => {
  return { getJobs: (day, location_id) => {
        dispatch(getJobsAction(day, location_id));
      },
      addWeek: (week, location_id) => {
        dispatch(addWeekAction(week, location_id))
      },
      setJob: (job) =>
        dispatch(setJobAction(job))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)