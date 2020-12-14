import React from 'react';
import PropTypes from 'prop-types';

class Tab extends React.Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  }

  render() {
    const {
      onClick,
      props: {
        activeTab,
        label,
      },
    } = this;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className += ' tab-list-active';
    }

    return (
      <div style={{flex:'1.2', cursor:'pointer', outline: '0'}}
        className={className}
        onClick={onClick}
        onKeyDown={onClick}
        role = "button"
        tabIndex={0}
      >
        {label}
      </div>
    );
  }
}


export default Tab;
