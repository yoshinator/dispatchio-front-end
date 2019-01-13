import React from 'react'
import { connect } from 'react-redux'
import { getJobsAction} from '../../actions/job'
import Jobs from './Jobs'


class JobsSearch extends React.Component{
  state = {
    date: {}
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.date)
    console.log(this.props.user.id, this.props.getJobs)
    this.props.getJobs(this.state.date, this.props.user.id)
  }

  handleChange = (event) => {
    const dateArray = event.target.value.split("-");
    const year = dateArray[0];
    const month = parseInt(dateArray[1]) -1;
    const date = dateArray[2];
    const _entryDate = new Date(year, month, date);
    this.setState({
      [event.target.name]: _entryDate.toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric"
      })
    })
  }


  render() {
    return (
      <div>
        JOB SEARCH
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="date" name="date"/>
          <button>Submit</button>
        </form>
        <Jobs />
      </div>
    )
  }
}


const mapStateToProps = (state)=> ({
  user: state.loginReducer.user
})

const mapDispatchToProps = (dispatch)=> {
  return {
    getJobs: (day, id) => {
      dispatch(getJobsAction(day, id))
    }
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(JobsSearch);