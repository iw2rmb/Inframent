import React, { useRef, useEffect, useState } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { BiCurrentLocation } from "react-icons/bi";
import "./map.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDPPictures } from "../action/projects";
import ProjectDetail from "../components/projectDetail";
import { fetchDpPictures } from "../action/projects";
const MapScreen = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [currentLocation, setCurrentLocation] = useState(null)
  const [zoom] = useState(18);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [isSatelliteView, setIsSatelliteView] = useState(false);

  const dispatch = useDispatch();
  const MAPTILER_API_KEY = "CcOATuikfYaYqcmMIpGp";

  const dpPicture = useSelector((state) => state?.dpPictures);

  const { dpPictures } = dpPicture;

  const deleteDp = useSelector((state) => state?.deleteDpArea)

  useEffect(() => {
    setCurrentLocation({ lng: 4.334043, lat: 52.068897 })
  }, [])

  useEffect(() => {
    dispatch(fetchAllDPPictures());
  }, [dispatch, deleteDp]);

  useEffect(() => {
    if (!showDetails) {
      setSelectedId(null);
    }
  }, [showDetails]);

  const getMapStyleURL = () => {
    if (isSatelliteView) {
      return `https://api.maptiler.com/maps/satellite/style.json?key=CcOATuikfYaYqcmMIpGp`;
    }
    return `https://api.maptiler.com/maps/2bc77a95-9f4a-4b6d-ad3a-d6ce6fb43b2f/style.json?key=CcOATuikfYaYqcmMIpGp`;
  };

  useEffect(() => {

    if (currentLocation) {

    
    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: getMapStyleURL(),
      center: [currentLocation.lng, currentLocation.lat],
      zoom: zoom,
    });

    dpPictures?.forEach((markerItem) => {
      const marker = document.createElement("div");

      const markerBox = document.createElement("div");
      markerBox.style.backgroundImage = `url(${markerItem?.thumbnail_image})`;
      markerBox.className = "markerBox";
      const triangle = document.createElement("div");
      triangle.className = "triangle";

      marker.appendChild(markerBox);
      markerBox.append(triangle)

      

      marker.addEventListener("click", () => {
        setShowDetails(true);
        setSelectedId(markerItem?.id);
        dispatch(fetchDpPictures(markerItem?.id))
      });

 
      const latLng = { lng: markerItem?.longitude, lat: markerItem?.latitude };
      new maptilersdk.Marker(marker).setLngLat(latLng).addTo(map.current);
      markers.current.push(marker);


     

    });
  
  }
  }, [
    isSatelliteView,
    dpPictures,
    currentLocation,
    zoom,
    deleteDp
  ]);

  return (
    <div className="flex-1 h-screen">
      <div ref={mapContainer} className="w-[100%] h-[100%]" />
      <div className="absolute bottom-[3rem] right-[1.5rem] bg-white flex flex-col items-center justify-evenly w-[3rem] rounded-3xl h-[6.5rem]  gap-4">
        <div
          className="border p-1 rounded-full bg-slate-200"
          // onClick={() => setIsSatelliteView(false)}
          >
          <BiCurrentLocation className="text-[24px]" />
        </div>
        <div
          className="border p-1 rounded-full bg-slate-200"
          onClick={() => setIsSatelliteView(!isSatelliteView)}
        >
          <img
            src="/assets/Vector.svg"
            alt="icon"
            className="w-[18px] h-[100%]"
          />
        </div>
      </div>

      {showDetails && (
        <ProjectDetail setShowDetails={setShowDetails} id={selectedId} showDetails={showDetails}/>
      )}

    </div>
  );
};

export default MapScreen;
