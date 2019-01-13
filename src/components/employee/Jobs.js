import React from 'react'
import { connect } from 'react-redux'

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

const mapStateToProps = ({jobsReducer}) => ({
  jobs: jobsReducer.jobs[0]
})

export default connect(mapStateToProps)(Jobs);