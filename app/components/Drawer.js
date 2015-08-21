import React from 'react';

class Drawer extends React.Component {
  render() {
    return (
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">Love is our Weapon</span>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href="#">Nav link 2</a>
          <a className="mdl-navigation__link" href="#">Nav link 2</a>
          <a className="mdl-navigation__link" href="#">Nav link 3</a>
        </nav>
      </div>
    );
  }
}

export default Drawer;
