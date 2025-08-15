import React, { useState,useContext} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../../App.scss'
import LoginContext from '../../context/loginContext';
const Navbar=()=>{
  const navigate=useNavigate()
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  
  const{user,updateUser} =useContext(LoginContext);
  const loginUser=(e)=>{
    e.preventDefault();
    const data={email:email,
    password:password};
    fetch('http://localhost:7000/register/login',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(
        response=>{
          //console.log(response)
            if(response.ok)
                return response.json();
            else
                alert('login Failed');
        }
        
    ).then(
        data=>{
            if(data.message==='Invalid Credential'){
                alert('Invalid credential');
                return
            }
            console.log('login Successful');
            
            const userData= {
              id:data.data._doc._id,
              firstName: data.data._doc.firstName, 
              lastName: data.data._doc.lastName,
              email:data.data._doc.email,
              city:data.data._doc.city,
              state:data.data._doc.state,
              skills:data.data._doc.skills,
              Availability:data.data._doc.Availability,
              
          };
          updateUser(userData);
            localStorage.setItem('token',data.token);//local storage has 5 mb of space and if we dont clear it will stay till history has been clear
            
            
                navigate('/');

        }
    ).catch(err=>{
      
        alert("email or password is wrong");
        navigate('/')
    })}
    const logOut=()=>{
      updateUser(null);
      localStorage.removeItem('firstName');
      localStorage.removeItem('token');
      navigate('/');
      
    }
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark ">
          <div class="container">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse " id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link class="nav-link text-white fw-bold" to="/">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link text-white fw-bold" to="/about">
                    About us
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    class="nav-link text-white fw-bold"
                    to="/browse"
                    state={{ skill: "" }}
                  >
                    Browse Developers
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link text-white fw-bold" to="/register">
                    Register As Developer
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link text-white fw-bold" to="/contact">
                    Contact us
                  </Link>
                </li>
                {user !== null ? (
                  <li class="nav-item">
                    <Link class="nav-link text-white fw-bold" to="/myprofile">
                      My Profile
                    </Link>
                  </li>
                ) : (
                  ""
                )}
              </ul>
              {user === null ? (
                <button
                  type="button"
                  class="btn btn-outline-light text-white "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Login
                </button>
              ) : (
                <>
                  <div class="d-flex text-white me-4">
                    {" "}
                    Welcome Back, {user.firstName}{" "}
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-light text-white "
                    onClick={() => logOut()}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </nav>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5 blue-text" id="exampleModalLabel">
                  Login
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="container">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>

                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input
                        type="password"
                        class="form-control"
                        id="exampleInputPassword1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="modal-footer justify-content-center"
                style={{ borderTop: "none" }}
              >
                <button
                  type="submit"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={(e) => loginUser(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Navbar