import React, { Component } from 'react'
import Sidebar from '../Sidebar'
import { connect } from 'react-redux'

class CreateJob extends Component {

  state = {

  }

  render() {
    return <Sidebar>
        <div>IN CREATE JOB</div>
      </Sidebar>;
  }
}
const mapStateToProps =() => {

}

const mapDispatchToProps = () => {

}
export default connect(mapStateToProps, mapDispatchToProps)(CreateJob)