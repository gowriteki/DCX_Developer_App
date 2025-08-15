import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.scss";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import { Toast, ToastContainer } from "react-bootstrap";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

//import { useForm } from 'react-hook-form';

const RegisterAsDeveloper = () => {
  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    shadowSize: [41, 41],
    shadowAnchor: [12, 41],
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [position, setPosition] = useState([0, 0]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [skills, setSkills] = useState("");
  const [Availability, setAvailability] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again."
  );
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (firstName.length < 3) newErrors.firstName = true;
    if (lastName.length < 3) newErrors.lastName = true;
    if (!emailRegex.test(email)) newErrors.email = true;
    if (!passwordRegex.test(password)) newErrors.password = true;
    if (password !== confirmPassword) newErrors.confirmPassword = true;
    if (skills.length < 3) newErrors.skills = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handeleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("skills", skills);
      formData.append("Availability", Availability);
      formData.append("resume", profile);

      fetch("http://localhost:7000/register/", {
        method: "POST",

        body: formData,
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setFirstName("");
          setLastName("");
          setEmail("");
          setCity("");
          setState("");
          setSkills("");
          setAvailability("");
          setProfile("");
          setConfirmPassword("");
          setPassword("");

          if (result && result.error) {
            setErrorMessage(result.error);
            setShowErrorToast(true);
            return;
          }

          setShowSuccessToast(true);
        })
        .catch((err) => {
          setShowErrorToast(true);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const savedPosition = sessionStorage.getItem("userPosition");
    if (savedPosition) {
      const [lat, long] = JSON.parse(savedPosition);
      setPosition([lat, long]);
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;

          sessionStorage.setItem("userPosition", JSON.stringify([lat, long]));

          setPosition([lat, long]);
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
          )
            .then((response) => response.json())
            .then((data) => {
              const city =
                data.address.city || data.address.town || data.address.village;
              const state = data.address.state;

              setCity(city);
              setState(state);
            })
            .catch((error) =>
              console.error("Error fetching location info:", error)
            );
        },
        (error) => {
          setErrorMessage("your location access should be given to register");
          setShowErrorToast(true);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.setView(position, map.getZoom());
      }
    }, [position, map]);
    return null;
  };

  return (
    <div
      class="card border-primary container mb-4"
      style={{ height: "500px", overflowY: "auto" }}
    >
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowSuccessToast(false)}
          show={showSuccessToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Profile registered! Please Login to see/edit your details
          </Toast.Body>
        </Toast>

        <Toast
          bg="danger"
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{errorMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div className="container mt-2 mb-2">
        <h2 class="mb-3 blue-text">Register As A Developer</h2>
        <p class="fw-bold">
          Please use this Form to register as a developer here.
        </p>
        <form onSubmit={(e) => handeleSubmit(e)}>
          <div class="col-md-6 d-flex align-items-center mb-3">
            <label
              for="exampleFormControlInput1"
              class="form-label mb-0 fixed-label"
            >
              First Name
            </label>
            <div>
              <input
                type="text"
                class={`form-control ${
                  errors.firstName ? "border-danger" : ""
                }`}
                id="exampleFormControlInput1"
                placeholder="Enter your First name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              ></input>
              {errors.firstName ? (
                <small class="red-text">Enter more than three chars</small>
              ) : (
                ""
              )}
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center gap-2 mb-3">
            <label
              for="exampleFormControlInput1"
              class="form-label mb-0 fixed-label"
            >
              Last Name
            </label>
            <div>
              <input
                type="text"
                class={`form-control ${errors.lastName ? "border-danger" : ""}`}
                placeholder="Enter your last name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              ></input>
              {errors.lastName ? (
                <small class="red-text">Enter more than three chars</small>
              ) : (
                ""
              )}
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center gap-2 mb-3">
            <label
              for="exampleFormControlInput1"
              class="form-label mb-0 fixed-label"
            >
              Email
            </label>
            <div>
              <input
                type="email"
                class={`form-control ${errors.email ? "border-danger" : ""}`}
                id="exampleFormControlInput1"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              ></input>
              {errors.email ? (
                <small class="red-text">Not in the correct format.</small>
              ) : (
                ""
              )}
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center gap-2 mb-3">
            <label
              for="exampleFormControlInput1"
              class="form-label mb-0 fixed-label"
            >
              Password
            </label>
            <div>
              <input
                type="password"
                class={`form-control ${errors.password ? "border-danger" : ""}`}
                id="exampleFormControlInput1"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
              {errors.password ? (
                <small class="red-text">
                  Min.8 chars numbers+letters+special char.
                </small>
              ) : (
                ""
              )}
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center gap-2 mb-3">
            <label
              for="exampleFormControlInput1"
              class="form-label mb-0 fixed-label"
            >
              Confirm Password
            </label>
            <div>
              <input
                type="password"
                class={`form-control ${
                  errors.confirmPassword ? "border-danger" : ""
                }`}
                id="exampleFormControlInput1"
                placeholder="confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              ></input>
              {errors.confirmPassword ? (
                <small class="red-text">Enter matching Password.</small>
              ) : (
                ""
              )}
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center gap-2 mb-3">
            <label
              for="exampleFormControlInput1"
              class="form-label mb-0 fixed-label"
            >
              Skills
            </label>

            <div>
              <input
                type="text"
                class={`form-control ${errors.skills ? "border-danger" : ""}`}
                id="exampleFormControlInput1"
                placeholder="Enter comma seperated skills"
                onChange={(e) => setSkills(e.target.value)}
                value={skills}
              ></input>
              {errors.skills ? (
                <small class="red-text">Enter more than three chars</small>
              ) : (
                ""
              )}
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center gap-2">
            <label className="form-label mb-0">Availability</label>
            {["Full-Time", "Part-Time"].map((time) => (
              <div key={time} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Availability"
                  value={time}
                  onChange={(e) => {
                    setAvailability(e.target.value);
                  }}
                />
                <label className="form-check-label">{time}</label>
              </div>
            ))}
          </div>

          <div className="justify-content-center mb-3">
            <div id="map">
              <MapContainer
                center={position}
                zoom={10}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "50em" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={redIcon}>
                  <Popup>{city}</Popup>
                </Marker>
                <RecenterMap position={position} />
              </MapContainer>
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center gap-5 ">
            <label
              for="exampleFormControlInput1"
              class="form-label mb-0 fixed-label"
            >
              Upload Profile
            </label>
            <div>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setProfile(e.target.files[0])}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegisterAsDeveloper;
