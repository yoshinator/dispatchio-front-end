import React from 'react'
import { connect } from 'react-redux'
import { getEmployeeJobsAction} from '../../actions/job'
import Jobs from './Jobs'
import YOANHelpers from '../../helpers/helpers'
const timeHelper = new YOANHelpers();

class JobsSearch extends React.Component{
  state = {
    date: "",
  }

  componentDidMount() {
    this.props.getJobs(timeHelper.getDay(), this.props.user.id)
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
    console.log(this.state)
    return (
      <>
        <h2 className="justify-content-center d-flex p-2 ">JOB SEARCH</h2>
        <div className="justify-content-center d-flex p-2 ">
        <form className="justify-content-center d-flex p-2" onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="date" name="date" min={timeHelper.dateTransform(timeHelper.getFormattedDay())}/>
          <button>Submit</button>
        </form>
      </div>
        <Jobs />
      </>
      )
  }
}


const mapStateToProps = (state)=> ({
  user: state.loginReducer.user
})

const mapDispatchToProps = (dispatch)=> {
  return {
    getJobs: (day, id) => {
      dispatch(getEmployeeJobsAction(day, id))
    }
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(JobsSearch);