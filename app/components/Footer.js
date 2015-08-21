import React from 'react';
import moment from 'moment';

class Footer extends React.Component {
  render() {
    return (
      <footer className="mdl-mini-footer">
        <div className="mdl-mini-footer__left-section">
          <div className="mdl-logo">&copy; {moment().format('YYYY')} Love is our Weapon</div>
          <ul className="mdl-mini-footer__link-list">
            <li><a href="#">Help</a></li>
            <li><a href="#">Privacy & Terms</a></li>
          </ul>
        </div>
      </footer>
    );
  }
}

export default Footer;
