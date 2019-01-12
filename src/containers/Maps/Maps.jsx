import React, { Component } from "react";

class Map extends Component {
  constructor(props) {
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);
   // this.createInfoWindow = this.createInfoWindow.bind(this);
    this.markers = [];
    // this.config = props.mapData.config;
  }

  onScriptLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options
    );
    this.props.onMapLoad(map);
  };

    // createInfoWindow = (e, map) => {
    //   const infoWindow = new window.google.maps.InfoWindow({
    //       content: '<div id="infoWindow" />',
    //       position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    //   })
    //   infoWindow.addListener('domready', e => {
    //     render(<InfoWindow />, document.getElementById('infoWindow'))
    //   })
    //   infoWindow.open(map)
    // }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyDlc77T8wFYNw41ahjG2yABJhWn2OMO7B4`;
      var x = document.getElementsByTagName("script")[0];
      x.parentNode.insertBefore(s, x);
      s.addEventListener("load", e => {
        this.onScriptLoad();
      });
    } else {
      this.onScriptLoad();
    }
  }

  addMarkers = () => {
    this.markers = this.props.mapData.markers.map(location => {
      return new window.google.maps.Marker({
        map: this.map,
        position: location
      });
    });
  };

  render() {
    return <div style={{ width: "auto", height: 360 }} id={this.props.id} />;
  }
}

export default Map;
