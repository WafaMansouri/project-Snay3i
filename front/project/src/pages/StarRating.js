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
    <div>
      <div style={{ textAlign: "center" }}>
        {[...Array(5)].map((star, i) => {
          let ratingValue = i + 1;
          return (
            <label key={i}>
              <input type="radio" name="rating" value={ratingValue} />
              <i
                className="fas fa-star"
                style={{
                  color:
                    ratingValue <= rating
                      ? "rgb(241, 241, 9)"
                      : ratingValue <= hover
                      ? "rgb(241, 241, 9)"
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
      <h5 className="message_rate">
        {rating === 1
          ? " Not at all satisfied"
          : rating === 2
          ? "Slightly satisfied"
          : rating === 3
          ? "Neutral"
          : rating === 4
          ? "Satisfied"
          : rating === 5
          ? "Very satisfied"
          : "You can make a rate"}
      </h5>
      <i class="material-icons" style={{ fontSize: "3em", color: "#232F3E" }}>
        {rating === 1
          ? " sentiment_very_dissatisfied"
          : rating === 2
          ? "sentiment_dissatisfied"
          : rating === 3
          ? "sentiment_neutral"
          : rating === 4
          ? "sentiment_satisfied"
          : rating === 5 && "sentiment_very_satisfied"}
      </i>
    </div>
  );
};
export default StarRating;
