import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

class DarMode extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <div className={'dark-mode-toggle'} style={{
            position: 'absolute',
            right: '10px',
            top: '10px'
          }}>

          <label className="switch" style={{verticalAlign:'middle'}}>
            <input
              type="checkbox"
              onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
              checked={theme === 'dark'}
            />{' '}
            <div className="slider"></div>
          </label>

          </div>
        )}
      </ThemeToggler>
    )
  }
}

export default DarMode
