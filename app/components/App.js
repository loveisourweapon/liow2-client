import React from 'react';
import {RouteHandler} from 'react-router';
import Navbar from './Navbar';
import Drawer from './Drawer';
import Footer from './Footer';

class App extends React.Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Navbar />
        <Drawer />
        <RouteHandler />
        <Footer />
      </div>
    );
  }
}

export default App;
