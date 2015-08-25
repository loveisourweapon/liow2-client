import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top" id="liow-navbar" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#liow-navbar-collapse" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <a className="navbar-brand" href="/">
              <img alt="Love is our Weapon" src="/images/logo-navbar.png"></img>
              Love is our Weapon
            </a>
          </div>

          <div className="collapse navbar-collapse" id="liow-navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Campaign</a></li>
              <li><a href="#">Updates</a></li>
              <li><a href="#">Comments <span className="badge">6</span></a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
