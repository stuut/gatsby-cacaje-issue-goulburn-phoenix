import React from 'react'
import './mobileMenuToggleStyles.css'

class MobileMenuToggle extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      active: false
    };
  }

  handleClick() {
    if (!this.state.active) {
      // attach/remove event handler
      this.setState(prevState => ({
         active: true,
      }));
    } else {
      this.setState(prevState => ({
         active: false,
      }));
    }


  }
    render() {

      return (
        <div>
        <div role = "button" tabIndex={0} className={`mobileMenuClick ${this.state.active ? 'active': ''}`} onClick={this.handleClick} onKeyDown={this.handleClick}>
        {this.props.heading}
        <div className={'plus'}><div className={'horizontal'}></div><div className={'vertical'}></div></div>
        </div>
        <div className={`mobileMenuContainer ${this.state.active ? 'active': ''}`} >
          {this.props.children}
        </div>
        </div>
      )
    }

}

export default MobileMenuToggle
