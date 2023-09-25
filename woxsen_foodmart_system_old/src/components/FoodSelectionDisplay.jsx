import React, { useEffect, useState } from "react";
import axios from "axios";
import "./foodselectiondisplay.css";

const FoodSelectionDisplay = () => {
  const [selectedFood, setSelectedFood] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    
    axios.get(`http://localhost:5000/foodselection/userSelectedFood/${userId}`).then((response) => {
      setSelectedFood(response.data);
    });
  }, [userId]);

  return (
    <div className="food-selection">
      <h2>Selected Food for Each Day</h2>
      <div className="food-list">
        {Object.entries(selectedFood).map(([day, foodSelections]) => (
          <div className="food-item" key={day}>
            <span className="day">{day}:</span>{" "}
            {foodSelections.map((food, index) => (
              <div key={index}>
                <div>Breakfast: {food.breakfast}</div>
                <div>Lunch: {food.lunch}</div>
                <div>Dinner: {food.dinner}</div>
                <hr />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSelectionDisplay;
