import React, { useEffect, useState } from "react";
import { loadClient } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Footer from "./Footer";
import sendMessageAction from "../actions/sendMessageAction";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (auth.isAuth || localStorage.getItem("token")) {
      // dispatch(loadClient());
      history.push("/profile");
    }
  });
  const [info, setinfo] = useState({});
  const handleChange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  };
  const sendMessage = (e) => {
    e.preventDefault();
    dispatch(sendMessageAction(info));
    alert.success("Message Sent Successfully!");
    setinfo({ f_name: "", l_name: "", email: "", mobile: "", message: "" });
  };
  return (
    <div>
      <div className="home_container">
        <div className="home_header">
          <div className="home1">
            <span>IT IS THE WORK WHICH GIVES THE MEASURE OF THE WORKER</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          <div className="container1">
            <div className="card1">
              <div className="imgBx" data-text="Why Snai3i?">
                <img src="/images/team.png" alt="img" />
              </div>
              <div className="content1">
                <div>
                  <h3>Why Snai3i ?</h3>
                  <ul>
                    <li>Want to put artistic touch in your home?</li>
                    <li>You need an artist?</li>
                    <li>You need a spesialist?</li>
                    <li>You need a good worker?</li>
                    <li>
                      Make your life easier and join us to reach artists or to
                      be the artist
                    </li>
                    <li>you deserve the best</li>
                    <li>We are all artists</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card1">
              <div className="imgBx" data-text="How it works?">
                <img src="/images/customer-support.png" alt="img" />
              </div>
              <div className="content1">
                <div>
                  <h3>How it works?</h3>
                  <ol>
                    <li>Create an account Artisan or Client</li>
                    <li>Artisans can share posts exposing their works</li>
                    <li>
                      Client send request to artisan in which set message and
                      date
                    </li>
                    <li>
                      Artisan respond by accepting or by send message to change
                      the date or by ignoring the request
                    </li>
                    <li>Clients can rate artisans</li>
                    <li>
                      Client can select his artisan by category and rate or by
                      name
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container_contact">
        <div>
          <h2>Contact Us</h2>
          <form onSubmit={sendMessage}>
            <div className="row100">
              <div className="col">
                <div className="inputBox">
                  <input
                    onChange={handleChange}
                    className="browser-default"
                    type="text"
                    name="f_name"
                    value={info.f_name}
                    required
                  />
                  <span className="text">First Name</span>
                  <span className="line"></span>
                </div>
              </div>
              <div className="col">
                <div className="inputBox">
                  <input
                    onChange={handleChange}
                    className="browser-default"
                    type="text"
                    name="l_name"
                    value={info.l_name}
                    required
                  />
                  <span className="text">Last Name</span>
                  <span className="line"></span>
                </div>
              </div>
              <div className="col">
                <div className="inputBox">
                  <input
                    onChange={handleChange}
                    className="browser-default"
                    type="email"
                    name="email"
                    value={info.email}
                    required
                  />
                  <span className="text">Email</span>
                  <span className="line"></span>
                </div>
              </div>
              <div className="col">
                <div className="inputBox">
                  <input
                    onChange={handleChange}
                    className="browser-default"
                    type="number"
                    name="mobile"
                    value={info.mobile}
                    required
                  />
                  <span className="text">Mobile</span>
                  <span className="line"></span>
                </div>
              </div>
            </div>
            <div className="row100">
              <div className="col">
                <div className="inputBox textArea">
                  <textarea
                    onChange={handleChange}
                    type="text"
                    name="message"
                    value={info.message}
                    required
                  />
                  <span className="text">Type Your Message Here...</span>
                  <span className="line"></span>
                </div>
              </div>
            </div>
            <div className="row100">
              <div className="col">
                <div className="inputBox">
                  <input type="submit" value="Send" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="photos_home">
        <img src="/images/home4.jpg" />
        <img src="/images/home5.jpg" />
        <img src="/images/home6.jpg" />
        <img src="/images/home7.jpg" />
        <img src="/images/home8.jpg" />
        <img src="/images/home2.jpg" />
      </div> */}

      <Footer />
    </div>
  );
};

export default Home;
