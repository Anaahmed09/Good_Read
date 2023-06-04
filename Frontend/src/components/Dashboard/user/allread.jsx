import React, { useEffect } from "react";
import Table from "./userTable.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData, updateRateOrStatus } from "Redux/userdashboard/slice";
import { changeMessage } from "Redux/userdashboard/slice.js";
import CircularProgress from "@mui/material/CircularProgress";

export default function allread({ filter }) {
  const { data, isLoading, error, message } = useSelector((state) => state.userDashboard);
  const dispatch = useDispatch();
  const Rows = ["Book Name", "Author", "Rate", "Average Ratting", "Status"];
  const handleDataReceived = (myData) => {
    dispatch(updateRateOrStatus(myData));
  };

  const handleStatusData = (myData) => {
    dispatch(updateRateOrStatus(myData));
  };

  // const updateDashboard = (data) => {
  //   dispatch(updateRateOrStatus(data));
  // };

  useEffect(() => {
    dispatch(fetchApiData());
    dispatch(changeMessage());
  }, [message]);

  if (isLoading) {
    return <CircularProgress color="inherit" className="text-center" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {data && (
        <Table
          DData={data}
          rows={Rows}
          filter={filter}
          onDataReceived={handleDataReceived}
          statusData={handleStatusData}
        />
      )}
    </>
  );
}
