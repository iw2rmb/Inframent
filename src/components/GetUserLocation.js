
import React, { useEffect, useState } from 'react';

const GetUserLocation = ({setCurrentLocation}) => {
  







// const [currentLocation, setCurrentLocation] = useState({lng: '', lat: ''})





  console.log('called get user location')

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    setCurrentLocation({lng: crd.longitude, lat: crd.latitude})
    console.log('accepted')
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
            setCurrentLocation({ lng: 5.0790560221990315, lat: 52.08479093992793 })
            console.log('not accepted')
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
            setCurrentLocation({ lng: 5.0790560221990315, lat: 52.08479093992793 })
            console.log('denied')
           
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);




  return (
    <>
    </>
  );
}

export default GetUserLocation;
