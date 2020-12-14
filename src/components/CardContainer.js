import React from 'react'


const CardContainer = props => {
  return <div style={{
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    margin: '0 auto',
    maxWidth:'1000px',
    padding:'2em',

  }}>
  {props.children}</div>
}

export default CardContainer
