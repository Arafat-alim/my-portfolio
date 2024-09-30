import { useEffect, useState } from "react";
import { getVisitors } from "../db";

const useGeoIpInfo = () => {
  const [ipAddress, setIpAddress] = useState("");
  const [geoUserInfo, setGeoUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [fetchUser, setFetchUser] = useState(null);
  const [geoLocationPromptError, setLocationPromptError] = useState({
    errorCode: "",
    errorMessage: "",
  });

  const getIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIpAddress(data.ip);
    } catch (err) {
      console.error("Error occurred while fetching the IP address: ", err);
      setError("Unable to fetch IP address");
    }
  };

  const getGeoLocationInfo = async (ip) => {
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();
      setGeoUserInfo(data);
    } catch (err) {
      console.error(
        "Error occurred while fetching the geo location info: ",
        err
      );
      setError("Unable to fetch geolocation info");
    }
  };

  const getLocationWithPermission = () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, getError);
      } else {
        console.log("Geo location is not supported by this browser");
      }
    } catch (err) {
      console.error(
        "Error occured while asking geo location permission: ",
        err
      );
    }
  };

  const showPosition = (position) => {
    console.log("Position found__", position);
  };

  const getError = (error) => {
    if (error) {
      setLocationPromptError({
        errorCode: error.code,
        errorMessage: error.message,
      });
    }
  };

  const fetchingUser = async () => {
    try {
      const data = await getVisitors();
      setFetchUser(data);
    } catch (err) {
      console.error("Error occured while fetching user: ", err);
    }
  };

  useEffect(() => {
    getLocationWithPermission();
    fetchingUser();
    getIpAddress();
  }, []);

  useEffect(() => {
    if (ipAddress) {
      getGeoLocationInfo(ipAddress);
    }
  }, [ipAddress]);

  return { ipAddress, geoUserInfo, error, fetchUser };
};

export default useGeoIpInfo;
