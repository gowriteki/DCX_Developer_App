import React, { useContext, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import LoginContext from "../context/loginContext";
export const MyProfile = () => {
  const { user, updateUser } = useContext(LoginContext);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [skills, setSkills] = useState(user.skills);
  const [Availability, setAvailability] = useState(user.Availability);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstName.length < 3) newErrors.firstName = true;
    if (lastName.length < 3) newErrors.lastName = true;
    if (!emailRegex.test(email)) newErrors.email = true;
    if (skills.length < 3) newErrors.skills = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      var payload = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        city: city,
        state: state,
        skills: skills,
        Availability: Availability,
      };

      fetch(`http://localhost:7000/register/update/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },

        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          setShowSuccessToast(true);
          console.log("Update successful");
        })
        .catch((error) => {
          setShowErrorToast(true);
          console.log("Error updating:", error);
        });
    }
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
          <Toast.Body className="text-white">Profile updated! </Toast.Body>
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
          <Toast.Body className="text-white">
            Something went wrong. Please try again.
          </Toast.Body>
        </Toast>
      </ToastContainer>
      3
      <div className="container mt-2 mb-2">
        <h2 class="mb-3 blue-text">My Profile</h2>
        <p class="fw-bold">You can edit your developer profile here.</p>
        <form onSubmit={handleSubmit}>
          <div class="col-md-7 d-flex align-items-center mb-3">
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
          <div class="col-md-7 d-flex align-items-center gap-2 mb-3">
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
          <div class="col-md-7 d-flex align-items-center gap-2 mb-3">
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

          <div class="col-md-7 d-flex align-items-center gap-2 mb-3">
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

          <div class="col-md-7 d-flex align-items-center gap-2 mb-3">
            <label
              for="exampleFormControlInput1"
              class="form-label mb-0 fixed-label"
            >
              City
            </label>
            <div>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </div>
          </div>

          <div class="col-md-7 d-flex align-items-center gap-2 mb-3">
            <label
              for="exampleFormControlInput1"
              class="form-label mb-0 fixed-label"
            >
              State
            </label>
            <div>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                value={state}
                onChange={(e) => setState(e.target.value)}
              ></input>
            </div>
          </div>

          <div class="col-md-7 d-flex align-items-center gap-2">
            <label className="form-label mb-0">Availability</label>
            {["Full-Time", "Part-Time"].map((time) => (
              <div key={time} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Availability"
                  value={time}
                  checked={Availability === time}
                  onChange={(e) => {
                    setAvailability(e.target.value);
                  }}
                />
                <label className="form-check-label">{time}</label>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};
