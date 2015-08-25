import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <header className="mdl-layout__header mdl-color--white mdl-color-text--grey-900">
        <div className="mdl-layout__icon"></div>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            <img src="/images/logo-navbar.png"></img>
            Love is our Weapon
          </span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation mdl-layout--large-screen-only">
            <a className="mdl-navigation__link" href="#">Campaign</a>
            <a className="mdl-navigation__link" href="#">Updates</a>
            <a className="mdl-navigation__link" href="#">Comments (6)</a>
          </nav>
        </div>
      </header>
    );
  }
}

export default Navbar;
