import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = () => {
  return (
    <div>
      <Button variant="warning">Current Location</Button>
      <Button variant="warning">Hong Kong</Button>
      <Button variant="warning">New York</Button>
      <Button variant="warning">Madrid</Button>
    </div>
  );
};

export default WeatherButton;
