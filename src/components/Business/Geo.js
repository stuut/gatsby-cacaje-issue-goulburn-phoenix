import React, { Component } from 'react'
import { GeoSearch, Marker } from 'react-instantsearch-dom-maps'

class Geo extends Component {
  InfoWindow = new this.props.google.maps.InfoWindow()

  onClickMarker = ({ hit, marker }) => {
    if (this.InfoWindow.getMap()) this.InfoWindow.close()
    this.InfoWindow.setContent(
      `<h5>${hit.name}</h5><p style="font-size:16px; margin:5px 0px;">${hit.address}</p>
      <span style="font-weight:900">PH: </span>${hit.phone}

      <p><a style="margin:5px 0px; display:block" href="${hit.website}">${hit.website}</a></p>

      <a style="font-weight:900; color:#000000; " href="https://www.google.com/maps/dir//${hit.address}">GET DIRECTIONS</a>
      `
    )
    this.InfoWindow.open(marker.getMap(), marker)
  }

  render() {
    const { google } = this.props

    return (
      <GeoSearch
        google={google}
        enableRefine={false}
        streetViewControl={false}
        mapTypeControl={false}
        zoom={9}
        minZoom={9}
        maxZoom={15}
        styles={[
          {
            stylers: [
              {
                hue: '#3596D2'
              }
            ]
          }
        ]}
      >
        {({ hits }) => (
          <div>
            {hits.map(hit => (
              <Marker
                key={hit.objectID}
                hit={hit}
                onClick={({ marker }) => {
                  this.onClickMarker({
                    hit,
                    marker
                  })
                }}
              />
            ))}
          </div>
        )}
      </GeoSearch>
    )
  }
}

export default Geo
