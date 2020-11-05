import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const AddPhoto = () => {
  const [display, setdisplay] = useState(true);
  const history = useHistory();

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
          <form>
            <label>ADD IMAGE</label>
            <input className="browser-default" type="file" name="photo" />
            <button className="waves-effect waves-light btn" type="submit">
              ADD
            </button>
          </form>
        </div>
      </div>
    )
  );
};
export default AddPhoto;
