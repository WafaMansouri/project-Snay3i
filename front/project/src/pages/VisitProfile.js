import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkRequest_client } from "../actions/clientActions";
import { artisanRatesAction } from "../actions/artisanRatesAction";
import StarRating from "./StarRating";
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
      {rate_artisan.rate && (
        <i className="far fa-star" style={{ fontSize: 50 }}>
          {rate_artisan.rate.rate.toFixed(1)}
        </i>
      )}
      <StarRating />
      <button onClick={handleReturn}>Return</button>
      Welcome to{" "}
      {visit.artisan && visit.artisan.f_name + " " + visit.artisan.l_name} 's
      Profile
      {testRequest ||
      (send_request.request &&
        send_request.request.state == "Send Request" &&
        send_request.request.id_artisan === visit.artisan._id) ? (
        <button onClick={handleContact}>View Demande</button>
      ) : (
        <button onClick={handleContact}>
          Click to Contact {visit.artisan && visit.artisan.f_name}
        </button>
      )}
    </div>
  );
};

export default VisitProfile;
