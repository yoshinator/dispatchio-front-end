import React from 'react'


import Job from './Job'

 class Jobs extends React.Component {

  render(){
    console.log("JOBS RENDER",this.props.jobs)
    return (
    <div className="accordion" id="accordionExample">
      <Job/>
      </div>
      )
  }
  
}

export default Jobs;