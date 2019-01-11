import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

import Navbar from './components/navigation/Navbar'

class App extends Component {
  render() {
    return (
      <Navbar />
    )
  }
}

export default withRouter(App);
