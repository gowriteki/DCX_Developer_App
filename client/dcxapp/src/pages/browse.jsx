import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import { OpenResume } from "../utils/openResume";
import "../App.scss";
const BrowseDevelopers = () => {
  const [developers, setDevelopers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const skill = location.state?.skill || "";

    fetch(`http://localhost:7000/register/profiles/${skill}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDevelopers(data);
      })
      .catch((error) => {
        console.error("error fetching developers data:", error);
      });
  }, [location.state]);

  const groupedByState = developers.reduce((acc, dev) => {
    if (!acc[dev.state]) acc[dev.state] = [];
    acc[dev.state].push(dev);
    return acc;
  }, {});

  const sortedStates = Object.keys(groupedByState).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div
      className="card border-primary container mb-4"
      style={{
        maxWidth: "100%",
        width: "800px",

        height: "500px",
        overflowY: "auto",
      }}
    >
      {sortedStates.length > 0 ? (
        sortedStates.map((state) => (
          <div key={state} className="mb-4">
            <h4 className="mb-3 blue-text">{state}</h4>
            <div className="row font-weight-bold border-bottom pb-2  ">
              <div className="col-4">Name</div>
              <div className="col-4">City</div>
              <div className="col-4">Skills</div>
            </div>
            {groupedByState[state].map((dev) => (
              <div className="row border-bottom py-2 dev-row" key={dev._id}>
                <div className="col-4">
                  <button
                    className="btn btn-link p-0"
                    onClick={() => OpenResume(dev._id)}
                  >
                    {dev.firstName} {dev.lastName}
                  </button>
                </div>
                <div className="col-4">{dev.city}</div>
                <div className="col-4">{dev.skills}</div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <h4 className="text-center">Developers Not Available</h4>
      )}
    </div>
  );
};

export default BrowseDevelopers;
