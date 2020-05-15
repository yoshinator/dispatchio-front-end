import React from 'react'
import { connect } from "react-redux";

import JobUpdater from "./JobUpdater"


const Job = (props) =>  {

    if (props.jobs){
    return props.jobs.map(job => {
      return (
        <div className="card" key={job.id}>
          <div id={`heading${job.id}`}>
            <h3 >
              {job.status} {job.customer.name}</h3> 
              <a className="button" href={`tel:+1${job.customer.phone}`}><i className="fas fa-mobile-alt"></i> {job.customer.phone}</a>    
              <h3>{job.city}</h3>
          </div>

          <div className="card-content">
            <p>
              <a target="_blank" rel="noopener noreferrer" href={`http://maps.google.com/maps?q=${job.street_1},${job.street_2},+${job.city},+${job.state}+${job.zip}`}>
                {`${job.street_1} ${job.street_2}, ${job.city}, ${job.state} ${job.zip} `}
              </a>
            </p>
            <span>Description: {job.description}</span>
              <JobUpdater job={job} />
            </div>
        </div>
      );
    })
    }
    else {
      return (
        < div >
          <div id="headingOne">
            <h2 >
              <button className="button">
                No Jobs
              </button>
            </h2>
          </div>
          </div>
      )
    }
  }


const mapStateToProps = ({ jobReducer }) => ({
  jobs: jobReducer.jobs
})

export default connect(mapStateToProps)(Job);