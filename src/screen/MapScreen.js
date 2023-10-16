import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { BiCurrentLocation } from "react-icons/bi";
import "./map.css";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAllDpPictures } from '../reducer/projects';
import { fetchAllDPPictures } from "../action/projects";
import ProjectDetail from "../components/projectDetail";
// import L from 'leaflet';

const MapScreen = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const tokyo = { lng: 4.33655, lat: 52.069554 };
  const [zoom] = useState(18);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null)
  const [mapUrl, setMapUrl] = useState(
    "https://api.maptiler.com/maps/satellite/style.json?key=CcOATuikfYaYqcmMIpGp"
  );
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const [view, setView] = useState("satellite");
  const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const MAPTILER_API_KEY = "CcOATuikfYaYqcmMIpGp";

  const dpPicture = useSelector((state) => state?.dpPictures);

  const { dpPictures, loading } = dpPicture;
  console.log(dpPictures);
  useEffect(() => {
    dispatch(fetchAllDPPictures());
    console.log("called");
  }, []);

  useEffect(() => {
    setData(dpPictures);
  }, [dpPictures]);

  useEffect(() => {
    if (!showDetails) {
      setSelectedImage(null)
    }
  }, [showDetails])

  const getMapStyleURL = () => {
    if (isSatelliteView) {
      return `https://api.maptiler.com/maps/satellite/style.json?key=${MAPTILER_API_KEY}`;
    }
    return `https://api.maptiler.com/maps/2bc77a95-9f4a-4b6d-ad3a-d6ce6fb43b2f/style.json?key=${MAPTILER_API_KEY}`;
  };

  const handleSatellite = () => {
    console.log("satellite");
    setMapUrl(
      "https://api.maptiler.com/maps/satellite/style.json?key=CcOATuikfYaYqcmMIpGp"
    );
  };

  const handleStreet = () => {
    console.log("street");
    setMapUrl(
      "https://api.maptiler.com/maps/2bc77a95-9f4a-4b6d-ad3a-d6ce6fb43b2f/style.json?key=CcOATuikfYaYqcmMIpGp"
    );
  };
  const API_KEY = "l0VwVBSqvwuV3rmsKBth";

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          message: "Foo",
          iconSize: [60, 60],
        },
        geometry: {
          type: "Point",
          coordinates: [4.33655, 52.069554],
        },
      },
      {
        type: "Feature",
        properties: {
          message: "Bar",
          iconSize: [50, 50],
        },
        geometry: {
          type: "Point",
          coordinates: [4.33855, 52.069564],
        },
      },
      // {
      //     'type': 'Feature',
      //     'properties': {
      //         'message': 'Baz',
      //         'iconSize': [40, 40]
      //     },
      //     'geometry': {
      //         'type': 'Point',
      //         'coordinates': [139.753, 35.6844]
      //     }
      // }
    ],
  };
  const street =
    "https://api.maptiler.com/maps/2bc77a95-9f4a-4b6d-ad3a-d6ce6fb43b2f/style.json?key=CcOATuikfYaYqcmMIpGp";
  const mapView =
    "https://api.maptiler.com/maps/satellite/style.json?key=iYxdzVY1gfGGQS0z4eby";


  useEffect(() => {
    console.log("called");
    // if (map.current) return; // stops map from intializing more than once

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: getMapStyleURL(),
      center: [tokyo.lng, tokyo.lat],
      zoom: zoom,
    });
    // "AccessKey"
    // dpPictures.forEach(marker => {
    //   const el = document.createElement('div');
    //   el.className = 'square-box';
    //   el.style.backgroundImage = `url(${marker?.thumbnail_image}/)`;

    //   // el.style.width = `${marker.properties.iconSize[0]}px`;
    //   // el.style.height = `${marker.properties.iconSize[1]}px`;

    //   el.addEventListener('click', () => {
    //     window.alert(marker.properties.message);
    //   });

    //   // add marker to map
    //   new maptilersdk.Marker(el)
    //       .setLngLat(marker.geometry.coordinates)
    //       .addTo(map.current);

    //   markers.current.push(el);
    // });



    dpPictures?.forEach((marker) => {
      // console.log(marker)
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = `url(${marker?.thumbnail_image})`;
      const triangle = document.createElement("div");
      triangle.className = "triangle";

      // el.style.width = `${marker.properties.iconSize[0]}px`;
      // el.style.height = `${marker.properties.iconSize[1]}px`;

      // Add the triangle element to the el element
      el.appendChild(triangle);

      el.addEventListener('click', () => {
        setShowDetails(true)
        setSelectedImage(marker)
        console.log(marker)
      });

      const latLng = { lng: marker?.longitude, lat: marker?.latitude };

      // add marker to map
      new maptilersdk.Marker(el).setLngLat(latLng).addTo(map.current);

      markers.current.push(el);
    });

    // new maptilersdk.Marker({color: "#FF0000"})
    //   .setLngLat([4.33655, 52.069554])
    //   .addTo(map.current);
  }, [isSatelliteView, dpPictures]);

  return (
    <div className="flex-1 h-screen">
      <div ref={mapContainer} className="w-[100%] h-[100%]" />
      <div className="absolute bottom-[3rem] right-[5px] bg-white flex flex-col items-center justify-evenly w-[3rem] rounded-3xl h-[6.5rem]  gap-4">
        <div
          className="border p-1 rounded-full bg-slate-200"
          onClick={() => setIsSatelliteView(false)}
        >
          <BiCurrentLocation className="text-[24px]" />
        </div>
        <div
          className="border p-1 rounded-full bg-slate-200"
          onClick={() => setIsSatelliteView(true)}
        >
          <img
            src="/assets/Vector.svg"
            alt="icon"
            className="w-[18px] h-[100%]"
          />
        </div>
      </div>

      {
        showDetails && <ProjectDetail setShowDetails={setShowDetails} object={selectedImage}/>
      }
    </div>
  );
};

export default MapScreen;
