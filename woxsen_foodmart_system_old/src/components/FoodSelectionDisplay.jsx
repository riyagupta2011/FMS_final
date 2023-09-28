// FoodSelectionDisplay.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./foodselectiondisplay.css"; // Import your CSS file

const FoodSelectionDisplay = () => {
  const [selectedFood, setSelectedFood] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(`http://localhost:5000/foodselection/userSelectedFood/${userId}`)
      .then((response) => {
        setSelectedFood(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);

  return (
    <section className="food-selection" id="food-selection">
      <h2>Selected Food for Each Day</h2>
      {Object.keys(selectedFood).length === 0 ? (
        <p>No data available</p>
      ) : (
        <table className="food-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedFood).map(([day, foodSelections]) => (
              <tr className="food-item" key={day}>
                <td className="day">{day.toUpperCase()}</td>
                {foodSelections.map((food, index) => (
              <>
                <td>{food.breakfast}</td>
                <td>{food.lunch}</td>
                <td>{food.dinner}</td>
                </> 
              
            ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default FoodSelectionDisplay;
