import React from 'react';

class Welcome extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8">
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
              <button type="button" className="btn btn-primary">
                Login
              </button>
              &nbsp;&nbsp; or &nbsp;&nbsp;
              <button type="button" className="btn btn-default">
                Sign up
              </button>
            </p>
          </div>

          <div className="col-md-4">
            <h2 className="text-primary" style={{ marginBottom: 0 }}>
              80,900
            </h2>
            <h4 style={{ marginTop: 0, marginBottom: 0 }}>
              acts of love
            </h4>
            <p style={{ marginTop: 0 }}>
              done around the world
            </p>

            <h2 className="text-primary" style={{ marginBottom: 0 }}>
              125
            </h2>
            <h4 style={{ marginTop: 0, marginBottom: 0 }}>
              ministries
            </h4>
            <p style={{ marginTop: 0 }}>
              serving together
            </p>

            <h2 className="text-primary" style={{ marginBottom: 0 }}>
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
      </div>
    );
  }
}

export default Welcome;
