import React from "react";
import star from "../assets/star.png";
import trash from "../assets/trash.png";

const MealCard = ({
  week,
  selected,
  handleSelect,
  handleDelete,
  id,
  image,
  mealType,
  name,
  instructions,
  cuisine,
  rating,
}) => {
  return (
    <div
      style={{ cursor: week === 0 ? "pointer" : "default" }}
      onClick={handleSelect}
      className={`meal ${selected ? "active" : ""}`}
    >
      <div className="meal-img">
        <img src={image} alt="meal-img" />
        <p>{mealType}</p>
        {week > 0 && (
          <img
            onClick={() => handleDelete(id)}
            className="trash"
            src={trash}
            alt="trash"
          />
        )}
      </div>
      <p className="meal-title">{name}</p>
      <p className="meal-desc">{instructions}</p>
      <div className="other-detail">
        <p className="tags">
          Cuisine: <span>{cuisine}</span>
        </p>
        <div className="rating">
          <p className="tags">
            Rating: <span>{rating}</span>
          </p>
          <div className="stars">
            <img className="star" src={star} alt="star" />
            <img className="star" src={star} alt="star" />
            <img className="star" src={star} alt="star" />
            <img className="star" src={star} alt="star" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
