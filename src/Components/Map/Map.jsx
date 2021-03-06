import React, { useState, useEffect } from "react";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { getQuote } from "../../api";
import { getAirportCode } from "../../utils";
import { InfoWindowBox } from "../InfoWindowBox/InfoWindowBox";
import "../../reset/reset.scss";
import mapStyles from "./mapStyles";
import mapStylesDark from "./mapStylesDark";
import Search from "../Search/Search";
import "./Map.scss";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100vh",
};
const center = {
  lat: 52.229675,
  lng: 21.01223,
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const optionsDarkMode = {
  styles: mapStylesDark,
  disabledDefaultUI: true,
  zoomControl: true,
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=en`,
    libraries,
  });

  const [selected, setSelected] = useState();
  const [start, setStart] = useState();
  const [destination, setDestination] = useState();
  const [chosenStartPlace, setChosenStartPlace] = useState();
  const [chosenDestPlace, setChosenDestPlace] = useState();
  const [destPlaces, setDestPlaces] = useState();
  const [startPlaces, setStartPlaces] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startData, setStartData] = useState();
  const [destData, setDestData] = useState();
  const [startMarker, setStartMarker] = useState();
  const [destMarker, setDestMarker] = useState();

  const [showError, setShowError] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  const handleClickDarkMode = () => {
    if (!darkMode) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  };

  const searchEl = document.querySelector(".searchBoxPosition");
  const resetBtn = document.querySelector(".menuBtn");

  const handleButtonClick = () => {
    const startAirportCode = getAirportCode(chosenStartPlace);
    const destAirportCode = getAirportCode(chosenDestPlace);

    geocodeByAddress(chosenStartPlace)
      .then((res) => getLatLng(res[0]))
      .then((res) => {
        getQuote(
          startAirportCode,
          destAirportCode,
          startDate.format("YYYY-MM-DD")
        )
          .then((response) => response.json())
          .then((data) => {
            if (!data.Quotes.length) {
              setStartMarker();
              setDestMarker();
              setShowError(true);
            } else {
              setStartMarker(res);
            }
            return setStartData(data);
          })
          .catch((err) => {
            setShowError(true);
          });
      })
      .catch((err) => {
        setShowError(true);
      });

    geocodeByAddress(chosenDestPlace)
      .then((res) => getLatLng(res[0]))
      .then((res) => {
        getQuote(
          destAirportCode,
          startAirportCode,
          endDate.format("YYYY-MM-DD")
        )
          .then((response) => response.json())
          .then((data) => {
            if (!data.Quotes.length) {
              setStartMarker();
              setDestMarker();
              setShowError(true);
            } else {
              setDestMarker(res);
            }
            return setDestData(data);
          })
          .catch((err) => {
            setShowError(true);
          });
      })
      .catch((err) => {
        setShowError(true);
      });

    searchEl.classList.add("hidden");
    resetBtn.classList.remove("hidden");
  };

  const handleMenuButtonClick = () => {
    resetBtn.classList.add("hidden");
    searchEl.classList.remove("hidden");
    resetStates();
  };

  useEffect(() => {
    setSelected(destMarker);
  }, [destMarker]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  const path = [startMarker, destMarker];

  const optionsPolyline = {
    strokeColor: "limegreen",
    strokeOpacity: 1,
    strokeWeight: 3,
    fillColor: "limegreen",
    fillOpacity: 0.5,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: [startMarker, destMarker],
    zIndex: 1,
  };

  const resetStates = () => {
    setStart();
    setDestination();
    setChosenStartPlace();
    setChosenDestPlace();
    setDestPlaces();
    setStartPlaces();
    setStartDate();
    setEndDate();
    setStartData();
    setDestData();
    setStartMarker();
    setDestMarker();
    setShowError(false);
  };

  return (
    <>
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={destMarker ? 3.2 : 5}
          center={destMarker ? destMarker : center}
          options={darkMode === false ? options : optionsDarkMode}
        >
          <Search
            handleButtonClick={handleButtonClick}
            start={start}
            setStart={setStart}
            destination={destination}
            setDestination={setDestination}
            chosenStartPlace={chosenStartPlace}
            setChosenStartPlace={setChosenStartPlace}
            chosenDestPlace={chosenDestPlace}
            setChosenDestPlace={setChosenDestPlace}
            destPlaces={destPlaces}
            setDestPlaces={setDestPlaces}
            startPlaces={startPlaces}
            setStartPlaces={setStartPlaces}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />

          <div onClick={handleMenuButtonClick} className="menuBtn hidden">
            NEW SEARCH
          </div>

          {startMarker ? (
            <Marker
              position={{ lat: startMarker.lat, lng: startMarker.lng }}
              icon={{
                url: "https://image.flaticon.com/icons/svg/201/201623.svg",
                scaledSize: new window.google.maps.Size(32, 32),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(22.5, 22.5),
              }}
              onClick={() => {
                setSelected(startMarker);
              }}
            />
          ) : null}
          {destMarker ? (
            <Marker
              position={{ lat: destMarker.lat, lng: destMarker.lng }}
              icon={{
                url: "https://image.flaticon.com/icons/svg/201/201623.svg",
                scaledSize: new window.google.maps.Size(32, 32),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(22.5, 22.5),
              }}
              onClick={() => {
                setSelected(destMarker);
              }}
            />
          ) : null}
          {selected ? (
            <InfoWindowBox
              chosenStartPlace={chosenStartPlace}
              chosenDestPlace={chosenDestPlace}
              startData={startData}
              destData={destData}
              startDate={startDate}
              endDate={endDate}
              selected={selected}
              setSelected={setSelected}
            />
          ) : null}

          {showError ? (
            <div className="error">
              <div className="error_box">
                <h2 className="error_title">
                  We're sorry, currently there is no flight that matches your
                  requirements.
                </h2>
                <button onClick={handleMenuButtonClick} className="error_btn">
                  <p>Try again!</p>
                </button>
              </div>
              <div className="error_sidebar">
                <i className="far fa-frown-open"></i>
              </div>
            </div>
          ) : null}

          {destData ? <Polyline path={path} options={optionsPolyline} /> : null}

          {darkMode === false ? (
            <div onClick={handleClickDarkMode} className="emojiBox">
              <span className="emoji moon" role="img" aria-label="moon">
                🌙
              </span>
            </div>
          ) : (
            <div onClick={handleClickDarkMode} className="emojiBox">
              <span className="emoji sun" role="img" aria-label="sun">
                ☀️
              </span>
            </div>
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default Map;
