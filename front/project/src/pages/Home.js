import React, { useEffect } from "react";
import { loadClient } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ScrollAnimation from "react-animate-on-scroll";
import Footer from "./Footer";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (auth.isAuth || localStorage.getItem("token")) {
      dispatch(loadClient());
      history.push("/profile");
    }
  });
  return (
    <div>
      <div className="home_container">
        <div className="home_header">
          <div className="home1">
            {/* We are all workers, all artisans, each in his field, we all complete each other
        Good worker uses all tools */}
            <span style={{ width: "70%" }}>
              IT IS THE WORK WHICH GIVES THE MEASURE OF THE WORKER
            </span>
          </div>
        </div>
        {/* <div className="why_snai3i">
            <ScrollAnimation animateIn="bounce" initiallyVisible={true}>
              <h1 style={{ color: "rgb(60,118,96)" }}>Why SNAY3I ?</h1>
            </ScrollAnimation>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ marginRight: 80 }} className="oval">
                Want to fix something
              </div>
              <div className="oval">
                Want to put artistic touch in your home?
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <div className="oval">You need an artist?</div>
                <div className="oval">You need a spesialist?</div>
              </div>
              <div>
                <img src="/images/search2.jpg" alt="" width="250px" />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <div className="oval">you deserve the best</div>
                <div className="oval">We are all artists</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ marginRight: 80 }} className="oval">
                Make your life easier and join us to reach artists or to be the
                artist
              </div>
              <div className="oval">You need a good worker?</div>
            </div>
          </div> */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            // backgroundColor: "#222",
            minHeight: "100vh",
          }}
        >
          <div className="container1">
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
            <div className="card1">
              <div className="imgBx" data-text="Why Snai3i?">
                <img src="/images/team.png" alt="img" />
              </div>
              <div className="content1">
                <div>
                  <h3>Why Snai3i?</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                    quam provident deserunt incidunt consequatur a
                    exercitationem ab dolor aliquid quae, reprehenderit beatae
                    est illum repudiandae tenetur laborum quod! Ullam,
                    molestias?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container_how_it_work">
            <ScrollAnimation animateIn="bounce" initiallyVisible={true}>
              <h1 style={{ color: "rgb(60,118,96)" }}>How does it work ?</h1>
            </ScrollAnimation>
            <div className="how_it_work">
              <div className="cadreNumber">1</div>
              <div>Create an account Artisan or Client</div>
            </div>
            <div className="how_it_work">
              <div className="cadreNumber">2</div>
              <div>Artisans can share posts exposing their works</div>
            </div>
            <div className="how_it_work">
              <div className="cadreNumber">3</div>
              <div>
                Client send request to artisan in which set message and date{" "}
              </div>
            </div>
            <div className="how_it_work">
              <div className="cadreNumber">4</div>
              <div>
                Artisan respond by accepting or by send message to change the
                date or by ignoring the request
              </div>
            </div>
            <div className="how_it_work">
              <div className="cadreNumber">5</div>
              <div>Clients can rate artisans</div>
            </div>
            <div className="how_it_work">
              <div className="cadreNumber">6</div>
              <div>
                Client can select his artisan by category and rate or by name
              </div>
            </div>
          </div> */}
      <div className="photos_home">
        <img src="/images/home4.jpg" />
        <img src="/images/home5.jpg" />
        <img src="/images/home6.jpg" />
        <img src="/images/home7.jpg" />
        <img src="/images/home8.jpg" />
        <img src="/images/home2.jpg" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
