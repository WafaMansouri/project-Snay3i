import React from "react";

export const AddPhoto = () => {
  return (
    <div className="container">
      <h1>PHOTO UPLOAD</h1>
      {/* <%= typeof msg!= "undefined"? msg:""%> */}
      <form action="/profile/" method="POST" enctype="multipart/form-data">
        <div className="file-field input-field">
          <div className="btn grey">
            <span>File</span>
            <input name="profileImage" type="file" />
          </div>
          <div class="file-path-wrapper">
            <input class="file-path validate" type="text" />
          </div>
        </div>
        <button type="submit" class="btn">
          UPLOAD
        </button>
      </form>
    </div>
  );
};
export default AddPhoto;
