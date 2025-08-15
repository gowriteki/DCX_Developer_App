import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import "../../App.scss";
const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div class="col-lg-4 gy-5 gx-5 d-flex justify-content-center justify-content-lg-end">
      <div class="card text-center mb-4" id="left">
        <div class="card-header fw-bold ">
          <ul class="list-group list-group-item-action list-group-flush ">
            <li class="list-group-item fw-bold gy-5">Links</li>
          </ul>
        </div>
        <ul class="list-group list-group-item-action list-group-flush ">
          <Link
            to="/browse"
            state={{ skill: "SEO" }}
            className="list-group-item fw-bold"
          >
            SEO
          </Link>
          <Link
            to="/browse"
            state={{ skill: "PHP" }}
            className="list-group-item fw-bold"
          >
            PHP
          </Link>
          <Link
            to="/browse"
            state={{ skill: "PHP" }}
            className="list-group-item fw-bold"
          >
            Ajax
          </Link>
          <Link
            to="/browse"
            state={{ skill: "Ajax" }}
            className="list-group-item fw-bold"
          >
            jQuery
          </Link>
          <Link
            to="/browse"
            state={{ skill: "Web design" }}
            className="list-group-item fw-bold"
          >
            Web design
          </Link>
          <Link
            to="/browse"
            state={{ skill: "Web Programming" }}
            className="list-group-item fw-bold"
          >
            Web Programming
          </Link>
          <Link
            to="/browse"
            state={{ skill: "Content Creation" }}
            className="list-group-item fw-bold"
          >
            Content Creation
          </Link>
          <Link
            to="/browse"
            state={{ skill: "Internet Marketing" }}
            className="list-group-item fw-bold"
          >
            Internet Marketing
          </Link>
          <Link
            to="/browse"
            state={{ skill: "XHTML Templates" }}
            className="list-group-item fw-bold"
          >
            XHTML Templates
          </Link>
        </ul>
        {pathname === "/" && localStorage.getItem("name") === null ? (
          <div class="card-footer fw-bold ">
            <ul class="list-group  list-group-flush">
              <div class="card-header fw-bold ">Newsletter</div>
              <li class="list-group-item fw-bold ">Subscribed Email:</li>
              <li class="list-group-item fw-normal">
                <form id="form">
                  Name:{" "}
                  <input
                    class="mb-2"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></input>
                  Email:{" "}
                  <input
                    class="mb-2"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></input>
                  <button
                    onClick={() => {
                      email === ""
                        ? alert("please Enter Email")
                        : localStorage.setItem("name", name);
                    }}
                  >
                    Send
                  </button>
                  <button
                    onClick={() => {
                      document.getElementById("form").reset();
                    }}
                  >
                    clear
                  </button>
                </form>
              </li>
            </ul>
          </div>
        ) : pathname === "/" && localStorage.getItem("name") !== null ? (
          <div class="card-footer">
            <div class="card-header fw-bold ">Newsletter</div>
            <h6>Thanks for subscribing. Exciting updates coming your way.</h6>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Sidebar;
