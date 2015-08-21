import React from 'react';

class Navbar extends React.Component {
  render() {
    return (
      <header className="mdl-layout__header mdl-color--white mdl-color-text--grey-900">
        <div className="mdl-layout__icon mdl-color-text--grey-900"></div>
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">Love is our Weapon</span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="#">Nav link 1</a>
            <a className="mdl-navigation__link" href="#">Nav link 2</a>
            <a className="mdl-navigation__link" href="#">Nav link 3</a>
          </nav>
        </div>
      </header>
    );
  }
}

export default Navbar;
