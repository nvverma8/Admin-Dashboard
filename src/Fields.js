import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Fields.css";

const DisplayPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');
  const email = searchParams.get('eventDis');
  const date =searchParams.get('date');
  const stime = searchParams.get('start');
  const etime = searchParams.get('etime')

  return (
    <div className="page">
      <h2>Listing Page</h2>
      <p>Event Name: {name}</p>
      <p>Event discription: {email}</p>
      <p>Date: {date}</p>
      <p>Start Time: {stime}</p>
      <p>End Time: {etime}</p>
    </div>
  );
};

export default DisplayPage;





