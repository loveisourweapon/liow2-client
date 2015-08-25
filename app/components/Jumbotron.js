import React from 'react';

class Header extends React.Component {
  render() {
    let imgStyle = {
      backgroundImage: `url(${this.props.imageUrl})`
    };

    return (
      <div className="jumbotron" style={imgStyle}>
        <div className="container">
          {/*<h1>
            "Love your neighbor as yourself"
            <br></br><small>- Jesus</small>
          </h1>*/}
        </div>
      </div>
    );
  }
}

export default Header;
