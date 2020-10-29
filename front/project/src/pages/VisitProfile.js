import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkRequest } from "../actions/clientActions";
const VisitProfile = () => {
  const auth = useSelector((state) => state.auth);
  const visit = useSelector((state) => state.visit);
  // const [testRequest, settestRequest] = useState(null);
  const request = useSelector((state) => state.request);

  //To Check if there is a request with the viseited artisan or not
  useEffect(() => {
    if (auth.isAuth && visit.artisan._id) {
      // console.log(visit.artisan._id);
      dispatch(checkRequest(visit.artisan._id));
    }
  }, [visit.artisan]);
  // useEffect(() => {
  //   if (request.requests) {
  //     settestRequest(request.requests.state);
  //     console.log(testRequest);
  //   }
  // }, [request.requests]);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleReturn = () => {
    history.goBack();
  };
  const handleContact = () => {
    history.push("/contact");
  };

  return (
    // request.requests && (
    <div>
      <button onClick={handleReturn}>Return</button>
      Welcome to {visit.artisan.f_name + " " + visit.artisan.l_name} 's Profile
      {request.requests && request.requests.state == "Send Request" ? (
        <button onClick={handleContact}>View Demande</button>
      ) : (
        <button onClick={handleContact}>
          Click to Contact {visit.artisan.f_name}
        </button>
      )}
    </div>
    // )
  );
};

export default VisitProfile;
