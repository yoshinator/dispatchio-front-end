import React from 'react'
import { connect } from 'react-redux'
import { getEmployeeJobsAction} from '../../actions/job'
import Jobs from './Jobs'
import YOANHelpers from '../../helpers/helpers'
const timeHelper = new YOANHelpers();


// THIS COMPONENT ONLY DISPLAYS FOR USERS OF TYPE EMPLOYEE
class JobsSearch extends React.Component {
  state = {
    date: ""
  };

  componentDidMount() {
    this.props.getJobs(timeHelper.getDay(), this.props.user.id);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.getJobs(this.state.date, this.props.user.id);
  };

  handleChange = event => {
    const dateArray = event.target.value.split("-");
    const year = dateArray[0];
    const month = parseInt(dateArray[1]) - 1;
    const date = dateArray[2];
    const _entryDate = new Date(year, month, date);
    this.setState({
      [event.target.name]: _entryDate.toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric"
      })
    });
  };

  // THIS COMPONENT ONLY DISPLAYS FOR USERS OF TYPE EMPLOYEE
  render() {
    console.log(this.state);
    return (
      <div className="container">
        <div className="form-container">
          <h2>JOB SEARCH</h2>
          <div className="form">
            <form onSubmit={this.handleSubmit}>
              <input
                onChange={this.handleChange}
                type="date"
                name="date"
                min={timeHelper.dateTransform(timeHelper.getDay())}
              />
              <button className="button" type="submit">Submit</button>
            </form>
          </div>
        <Jobs/>
        </div>
      </div>
    );
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