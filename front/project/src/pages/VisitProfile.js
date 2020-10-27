import React from "react";
import { useSelector } from "react-redux";
const VisitProfile = ({ history }) => {
  const visit = useSelector((state) => state.visit);
  return (
    <div>
      Welcome to {visit.artisan.f_name + " " + visit.artisan.l_name} 's Profile
    </div>
  );
};

export default VisitProfile;
