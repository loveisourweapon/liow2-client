import React from 'react';

class Header extends React.Component {
  render() {
    let altText = this.props.altText || "Header Image";
    let imgStyle = {
      backgroundImage: `url(${this.props.imageUrl})`
    };

    return (
      <div className="header-image" alt={altText} title={altText} style={imgStyle}></div>
    );
  }
}

export default Header;
