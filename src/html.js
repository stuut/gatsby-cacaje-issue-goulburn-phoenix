import React from "react"
import PropTypes from "prop-types"


export default class HTML extends React.Component {

render() {

    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
        </head>
        <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                    var OneSignal = window.OneSignal || [];
                    OneSignal.push(function() {
                      OneSignal.init({
                        appId: "494fa8c9-fb6c-4b1a-9e58-67d310a4eaa1",
                      });
                    });
                `,
          }}
        />

        <body {...this.props.bodyAttributes}>

          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
