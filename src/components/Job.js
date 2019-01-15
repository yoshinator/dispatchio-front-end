import React, { Component } from 'react'
import { connect } from 'react-redux'

class Job extends Component {
  
  render() {
    console.log("HSDLKEJRLKJSDF ", this.props.job)
    return (
      <div className="card inner-card">
        <div className="card-body">
          <form onSubmit={this.handleSubmit} autoComplete="one">
            <div className="form-group">
              <label htmlFor="jobStatusSelect">Change Status</label>
              <select onChange={this.handleChange} className="form-control" name="status" id={`jobStatusSelect${this.props.job.id}`}>
                <option>IR in route</option>
                <option>IP in progress</option>
                <option>DN done</option>
                <option>FU follow up</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor={`add-to-description${this.props.job.id}`}>Add to description</label>
              <textarea onChange={this.handleChange} name="description" className="form-control" id={`add-to-description${this.props.job.id}`} rows="2" />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps =() =>{

}

const mapStateToProps = (state) => ({
job: state.jobReducer
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Job)


