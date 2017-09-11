import React from 'react';
import ReactDOM from "react-dom"

class CountryInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode == 27) {
        this.props.close();
      }
    });
  }
  render() {
    if (this.props.show) {
      if (this.props.data === undefined) {
        return <div className="backgroundWindow">
          <div className="countryWindow">
            <div className="closeButton" onClick={this.props.close}></div>
            <div className="primaryInfo">Error while getting data. Please return to main window.</div>
          </div>
        </div>;
      } else {
        return <div className="backgroundWindow">
          <div className="countryWindow">
          <div className="closeButton" onClick={this.props.close}></div>
            <div className="primaryInfo">{this.props.data.name}</div>
            <div className="singleInfo"><div className="singleInfoHeader">Flag</div><img src={this.props.data.flag}/></div>
            <div className="singleInfo"><div className="singleInfoHeader">Capital city</div>{this.props.data.capital}</div>
            <div className="singleInfo"><div className="singleInfoHeader">Area [km<sup>2</sup>]</div>{this.props.data.area}</div>
            <div className="singleInfo"><div className="singleInfoHeader">Population</div>{this.props.data.population}</div>
            <div className="singleInfo"><div className="singleInfoHeader">Currencies</div>{this.props.data.currencies.map((element, index) => <p key={index}>{element.name}</p> )}</div>
            <div className="singleInfo"><div className="singleInfoHeader">Languages</div>{this.props.data.languages.map((element, index) => <p key={index}>{element.name}</p> )}</div>
            <div className="singleInfo"><div className="singleInfoHeader">Region</div>{this.props.data.region}</div>
            <div className="singleInfo"><div className="singleInfoHeader">Subregion</div>{this.props.data.subregion}</div>
          </div>
        </div>;
      }
    } else {
      return null;
    }
  }
}

export {CountryInfo}
