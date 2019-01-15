import React from 'react'


import Job from './Job'

 class Jobs extends React.Component {

  render(){
    return (
    <div className="accordion" id="accordionJobs">
      <Job/>
      </div>
      )
  }
  
}

export default Jobs;