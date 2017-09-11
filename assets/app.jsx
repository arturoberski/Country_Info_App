import React from 'react'
import ReactDOM from 'react-dom'
import {WelcomeWindow, Header, Footer} from './mainComponents.jsx'
import {Map} from './map.jsx'

document.addEventListener('DOMContentLoaded', function() {
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        center: [15, 20],
        zoom: 1,
        show: true
      }
    };
    centerSet = (data) => {
      this.setState({center: data});
    };
    zoomSet = (data) => {
      this.setState({zoom: data});
    };
    closeWindow = () => {
      this.setState({show: false});
    };
    render() {
      return (
        <div className="mainContainer">
          <Header center={this.centerSet} zoom={this.zoomSet}></Header>
          <Map center={this.state.center} zoom={this.state.zoom}></Map>
          <Footer></Footer>
          <WelcomeWindow closeWindow={this.closeWindow} show={this.state.show}/>
        </div>
      )
    }
  }
  ReactDOM.render(
    <App/>, document.getElementById('app'));
});
