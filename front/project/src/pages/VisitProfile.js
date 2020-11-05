import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkRequest_client } from "../actions/clientActions";
import { artisanRatesAction } from "../actions/artisanRatesAction";
import StarRating from "./StarRating";
import { Rate } from "antd";

const VisitProfile = () => {
  const auth = useSelector((state) => state.auth);
  const visit = useSelector((state) => state.visit);
  const send_request = useSelector((state) => state.send_request);
  const request_client = useSelector((state) => state.request_client);
  const [testRequest, settestRequest] = useState(false);
  // To Check the requests of the connected client
  useEffect(() => {
    if (auth.isAuth && auth.user && auth.user.state === "Client") {
      dispatch(checkRequest_client());
    }
  }, [auth]);
  //To Check if there is a request with the visited artisan or not
  useEffect(() => {
    if (auth.isAuth && visit.artisan && request_client.requests) {
      settestRequest(
        request_client.requests.find(
          (el) =>
            el.id_artisan._id === visit.artisan._id &&
            (el.state === "Send Request" || el.state === "Respond Artisan")
        )
      );
    }
  }, [visit.artisan]);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleReturn = () => {
    history.goBack();
  };
  const handleContact = () => {
    auth.isAuth ? history.push("/contact") : history.push("/login");
  };
  // To get all the rate of the visited artisan
  useEffect(() => {
    if (visit.artisan) dispatch(artisanRatesAction(visit.artisan._id));
  }, [visit.artisan]);
  const rate_artisan = useSelector((state) => state.rate_artisan);
  return (
    <div>
      <button
        style={{ width: 90 }}
        className="waves-effect waves-light btn"
        onClick={handleReturn}
      >
        <i class="large material-icons">arrow_back</i>
      </button>
      {visit.artisan && (
        <div className="profile">
          <div className="containerInfo">
            {testRequest ||
            (send_request.request &&
              send_request.request.state == "Send Request" &&
              send_request.request.id_artisan === visit.artisan._id) ? (
              <button
                style={{ height: 60, marginBottom: 50 }}
                className="waves-effect waves-light btn"
                onClick={handleContact}
              >
                View Request
              </button>
            ) : (
              <button
                style={{ height: 60, marginBottom: 50 }}
                className="waves-effect waves-light btn"
                onClick={handleContact}
              >
                Contact {visit.artisan && visit.artisan.f_name}
              </button>
            )}
            <StarRating /> {/* your rating */}
            {/* The artisan's rate */}
            {rate_artisan.rate && (
              <Rate
                style={{
                  display: "flex",
                  flexDirection: "row",
                  color: "gray",
                  fontSize: 12,
                }}
                allowHalf
                disabled
                defaultValue={rate_artisan.rate.rate}
              />
            )}
            <ul>
              <li>
                <i class="small material-icons">account_circle</i>&nbsp;
                {visit.artisan.f_name + " " + visit.artisan.l_name}
              </li>
              <li>
                <i class="small material-icons">email</i>&nbsp;
                {visit.artisan.email}
              </li>
              {visit.artisan.category && (
                <li>
                  <i class="small material-icons">work</i>&nbsp;
                  {visit.artisan.category}
                </li>
              )}
              {visit.artisan.address && (
                <li>Address: {visit.artisan.address}</li>
              )}
              {visit.artisan.description && (
                <li> {visit.artisan.description}</li>
              )}
              {visit.artisan.age && <li>Age: {visit.artisan.age}</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisitProfile;
