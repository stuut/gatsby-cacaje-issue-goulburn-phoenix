import React from 'react'

import firebase from "gatsby-plugin-firebase"

import counterNumberStyles from './counterNumberStyles.module.css'


class CounterNumber extends React.Component {
    constructor() {
      super()
      this.state = {
        count: ''
      }
      this.addVote = this.addVote.bind(this);
    }


  componentDidMount() {
    const storage = firebase.database();
    const messagesRef = storage.ref(this.props.databaseId)

    messagesRef.on('value', snapshot => {
        this.setState({count: snapshot.val()});
      });
    }

  addVote(event) {
    console.log('onlclick')
  const storage = firebase.database();
  event.preventDefault();
  this.setState(prevState => ({
    count: prevState.count + 1,
  }))

  storage.ref(this.props.databaseId).set(this.state.count + 1);

  }

  render() {
    return (
      <div>
        <div className={`${counterNumberStyles.likeButtonContainer}`}>
          {this.state.count &&
          <div className={`${counterNumberStyles.counter}`}> {this.state.count}</div>
          }
          <div
            className={`${counterNumberStyles.likeButton} ${'counterNumberDarkMode'}`}
            role = "button"
            onKeyDown={this.addVote}
            onClick={this.addVote}
            tabIndex={0}
          >
          </div>
        </div>
      </div>
    )
  }
}

export default CounterNumber
