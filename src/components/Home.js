import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router'
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    if(!this.props.user.user){
      return <Redirect to="/login" />
    }
    if(this.props.user.user.user_type === "employee" ){
      return <div>
              <h1>Employee Panel</h1>
             </div>;

    }
    if(this.props.user.user.user_type === "manager"){
      return <div> 
              <h1>Manager Panel</h1>
            </div>
    }
    if(this.props.user.user.user_type === "owner"){
      return <div>
                <h1>Owner Panel</h1>
            </div>
    }
    else{
      return <div>
              <h1>Other</h1>
      </div>
    }
  }
}

const mapStateToProps = ( loginReducer ) => ({
  user: loginReducer.loginReducer
})



function mapDispatchToProps(dispatch) {
  return {
    //
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));