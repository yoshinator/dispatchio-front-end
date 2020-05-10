import React, { Component } from 'react'
import { connect } from "react-redux";

import JobUpdater from "./JobUpdater"


class Job extends Component {

  jsxBuilder = () => {
    if (this.props.jobs){
      
    return this.props.jobs.map(job => {
      return <div key={job.id}>
          <div id={`heading${job.id}`}>
            <h2 >
              <button  type="button" data-toggle="collapse" data-target={`#collapse${job.id}`} aria-expanded="true" aria-controls={`collapse${job.id}`}>
                {job.status} {job.customer.name} {job.customer.phone} {job.city}
              </button>
            </h2>
          </div>

     
          <div id={`collapse${job.id}`} aria-labelledby={`heading${job.id}`} data-parent="#accordionExample">
            <div >
            <span>
              <a target="_blank" rel="noopener noreferrer" href={`http://maps.google.com/maps?q=${job.street_1},${job.street_2},+${job.city},+${job.state}+${job.zip}`}>
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
        < div >
          <div id="headingOne">
            <h2 >
              <button  type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
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


const mapStateToProps = ({ jobReducer }) => ({
  jobs: jobReducer.jobs
})

export default connect(mapStateToProps)(Job);