import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ratingAction } from "../actions/clientActions";
import { getRateAction } from "../actions/clientActions";

const StarRating = () => {
  const visit = useSelector((state) => state.visit);
  // to get the rate of the client to the visited artisan if exist
  useEffect(() => {
    if (visit.artisan) dispatch(getRateAction(visit.artisan._id));
  }, [visit.artisan]);
  const dispatch = useDispatch();
  const rate_client = useSelector((state) => state.rate_client);
  const [rating, setrating] = useState(null);
  const [hover, sethover] = useState(null);
  useEffect(() => {
    if (rate_client.rate) setrating(rate_client.rate.value);
  }, [rate_client.rate]);
  return (
    <div style={{ textAlign: "left" }}>
      {[...Array(5)].map((star, i) => {
        let ratingValue = i + 1;
        return (
          <label key={i}>
            <input type="radio" name="rating" value={ratingValue} />
            <i
              className="fas fa-star"
              style={{
                fontSize: 27,
                color:
                  ratingValue <= rating
                    ? "#ffcc00"
                    : ratingValue <= hover
                    ? "#ffe680"
                    : "gray",
              }}
              onMouseEnter={(e) => sethover(ratingValue)}
              onMouseLeave={(e) => sethover(null)}
              onClick={(e) => {
                setrating(ratingValue);
                dispatch(
                  ratingAction({
                    rate: ratingValue,
                    id_artisan: visit.artisan._id,
                  })
                );
              }}
            ></i>
          </label>
        );
      })}
    </div>
  );
};
export default StarRating;
