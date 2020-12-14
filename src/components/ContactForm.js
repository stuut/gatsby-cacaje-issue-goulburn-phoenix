import React from "react";
import { navigate } from "gatsby-link";

function encode(data) {
  const formData = new FormData();

  for (const key of Object.keys(data)) {
    formData.append(key, data[key]);
  }

  return formData;
}

export default class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAttachment = e => {
    this.setState({
      [e.target.name]: e.target.files[0]
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

  render() {
    return (
      <div style={{padding:'10px'}}>

        <form
          name="file-upload"
          method="post"
          action="/thanks/"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={this.handleSubmit}
        >
          {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
          <input type="hidden" name="form-name" value="file-upload" />
          <p hidden>
            <label>
              Don’t fill this out:{" "}
              <input name="bot-field" onChange={this.handleChange} />
            </label>
          </p>
          <div>

              <input  style={{
                padding: '10px',
                width: '100%',
                fontSize: '1rem',
                outline: '0',
                marginTop:'15px',
                border: '1px solid #e3e3e3',
                font: 'inherit',
              }}
              type="text" name="name" placeholder="Full Name" onChange={this.handleChange} required/>
          </div>
          <div>

              <input
              style={{
                padding: '10px',
                width: '100%',
                fontSize: '1rem',
                outline: '0',
                marginTop:'15px',
                border: '1px solid #e3e3e3',
                font: 'inherit',
              }}
              type="text" name="phone"  placeholder="Phone Number" onChange={this.handleChange} />

          </div>
          <div>

              <textarea
              style={{
              padding: '10px',
              width: '100%',
              fontSize: '1rem',
              outline: '0',
              minHeight: '250px',
              resize: 'vertical',
              marginTop:'15px',
              border: '1px solid #e3e3e3',
              font: 'inherit',
            }}
              type="textarea" name="message" placeholder="Message"  onChange={this.handleChange}>
              </textarea>

          </div>
          <p style={{
          textAlign: 'center',
          width: '100%',
          marginBottom: '5px',
          fontSize:'.9rem',
          }}
          >Upload photographs or a copy of your article below</p>
          <div>
          <p style={{
          textAlign: 'center',
          width: '100%',
          marginBottom: '5px',
          fontSize:'.9rem',
          }}>To Upload multiple files please create a zip archive or <a href="mailto:editor@horburyossettnews.co.uk">email us</a></p>

              <input
              style={{
                margin:'10px auto',
                display:'block',

              }}
                type="file"
                name="attachment"
                onChange={this.handleAttachment}
              />
          </div>
          <p>
            <button
            style={{
              margin: '25px auto',
              background: '#8fc744',
              color: '#ffffff',
              outline: '0',
              border: '0',
              WebkitAppearance: 'none',
              display: 'block',
              padding: '15px',
              textTransform: 'uppercase',
              fontSize: '1rem',
              minWidth: '200px',
            }}
            type="submit">Send</button>
          </p>
        </form>
      </div>
    );
  }
}
