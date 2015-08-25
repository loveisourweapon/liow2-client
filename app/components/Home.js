import React from 'react';
import Jumbotron from './Jumbotron';
import Welcome from './Welcome';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron imageUrl="/images/header.jpg"></Jumbotron>
        <Welcome></Welcome>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <p>Content</p>
              <p>Goes</p>
              <p>Here</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
