import React, { useState } from "react";
import "../ContactModal.css";
import { useDispatch, useSelector } from "react-redux";
import { respondAction } from "../actions/artisanActions";
import { useHistory } from "react-router-dom";
function ArtisanResponse({ match }) {
  const [display, setdisplay] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const [response, setresponse] = useState({
    id_client: match.params.id_client,
    msg_artisan: "",
  });
  const handleChange = (e) => {
    setresponse({ ...response, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(respondAction(response));
    setdisplay(false);
    history.goBack();
  };
  return (
    display && (
      <div className={"modal-wrapper"}>
        <div
          className={"modal-backdrop"}
          onClick={() => {
            setdisplay(false);
            history.goBack();
          }}
        />
        <div className={"modal-box"}>
          <form action="" onSubmit={handleSubmit}>
            <textarea
              onChange={handleChange}
              name="msg_artisan"
              cols="20"
              rows="10"
              placeholder="Write your response here"
            ></textarea>
            <button type="submit">SEND</button>
          </form>
        </div>
      </div>
    )
  );
}

export default ArtisanResponse;
