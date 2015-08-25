import React from 'react';

class Welcome extends React.Component {
  render() {
    return (
      <div className="mdl-grid mdl-color--white">
        <div className="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet">
          <h4>
            The Love is our Weapon Campaign is a youth movement that exists to
            change cities through the love of Jesus by doing strategic practical
            acts of love.
          </h4>
          <p>
            Thousands of people, doing thousands of acts of love, bringing
            change, value, healing and hope throughout cities and communities
            everywhere.
          </p>
          <p style={{ textAlign: 'center' }}>
            <br></br>
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored">
              Login
            </button>
            &nbsp;&nbsp; or &nbsp;&nbsp;
            <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--primary">
              Sign up
            </button>
          </p>
        </div>
        <div className="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet">
          <h2 className="mdl-color-text--red-700" style={{ marginBottom: 0 }}>
            80,900
          </h2>
          <h4 style={{ marginTop: 0, marginBottom: 0 }}>
            acts of love
          </h4>
          <p style={{ marginTop: 0 }}>
            done around the world
          </p>

          <h2 className="mdl-color-text--red-700" style={{ marginBottom: 0 }}>
            125
          </h2>
          <h4 style={{ marginTop: 0, marginBottom: 0 }}>
            ministries
          </h4>
          <p style={{ marginTop: 0 }}>
            serving together
          </p>

          <h2 className="mdl-color-text--red-700" style={{ marginBottom: 0 }}>
            65,000
          </h2>
          <h4 style={{ marginTop: 0, marginBottom: 0 }}>
            individuals
          </h4>
          <p style={{ marginTop: 0 }}>
            causing change
          </p>
        </div>
      </div>
    );
  }
}

export default Welcome;
