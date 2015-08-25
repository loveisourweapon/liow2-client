import React from 'react';

class Drawer extends React.Component {
  render() {
    return (
      <div className="mdl-layout__drawer mdl-layout--small-screen-only">
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href="#">Campaign</a>
          <a className="mdl-navigation__link" href="#">Updates</a>
          <a className="mdl-navigation__link" href="#">Comments (6)</a>
        </nav>
      </div>
    );
  }
}

export default Drawer;
