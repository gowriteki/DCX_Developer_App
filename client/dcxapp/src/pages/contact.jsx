import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.scss";
import { Toast, ToastContainer } from "react-bootstrap";
const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    time: "",
    location: "",
    budget: 0,
    services: [],
    currentwebsite: "",
    noofpages: "",
  });

  // Add this state:
  const [validationErrors, setValidationErrors] = useState({
    fullname: false,
    email: false,
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Something went wrong. Please try again."
  );
  // Update handleChange function:
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        const updatedServices = checked
          ? [...prev.services, value]
          : prev.services.filter((s) => s !== value);
        return { ...prev, services: updatedServices };
      });
    } else if (type === "radio") {
      setFormData({ ...formData, calltime: value });
    } else if (name === "budget") {
      setFormData({ ...formData, budget: parseInt(value) });
    } else {
      // Validation check
      if (name === "fullname") {
        setValidationErrors((prev) => ({
          ...prev,
          fullname: value.length < 4,
        }));
      }
      if (name === "email") {
        setValidationErrors((prev) => ({
          ...prev,
          email: !value.endsWith("@gmail.com"),
        }));
      }

      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {
      fullname: formData.fullname.trim().length < 4,
      email: !formData.email.includes("@") || !formData.email.endsWith(".com"),
      phone: formData.phone.trim().length < 6,
      location: formData.location.trim() === "",
      currentwebsite: formData.currentwebsite.trim() === "",
      noofpages: formData.noofpages === "",
    };

    setValidationErrors(errors);

    if (Object.values(errors).some((err) => err)) {
      // Stop form submission if there are errors
      return;
    }

    // Proceed with form submission
    fetch("http://localhost:7000/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.error) {
          setErrorMessage(data.error);
          setShowErrorToast(true);
          return;
        }
        setShowSuccessToast(true);
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          time: "",
          location: "",
          budget: 0,
          services: [],
          currentwebsite: "",
          noofpages: "",
        });
      })
      .catch((err) => {
        setShowErrorToast(true);
        console.error("Error:", err);
      });
  };

  return (
    <div class="card border-primary container mb-4">
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
            Thank you for reaching out to us.We will get back to you as soon as
            possible.
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
      <h2 class="blue-text">Contact Us</h2>
      <p className="fw-bold">
        Please use this form to contact a member of our website team
      </p>
      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-2 row">
          <label className="col-md-3  col-form-label">Full Name:</label>
          <div className="col-sm-3">
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={`form-control ${
                validationErrors.fullname ? "is-invalid" : ""
              }`}
            />
            {validationErrors.fullname && (
              <div className="invalid-feedback d-block">
                Full Name is required.
              </div>
            )}
            
          </div>
        </div>

        {/* Email */}
        <div className="mb-2 row">
          <label className="col-md-3  col-form-label">Email Address:</label>
          <div className="col-sm-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${
                validationErrors.email ? "is-invalid" : ""
              }`}
            />
            {validationErrors.email && (
              <div className="invalid-feedback d-block">
                Please enter a valid email address.
              </div>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="mb-2 row">
          <label className="col-md-3  col-form-label">Phone Number:</label>
          <div className="col-sm-3">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
            />
            {validationErrors.phone && (
              <div className="invalid-feedback d-block">
                Phone Number is required.
              </div>
            )}
          </div>
        </div>

        {/* Call Time (Radio Buttons) */}
        <div className="d-flex align-items-center gap-4 mb-2">
          <label className="form-label mb-0">Best Time To Call:</label>
          {["Morning", "Noon", "Evening"].map((time) => (
            <div key={time} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="calltime"
                value={time}
                checked={formData.time === time}
                onChange={handleChange}
              />
              <label className="form-check-label">{time}</label>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="mb-2 row">
          <label className="col-md-3 col-form-label">Location:</label>
          <div className="col-sm-3">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-control"
            />
            {validationErrors.location && (
              <div className="invalid-feedback d-block">
                Location is required.
              </div>
            )}
          </div>
        </div>

        <h2>About the Project</h2>
        <div class="mb-2" style={{ border: "1px solid" }}>
          <div class="container ms-3">
            <div class="col-md-6 d-flex align-items-center  gap-2">
              <label>Budget:</label>
              <input
                type="range"
                name="budget"
                min={1000}
                max={10000}
                step={100}
                value={formData.budget}
                onChange={handleChange}
              />
              <div class="col-sm-5">
                <input
                  type="number"
                  value={formData.budget}
                  readOnly
                  className="form-control"
                />
              </div>
            </div>
            <br></br>

            {/* Services (Checkboxes) */}
            <fieldset>
              <legend>Services Needed:</legend>
              {["HTML", "PHP", "ASP", "Java", "C++", "Design"].map((svc) => (
                <div key={svc} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={svc}
                    checked={formData.services.includes(svc)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">{svc}</label>
                </div>
              ))}
            </fieldset>
            <br></br>

            {/* Current Website */}
            <div className="mb-2 row">
              <label className="col-md-3 col-form-label">
                Current Website:
              </label>
              <div className="col-sm-3">
                <input
                  type="text"
                  name="currentwebsite"
                  value={formData.currentwebsite}
                  onChange={handleChange}
                  className="form-control"
                />
                {validationErrors.currentwebsite && (
                  <div className="invalid-feedback d-block">
                    Current Website is required.
                  </div>
                )}
              </div>
            </div>

            {/* Number of Pages */}
            <div className="mb-2 row">
              <label className="col-md-3 col-form-label">
                Number of Pages:
              </label>
              <div className="col-sm-3">
                <input
                  type="number"
                  name="noofpages"
                  value={formData.noofpages}
                  onChange={handleChange}
                  className="form-control"
                />
                {validationErrors.phone && (
                  <div className="invalid-feedback d-block">
                    Number of Pages is required.
                  </div>
                )}
              </div>
            </div>
          </div>
          <br></br>

          {/* Submit Button */}
          <div className="col-12 ">
            <button type="submit" className="btn btn-primary ms-3 mb-2">
              Submit Inquiry
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contact;
