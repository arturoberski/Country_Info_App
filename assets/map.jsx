import React from 'react';
import ReactDOM from "react-dom"
import {ComposableMap, ZoomableGroup, Geographies, Geography} from "react-simple-maps";
import ReactTooltip from "react-tooltip"
import {Motion, spring} from "react-motion"
import {CountryInfo} from './countryInfo.jsx';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      country: {}
    };
  }
  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 500)
  }
  handleClick = (event) => {
    fetch(`https://restcountries.eu/rest/v2/alpha/${event.id}`)
    .then(resp => {
      return resp.json();
    }).then(resp => {
      this.setState({country: resp, clicked: true});
    }).catch(err => {
      this.setState({clicked: true});
      console.log("Error: ", err);
    });
  }
  closeButtonHandle = () => {
    this.setState({clicked: false});
  }
  render() {
    return (
      <div className="mapContainer">
      <CountryInfo show={this.state.clicked} close={this.closeButtonHandle} data={this.state.country} onClick={this.handleClick}></CountryInfo>
      <Motion defaultStyle={{zoom: 1, x: 15, y: 20}}
        style={{
          zoom: spring(this.props.zoom, {stiffness: 210, damping: 60}),
          x: spring(this.props.center[0], {stiffness: 210, damping: 60}),
          y: spring(this.props.center[1], {stiffness: 210, damping: 60})
        }}>{({zoom,x,y}) => (
        <ComposableMap projectionConfig={{scale: 210,rotation: [-10,0,0]}} width={980} height={550} style={{backgroundColor: "none", width: "100%", height: "100%"}}>
          <ZoomableGroup center={[x,y]} zoom={zoom}>
            <Geographies geographyUrl={"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-50m.json"}>
            {(geographies, projection) => geographies.map((geography, i) => (
              <Geography key={i} geography={geography} onClick={this.handleClick} data-tip={geography.properties.name} projection={projection} style={{
              default: {
                fill: 'lightgrey',
                stroke: "#34495e",
                strokeWidth: .5,
                outline: "none"
              },
              hover: {
                fill: '#c74041',
                stroke: "#34495e",
                strokeWidth: .5,
                outline: "none",
                cursor: "pointer"
              },
              pressed: {
                fill: '#c74041',
                stroke: "#34495e",
                strokeWidth: .5,
                outline: "none"
              }}}>
              </Geography>))}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        )}</Motion>
        <ReactTooltip />
      </div>
    )
  }
}

export {Map}
