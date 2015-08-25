import React from 'react';
import Header from './Header';
import Welcome from './Welcome';

class Home extends React.Component {
  render() {
    return (
      <main className="mdl-layout__content mdl-color--yellow-50">
        <Header imageUrl="/images/header.jpg" altText={"\"Love your neighbor as yourself\" - Jesus"}></Header>
        <Welcome></Welcome>
        <div className="mdl-grid">
          <div className="mdl-cell">
            <p>Content</p>
            <p>Goes</p>
            <p>Here</p>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
