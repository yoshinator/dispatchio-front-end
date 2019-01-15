import React from 'react'


import Job from './Job'

 class Jobs extends React.Component {

  render(){
    return (
      <div className="accordion" id="accordionExample">
      <Job/>
      </div>
      )
  }
  
}

export default Jobs;