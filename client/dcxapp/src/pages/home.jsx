import React, { useEffect, useState } from "react";
import { OpenResume } from "../utils/openResume";
import "../App.scss";
const Home = () => {
  const [latestDev, setLatestDev] = useState([]);
  useEffect(() => {
    fetch("http://localhost:7000/register/profiles")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setLatestDev(result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div class="card border-primary container mb-4">
        <div class="card-body d-flex flex-column flex-md-row">
          <div class="col-md-7 ">
            <h3 class="fw-bold text-center">
              Welcome to DCX Developer Directory!
            </h3>
            <h5 class="blue-text">Who Are We?</h5>
            <p>
              We are a fictional website and service that list top web
              developers around the world. Search and browse fictional web
              developers on our website absolutley FREE!
            </p>
            <h5 class="blue-text">What Skills Do Our Developers Have?</h5>
            <p>
              Our listed fictional web developers skill ranges from Graphic
              design with Photoshop, Illustrator and Fireworks to markup
              languages like HTML5, XHTML and XML to programming languages such
              as Javascript, PHP, Python and ASP
            </p>
          </div>
          <div id="image" class="col-md-5 "></div>
        </div>
      </div>

      <div class="card border-primary container mb-2 ">
        <h3 class="card-title fw-bold text-center">Latest DCX Developers</h3>
        <div class="card-body d-flex flex-column flex-md-row">
          {latestDev.length > 0 ? (
            latestDev
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 4)
              .map((item) => (
                <table class="table table-borderless ">
                  <thead class="blue-text">
                    <tr>
                      <th>
                        {item.firstName} {item.lastName}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.city === "" && item.state === "" ? (
                      <tr>
                        <td>Location: Not Available</td>
                      </tr>
                    ) : (
                      <tr>
                        <td>
                          Location: {item.city}, {item.state}{" "}
                        </td>
                      </tr>
                    )}

                    <tr>
                      <td>Skills: {item.skills}</td>
                    </tr>
                    <tr>
                      <td>Availability: {item.Availability}</td>
                    </tr>
                    <tr>
                      <td
                        class=" btn btn-link blue-text "
                        onClick={() => OpenResume(item._id)}
                      >
                        View Profile
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))
          ) : (
            <div style={{ height: "200px" }}>
              <h4 className="text-center">Developers Not Available</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
