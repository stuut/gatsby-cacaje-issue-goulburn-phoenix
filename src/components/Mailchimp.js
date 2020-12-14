import React from 'react'
import mailchimpStyles from './mailchimpStyles.module.css'
import addToMailchimp from 'gatsby-plugin-mailchimp'


export default class Mailchimp extends React.Component {
  state = {
    name: null,
    email: null,
  }

  _handleChange = e => {

    this.setState({
      [`${e.target.name}`]: e.target.value,
      message : null,
    })
  }

  _handleSubmit = e => {
    e.preventDefault();
    console.log('submit', this.state)
    addToMailchimp(this.state.email, {name: this.state.name})
    .then(({msg, result}) => {
      console.log('msg', `${result}: ${msg}`);
      if (result !== 'success') {
        throw msg;
      }
      this.setState({
        message: msg
      });
    })
    .catch(err => {
      console.log('err', err);
      this.setState({
        message: err
      });
    });
  }

  render() {
    return (
      <div>
        <h4 style={{textAlign:'center', margin: '25px 0',}}>Goulburn News to your inbox</h4>
        <p style={{lineHeight:'25px', textAlign:'center', maxWidth:'320px', margin:'0 auto', marginBottom:'20px'}}>Sign up now for the latest news from the Goulburn area direct to your inbox.</p>
        <div className={mailchimpStyles.mailchimp_div}>
          <form style={{display:'flex'}} onSubmit={this._handleSubmit}>
            <input type="email" onChange={this._handleChange} placeholder="email" name="email" />
            <input style={{outline:'0'}} type="submit" placeholder="SUBMIT" name="SUBMIT" value="SUBMIT"/>
          </form>
          <div style={{marginTop:'25px'}}
            dangerouslySetInnerHTML={{ __html: this.state.message }}
            />
        </div>
      </div>

    )
  }
}
