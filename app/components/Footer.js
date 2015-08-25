import React from 'react';
import moment from 'moment';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="pull-left">
            &copy; {moment().format('YYYY')} Love is our Weapon
          </div>
          <div className="pull-right">
            <ul className="list-inline">
              <li><a href="#">Help</a></li>
              <li><a href="#">Privacy &amp; Terms</a></li>
            </ul>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
