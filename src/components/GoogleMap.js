import React, { Component } from 'react'
import { connect } from 'react-redux'
import withAuth from '../hocs/withAuth'
import withRoleManager from '../hocs/withRoleManager'
import Sidebar from '../components/Sidebar'

class GoogleMap extends Component {
  componentWillMount(){
    const API_KEY = process.env.GOOGLEMAPAPIKEY; const script = document.createElement('script'); script.src =`https://maps.googleapis.com/maps/api/js?key=${API_KEY}`; document.head.append(script);
  }
  render() {
    const API_KEY = process.env.GOOGLEMAPAPIKEY; const script = document.createElement('script'); script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`; document.head.append(script);
    console.log(API_KEY)
    debugger;
    return (
      <Sidebar>
        <div id="map">
          Hello
        </div>
      </Sidebar>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return null
}

const mapStateToProps = ({loginReducer: {user}}) => {
  return {
    user
  }
}

export default withRoleManager(withAuth(connect(mapStateToProps, mapDispatchToProps)(GoogleMap)))