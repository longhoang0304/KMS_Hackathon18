/* eslint-disable */
import React from 'react';
import { MapView } from 'expo';

const Map = () => {
  return (
    <MapView
        style={{
          flex: 1,
        }}
        initialRegion={{
          latitude: 10.7334941,
          longitude: 106.7219345,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
  );
};

export default Map;