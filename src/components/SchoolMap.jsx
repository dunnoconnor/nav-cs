import React from 'react';
import GoogleMapReact from 'google-map-react';

const Pin = ({ text }) => <div>{text}</div>;

function SchoolMap({name,lat,lon}) {
    const key = process.env.REACT_APP_GOOGL_KEY;
    const defaultProps = {
        center: {
          lat: lat,
          lng: lon
        },
        zoom: 12
      };
    
    return (
    <div className="SchoolMap">
        <GoogleMapReact
        className="map"
        bootstrapURLKeys={{ key: key }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        >
        <Pin
          lat={lat}
          lng={lon}
          text={name}
        />
        </GoogleMapReact>
    </div>
    );
}

export default SchoolMap;