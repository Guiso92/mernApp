import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function UserPlaces() {
  const userId = useParams().userId;
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}places/user/${userId}`
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    }
    fetchPlaces();
  }, [sendRequest, userId]);

  function placeDeleteHandler(deletedPlaceId) {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </React.Fragment>
  );
}

export default UserPlaces;
