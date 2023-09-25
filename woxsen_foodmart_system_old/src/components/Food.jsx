import React, { useState, useEffect } from "react";
import "./food.css";
import axios from "axios";

const FoodComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [savedMessage, setSavedMessage] = useState("");
  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedDays, setSelectedDays] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDay1, setSelectedDay1] = useState("");

  const [selectedBreakfastVarieties, setSelectedBreakfastVarieties] = useState(
    []
  );
  const [selectedLunchVarieties, setSelectedLunchVarieties] = useState([]);
  const [selectedDinnerVarieties, setSelectedDinnerVarieties] = useState([]);


  const calculateDateForDay = (day) => {
    const currentDate = new Date();
    const today = currentDate.getDay();
    const daysToAdd = day - today;
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    return currentDate.toDateString();
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
    setSubmitted(false);
    setSelectedBreakfastVarieties([]);
    setSelectedLunchVarieties([]);
    setSelectedDinnerVarieties([]);
    setSelectedMeal("breakfast");
    const selectedDay1 = event.target.value;
    setSelectedDay1(selectedDay1);

    // Map the selected day to a numerical value (e.g., Sunday to 0, Monday to 1)
    const dayMap = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    // Calculate the date based on the selected day
    const selectedDate = calculateDateForDay(dayMap[selectedDay1]);
    setSelectedDate(selectedDate);
  };

  const handleVarietyChange = (meal, variety) => {
    console.log("yes");
    switch (meal) {
      case "Breakfast Varieties":
        setSelectedBreakfastVarieties((prevSelectedVarieties) =>
          prevSelectedVarieties.includes(variety)
            ? prevSelectedVarieties.filter((v) => v !== variety)
            : [...prevSelectedVarieties, variety]
        );
        console.log(selectedBreakfastVarieties);
        break;
      case "Lunch Varieties":
        setSelectedLunchVarieties((prevSelectedVarieties) =>
          prevSelectedVarieties.includes(variety)
            ? prevSelectedVarieties.filter((v) => v !== variety)
            : [...prevSelectedVarieties, variety]
        );

        break;
      case "Dinner Varieties":
        console.log("dinner selected");
        setSelectedDinnerVarieties((prevSelectedVarieties) =>
          prevSelectedVarieties.includes(variety)
            ? prevSelectedVarieties.filter((v) => v !== variety)
            : [...prevSelectedVarieties, variety]
        );

        break;
      default:
        break;
    }
  };

  const handleFoodSelection = async () => {
    try {
      // Retrieve the user ID from local storage or state variable
      const userId = localStorage.getItem("userId");
      if (!userId) {
        // Handle the case where the user ID is missing
        console.error("User ID missing.");
        return;
      }
      console.log(selectedDays);
      if (selectedDays.includes(selectedDay)) {
        console.error("You have already selected food for this day.");
        return;
      }
      const data = {
        userId,
        selectedDay,
        breakfast: selectedBreakfastVarieties,
        lunch: selectedLunchVarieties,
        dinner: selectedDinnerVarieties,
      };

      console.log(data);

      const response = await axios.post(
        "http://localhost:5000/foodselection",
        data
      );
      // setSelectedVarieties({});

      setSelectedDays((prevSelectedDays) => [...prevSelectedDays, selectedDay]);
      setSavedMessage(
        "Food saved successfully! Go to next day and select food"
      );
    } catch (error) {
      console.error("Error saving food selection:", error);
    }
    setSubmitted(true);
  };
  useEffect(() => {
    const today = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const selectedDate = formatter.format(today);
    setSelectedDate(selectedDate);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID missing.");
      return;
    }

    axios
      .get(`http://localhost:5000/foodselection/userSelectedDays/${userId}`)
      .then((response) => {
        setSelectedDays(response.data.selectedDays);
      })
      .catch((error) => {
        console.error("Error fetching selected days:", error);
      });
  }, []);

  const getMealDescription = () => {
    const mealDescriptions = {
      monday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                {
                  name: "Boiled Eggs&Omelette",
                },
                {
                  name: "Bread/Jam/Butter/corn Flacks",
                },
                {
                  name: "Idly/wada/Sprouts",
                },
                {
                  name: "Tea/Coffee/Milk/Black tea",
                },
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Corn Pulao",
                },
                {
                  name: "Moong Dal",
                },
                {
                  name: "Mix veg",
                },
                {
                  name: "Egg Burji",
                },
                {
                  name: "Chapathi",
                },
                {
                  name: "fruit Custurd",
                },
                {
                  name: "Lemon Juice",
                },
                {
                  name: "Green salad",
                },
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Dal Tadka",
                },
                {
                  name: "Chole",
                },
                {
                  name: "Gobi Mutter Dry",
                },
                {
                  name: "Veg Biryani",
                },
                {
                  name: "Curd",
                },
                {
                  name: "Banana",
                },
              ],
            },
          ],
        },
      },
      tuesday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                {
                  name: "Boiled Eggs&Omelette",
                },
                {
                  name: "Bread/Jam/Butter/corn Flacks",
                },
                {
                  name: "Bonda/Poha/Sprouts",
                },
                {
                  name: "Tea/Coffee/Milk/Black tea",
                },
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Lemon Rice",
                },
                {
                  name: "Dal Pakhoni",
                },
                {
                  name: "Beerakaya Alu",
                },
                {
                  name: "Gobi Tomato Dum",
                },
                {
                  name: "Chapathi",
                },
                {
                  name: "mal Pua",
                },
                {
                  name: "Rasna",
                },
                {
                  name: "Rasam",
                },
                {
                  name: "Vegetable Chatney",
                },
                {
                  name: "Green salad",
                },
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Palak Dal",
                },
                {
                  name: "Veg Kofta",
                },
                {
                  name: "bhendi dum fry",
                },
                {
                  name: "Sabudana Kichidi",
                },
                {
                  name: "Chapathi",
                },
                {
                  name: "Banana",
                },
              ],
            },
          ],
        },
      },
      wednesday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                {
                  name: "Boiled Eggs&Omelette",
                },
                {
                  name: "Bread/Jam/Butter/corn Flacks",
                },
                {
                  name: "utapam/sprouts",
                },
                {
                  name: "Tea/Coffee/Milk/Black tea",
                },
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Bagara Rice",
                },
                {
                  name: "Methi dal",
                },
                {
                  name: "Paneer Butter Masala",
                },
                {
                  name: "Achari chicken",
                },
                {
                  name: "Masala Roti",
                },
                {
                  name: "suji Ka Halwa",
                },
                {
                  name: "Butter Milk",
                },

                {
                  name: "Green Salad",
                },
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Tomato Dal",
                },
                {
                  name: "mashroom Capsicum",
                },
                {
                  name: "Crispy Veg",
                },
                {
                  name: "Tomato Onion Curry",
                },
                {
                  name: "Chapathi",
                },
                {
                  name: "Banana",
                },
              ],
            },
          ],
        },
      },
      thursday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                {
                  name: "Boiled Eggs&Omelette",
                },
                {
                  name: "Bread/Jam/Butter/corn Flacks",
                },
                {
                  name: "Puri/Sushila/Sprouts",
                },
                {
                  name: "Tea/Coffee/Milk/Black tea",
                },
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Veg Pulao",
                },
                {
                  name: "Kadi Pakoda",
                },
                {
                  name: "jeera Alu",
                },
                {
                  name: "Rajma Masala",
                },
                {
                  name: "Chapathi",
                },
                {
                  name: "Besan Barfi",
                },
                {
                  name: "Mango Juice",
                },
                {
                  name: "Dal thadka",
                },
                {
                  name: "Vegetable Chatney",
                },
                {
                  name: "Green salad",
                },
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Masoor Dal",
                },
                {
                  name: "Noodles",
                },
                {
                  name: "fried Rice",
                },
                {
                  name: "egg Fried rice",
                },
                {
                  name: "Curd Rice",
                },
                {
                  name: "Chiily Gobi",
                },
                {
                  name: "Curd",
                },
                {
                  name: "Banana",
                },
              ],
            },
          ],
        },
      },
      friday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                {
                  name: "Boiled Eggs&Omelette",
                },
                {
                  name: "Bread/Jam/Butter/corn Flacks",
                },
                {
                  name: "Idly/wada/sprouts",
                },
                {
                  name: "Tea/Coffee/Milk/Black tea",
                },
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Chicken Biryani",
                },
                {
                  name: "Veg Biryani",
                },
                {
                  name: "Rhaita",
                },
                {
                  name: "Mirchi ka Salan",
                },
                {
                  name: "Sahi Turka",
                },
                {
                  name: "Rooh afza",
                },
                {
                  name: "Curd rice Or Dal kichidi",
                },
                {
                  name: "Green salad",
                },
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Dal Lasoni",
                },
                {
                  name: "Palak Paneer",
                },
                {
                  name: "Mirchi Bhajji",
                },
                {
                  name: "Alu tomato curry",
                },
                {
                  name: "Chapathi",
                },
                {
                  name: "Curd",
                },
                {
                  name: "Banana",
                },
              ],
            },
          ],
        },
      },
      saturday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                {
                  name: "Boiled Eggs&Omelette",
                },
                {
                  name: "Bread/Jam/Butter/corn Flacks",
                },
                {
                  name: "Dosa/Sprouts",
                },
                {
                  name: "Tea/Coffee/Milk/Black tea",
                },
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Besi bole Baat",
                },
                {
                  name: "Green moong dal",
                },
                {
                  name: "Gobi Matter",
                },
                {
                  name: "Bendi Tomato",
                },
                {
                  name: "Chapathi",
                },
                {
                  name: "Bondi Ladduu",
                },
                {
                  name: "Lemon Juice",
                },
                {
                  name: "Vegetable Chatney",
                },
                {
                  name: "Green Salad",
                },
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Methi Dal",
                },
                {
                  name: "Alu dum",
                },
                {
                  name: "Eggs Burji",
                },
                {
                  name: "Chapathi",
                },
                {
                  name: "Veg Soup",
                },
                {
                  name: "Curd",
                },
                {
                  name: "water Melon",
                },
              ],
            },
          ],
        },
      },
      sunday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                {
                  name: "Boiled Eggs&Omelette",
                },
                {
                  name: "Bread/Jam/Butter/corn Flacks",
                },
                {
                  name: "Alu Paratha",
                },
                {
                  name: "Tea/Coffee/Milk/Black tea",
                },
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Zeera Rice",
                },
                {
                  name: "Dlacha",
                },
                {
                  name: "Rogani Chicken",
                },
                {
                  name: "Paneer Kurchan",
                },
                {
                  name: "Butter Naan",
                },
                {
                  name: "Butter Milk",
                },
                {
                  name: "Rice Kheer",
                },
                {
                  name: "Green Salad",
                },
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                {
                  name: "Plain Rice",
                },
                {
                  name: "Dal",
                },
                {
                  name: "Chole bhatora",
                },
                {
                  name: "Manchurian wet",
                },
                {
                  name: "maggi or kichidi Katta",
                },
                {
                  name: "Soup Veg/Non veg",
                },
                {
                  name: "Banana",
                },
              ],
            },
          ],
        },
      },

      // Add descriptions for other days...
    };

    return mealDescriptions[selectedDay][selectedMeal];
  };

  const mealDescription = getMealDescription();

  return (
    <section id="food" className="food">
      <h2 className="head">Food Menu</h2>
      {/* Add the dropdown list */}
      <div className="selected-date">
        {selectedDate && <p>Selected Date: {selectedDate}</p>}
      </div>
      <div className="day-dropdown">
        <label htmlFor="day">Select a day:</label>
        <select
          id="day"
          name="day"
          value={selectedDay}
          onChange={handleDayChange}
        >
          <option value="monday" disabled={selectedDays.includes("monday")}>
            Monday
          </option>
          <option value="tuesday" disabled={selectedDays.includes("tuesday")}>
            Tuesday
          </option>
          <option
            value="wednesday"
            disabled={selectedDays.includes("wednesday")}
          >
            Wednesday
          </option>
          <option value="thursday" disabled={selectedDays.includes("thursday")}>
            Thursday
          </option>
          <option value="friday" disabled={selectedDays.includes("friday")}>
            Friday
          </option>
          <option value="saturday" disabled={selectedDays.includes("saturday")}>
            Saturday
          </option>
          <option value="sunday" disabled={selectedDays.includes("sunday")}>
            Sunday
          </option>
          {/* Add options for other days */}
        </select>
      </div>

      <div className="food__buttons">
        <button
          className={selectedMeal === "breakfast" ? "active" : ""}
          onClick={() => setSelectedMeal("breakfast")}
        >
          Breakfast
        </button>
        <button
          className={selectedMeal === "lunch" ? "active" : ""}
          onClick={() => setSelectedMeal("lunch")}
        >
          Lunch
        </button>
        <button
          className={selectedMeal === "dinner" ? "active" : ""}
          onClick={() => setSelectedMeal("dinner")}
        >
          Dinner
        </button>
      </div>

      {submitted ? (
        <div className="success-message">
          <p>{savedMessage}</p>
        </div>
      ) : (
        <div className="food-description">
          {selectedMeal === "breakfast" && (
            <div>
              <div className="meal-cards">
                {mealDescription.meals.map((meal, index) => (
                  <div
                    className={`meal-card ${
                      selectedMeal === "breakfast" ? "active" : ""
                    }`}
                    key={index}
                  >
                    <div className="meal-card__info">
                      <h4>{meal.name}</h4>

                      {/* Modify the condition to show buttons for all meals */}
                      {meal.options && meal.options.length > 0 && (
                        <div className="options-buttons">
                          <h5
                            style={{ color: "GrayText", marginBottom: "5px" }}
                          >
                            Choose among them
                          </h5>
                          {meal.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              className={`option-button ${
                                selectedBreakfastVarieties.includes(option.name)
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleVarietyChange(meal.name, option.name)
                              }
                            >
                              {option.name}
                            </button>
                          ))}
                        </div>
                      )}

                      {selectedMeal !== "breakfast" &&
                        (!meal.options || meal.options.length === 0) && (
                          <p>{meal.description}</p>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              <button className="next" onClick={() => setSelectedMeal("lunch")}>
                Next
              </button>
            </div>
          )}

          {selectedMeal === "lunch" && (
            <div>
              <div className="meal-cards">
                {mealDescription.meals.map((meal, index) => (
                  <div
                    className={`meal-card ${
                      selectedMeal === "breakfast" ? "active" : ""
                    }`}
                    key={index}
                  >
                    <div className="meal-card__info">
                      <h4>{meal.name}</h4>

                      {/* Modify the condition to show buttons for all meals */}
                      {meal.options && meal.options.length > 0 && (
                        <div className="options-buttons">
                          <h5
                            style={{ color: "GrayText", marginBottom: "5px" }}
                          >
                            Choose among them
                          </h5>
                          {meal.options.map((option, optionIndex) => (
                            <button
                              key={optionIndex}
                              className={`option-button ${
                                selectedLunchVarieties.includes(option.name)
                                  ? "active"
                                  : ""
                              }`}
                              onClick={() =>
                                handleVarietyChange(meal.name, option.name)
                              }
                            >
                              {option.name}
                            </button>
                          ))}
                        </div>
                      )}

                      {selectedMeal !== "breakfast" &&
                        (!meal.options || meal.options.length === 0) && (
                          <p>{meal.description}</p>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              {/* ... (Existing lunch meal options code) */}
              <button
                className="next"
                onClick={() => setSelectedMeal("dinner")}
              >
                Next
              </button>
            </div>
          )}
          {selectedDays.includes(selectedDay) ? (
            <p>Already selected for this day</p>
          ) : (
            <>
              {selectedMeal === "dinner" && (
                <div>
                  <div className="meal-cards">
                    {mealDescription.meals.map((meal, index) => (
                      <div
                        className={`meal-card ${
                          selectedMeal === "breakfast" ? "active" : ""
                        }`}
                        key={index}
                      >
                        <div className="meal-card__info">
                          <h4>{meal.name}</h4>

                          {/* Modify the condition to show buttons for all meals */}
                          {meal.options && meal.options.length > 0 && (
                            <div className="options-buttons">
                              <h5
                                style={{
                                  color: "GrayText",
                                  marginBottom: "5px",
                                }}
                              >
                                Choose among them
                              </h5>
                              {meal.options.map((option, optionIndex) => (
                                <button
                                  key={optionIndex}
                                  className={`option-button ${
                                    selectedDinnerVarieties.includes(
                                      option.name
                                    )
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    console.log(meal.name, option.name);
                                    console.log(selectedDinnerVarieties);
                                    handleVarietyChange(meal.name, option.name);
                                  }}
                                >
                                  {option.name}
                                </button>
                              ))}
                            </div>
                          )}

                          {selectedMeal !== "breakfast" &&
                            (!meal.options || meal.options.length === 0) && (
                              <p>{meal.description}</p>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="submit" onClick={handleFoodSelection}>
                    Submit
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default FoodComponent;
