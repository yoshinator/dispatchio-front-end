import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import Job from './Job'
import { editJobAction } from '../actions/job'
import { addWeekAction } from '../actions/job'
import YOANHelpers from '../helpers/helpers'
const YOANHelper = new YOANHelpers();


class Jobs extends Component {
  state = {
    weekView: true
  }

  componentDidMount(){
    this.props.addWeek(YOANHelper.getWeek(), this.props.user.location.id);
  }


  handleClick = (id) => {
    const job = this.props.jobs.jobs.filter(job => job.id === id)
    this.props.editJob(job[0])
    this.setState({
      weekView: !this.state.weekView
    })
  }

  // Takes a day as a string in the form "1/25/1990" 
  renderJobsJsx = (day) => {
    const filteredJobs = this.props.jobs.jobs.filter(job => job.schedule_date === day)
    return filteredJobs.map(job => {
      return (
        <p key={job.id} onClick={() => this.handleClick(job.id)} className="list-group-item">
            {job.city}  {job.customer.name} {job.customer.phone}
          </p>

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
      editJob: (job) =>
        dispatch(editJobAction(job))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs)