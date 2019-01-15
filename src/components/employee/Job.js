import React, { Component } from 'react'
import { connect } from "react-redux";

import JobUpdater from "./JobUpdater"


class Job extends Component {

  jsxBuilder = () => {
    console.log("ERROR", this.props.jobs)
    if (this.props.jobs){
      
    return this.props.jobs.map(job => {
      return <div className="card" key={job.id}>
          <div className="card-header" id={`heading${job.id}`}>
            <h2 className="mb-0">
              <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#collapse${job.id}`} aria-expanded="true" aria-controls={`collapse${job.id}`}>
                {job.status} {job.customer.name} {job.customer.phone} {job.city}
              </button>
            </h2>
          </div>

     
          <div id={`collapse${job.id}`} className="collapse  hide" aria-labelledby={`heading${job.id}`} data-parent="#accordionExample">
            <div className="card-body">
            <span>
              <i className="fas fa-globe-americas"> </i><a target="_blank" rel="noopener noreferrer" href={`http://maps.google.com/maps?q=${job.street_1},${job.street_2},+${job.city},+${job.state}+${job.zip}`}>
                {`${job.street_1} ${job.street_2}, ${job.city}, ${job.state} ${job.zip} `}
              </a>{" "}
            </span>
            <span>Description: {job.description}</span>
              <JobUpdater job={job} />
            </div>
          </div>
        </div>;
    })
    }
    else {
      return (
        < div className="card" >
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">
              <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                No Jobs
              </button>
            </h2>
          </div>
          </div>
      )
    }
  }

  render() {
  return this.jsxBuilder()
  }
}


const mapStateToProps = ({ jobsReducer }) => ({
  jobs: jobsReducer.jobs
})

export default connect(mapStateToProps)(Job);