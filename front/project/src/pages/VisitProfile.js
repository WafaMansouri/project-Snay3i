import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkRequest_client } from "../actions/clientActions";
const VisitProfile = () => {
  const auth = useSelector((state) => state.auth);
  const visit = useSelector((state) => state.visit);
  const request_client = useSelector((state) => state.request_client);

  //To Check if there is a request with the visited artisan or not
  useEffect(() => {
    if (auth.isAuth && visit.artisan._id) {
      dispatch(checkRequest_client(visit.artisan._id));
    }
  }, [visit.artisan]);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleReturn = () => {
    history.goBack();
  };
  const handleContact = () => {
    history.push("/contact");
  };

  return (
    <div>
      <button onClick={handleReturn}>Return</button>
      Welcome to {visit.artisan.f_name + " " + visit.artisan.l_name} 's Profile
      {request_client.requests &&
      request_client.requests.state == "Send Request" ? (
        <button onClick={handleContact}>View Demande</button>
      ) : (
        <button onClick={handleContact}>
          Click to Contact {visit.artisan.f_name}
        </button>
      )}
    </div>
  );
};

export default VisitProfile;
