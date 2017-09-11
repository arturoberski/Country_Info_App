import React from "react"
import ReactDOM from "react-dom"

class WelcomeWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.show) {
      return <div className="backgroundWindow">
        <div className="countryWindow" style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>
          <h1>Welcome to Country Info App!</h1>
          <h3>Pick a country from the map and see some interesting data about it.</h3>
          <h5>Use buttons on the top to zoom in a continent.</h5>
          <button className="welcomeButton" onClick={this.props.closeWindow}>Start!</button>
        </div>
      </div>;
    } else {
      return null;
    }
  }
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: [15, 20],
      zoom: 1,
      continents: [
        {
          name: "Asia",
          coordinates: [100, 35]
        }, {
          name: "Africa",
          coordinates: [20, 0]
        }, {
          name: "Australia",
          coordinates: [145, -30]
        }, {
          name: "Europe",
          coordinates: [20, 50]
        }, {
          name: "North America",
          coordinates: [-100, 50]
        }, {
          name: "South America",
          coordinates: [-60, -25]
        }
      ]
    };
  }

  handleZoom = (event) => {
    let tempZoom = 2;
    if (event.target.getAttribute("data-cont") == 3 || event.target.getAttribute("data-cont") == 2) {
      tempZoom = 3;
    } else if (event.target.getAttribute("data-cont") == 0) {
      tempZoom = 1.7;
    } else {
      tempZoom = 2;
    }
    const cont = this.state.continents[event.target.getAttribute("data-cont")];
    this.setState({center: cont.coordinates, zoom: tempZoom}, () => {
      this.props.center(this.state.center);
      this.props.zoom(this.state.zoom);
    });
  }

  handleReset = () => {
    this.setState({center: [15, 20], zoom: 1}, () => {
      this.props.center(this.state.center);
      this.props.zoom(this.state.zoom);
    });
  }

  render() {
    return <div className="header">
      {this.state.continents.map((continent, index) => <div className="continentButton" key={index} onClick={this.handleZoom} data-cont={index}>{continent.name}</div>)}
      <div className="continentButton" onClick={this.handleReset}>World</div>
    </div>
  }
}

class Footer extends React.Component {
  render() {
    return <div className="footer">
      <img src="assets/pictures/world.png"/>
      <p id="footerText"><span id="countryText"> COUNTRY </span> INFO APP &reg; 2017 <br/> <span id="rightsText"> All Rights Reserved </span> </p>
    </div>
  }
}

export {Header, Footer, WelcomeWindow};
