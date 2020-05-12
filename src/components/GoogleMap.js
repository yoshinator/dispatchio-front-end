import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import withAuth from '../hocs/withAuth'
import withRoleManager from '../hocs/withRoleManager'

const mapStyles = {
  width: '100%',
  height: '100%',
  float: 'right'
};

const KEY = process.env.REACT_APP_GOOGLEMAPKEY

class GoogleMap extends Component {

  state = {
    showingInfoWindow: false,  //Hides or the shows the infoWindow
    activeMarker: {},          //Shows the active marker upon click
    selectedPlace: {}          //Shows the infoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  
  render() {
    if (this.props.team_member.lat && this.props.team_member.lon){
      return (
        <div className="my-map">
          <Map google={this.props.google} zoom={14} style={mapStyles} initialCenter={{ lat: this.props.team_member.lat, lng: this.props.team_member.lon }}>     
        <Marker
              onClick={this.onMarkerClick}
              name={this.props.team_member.f_name}
              lastUpdated={this.props.team_member.upat}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
                <h5>Location last updated at</h5>
                <h5>{this.state.selectedPlace.lastUpdated}</h5>
              </div>
            </InfoWindow>
            </Map>
        </div>
      )
    }else {
      return (
          <div className="my-map">
            No Recent Locations for this user
          </div>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {take: "that"}
}

const mapStateToProps = ({ teamMemberReducer: { team_member } }) => {
  return {
    team_member
  }
}


export default withRouter(withRoleManager(withAuth(connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({apiKey: KEY})(GoogleMap)))))