///////////////////////////////////////////////////
const express = require("express");
const router = express.Router();
const UserFoodSelection = require("../models/FoodSelection");
var date = new Date();


// POST route to handle food selections
router.post("/", async (req, res) => {
  const { userId, selectedDay, breakfast, lunch, dinner } = req.body;
  const breakfastArray = {} 
  console.log(breakfastArray)
  const lunchArray = {}
  console.log(lunchArray)
  const DinnerArray = {}
  console.log(DinnerArray)
  try {
    // Create a new instance of the UserFoodSelection model with the user's food selection data
    const foodSelection = new UserFoodSelection({
      userId,
      selectedDay,
      breakfast,
      lunch,
      dinner,
    });

    const MongoClient = require('mongodb').MongoClient;

    const uri = 'mongodb+srv://woxsenai:Ai%40l%40b2020@cluster0.yehbpjg.mongodb.net/';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    let db; // Declare a variable to hold the database instance

    async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('test'); // Replace with your database name
        console.log('Connected to database');
        const collection = db.collection('famus_items');
        let result = await collection.findOne({});
        currentDate = date.getFullYear()+ '/' + (date.getMonth() + 1)+ '/' + (date.getDate()-6)
        console.log(currentDate)
        if(currentDate >= result[selectedDay].Date){
          saveArray();
        }
    } catch (err) {
        console.error('Error connecting to database', err);
    }
    }
    date.setDate(17);
    var day = date.getDay();
    var ulday = {sunday:"",monday:"",tuesday:"",wednesday:"",thursday:"",friday:"",saturday:""}
    var q = 0;
    var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
    while(q <= 6){
      if(q == 0){
        var Datetoincri = 7 - day
        ulday[days[q]] = date.getFullYear()+ '/' + (date.getMonth() + 1)+ '/' + (date.getDate()+Datetoincri)
      }else if(day == q) {
        ulday[days[q]] = date.getFullYear()+ '/' + (date.getMonth() + 1)+ '/' + (date.getDate())

      }else if(q < day){
        ulday[days[q]] = date.getFullYear()+ '/' + (date.getMonth() + 1)+ '/' + (date.getDate() - (day-q))
      }else{
        ulday[days[q]] = date.getFullYear()+ '/' + (date.getMonth() + 1)+ '/' + (date.getDate() + (q-day))  
      }
      q++
    };
    console.log(ulday,day)
    async function saveArray() {
      try {
        const collection = db.collection('famus_items');
        await collection.updateOne(
              {},
              { $set: { [selectedDay]:{Date : ulday[selectedDay] , breakfast:{}, lunch:{}, Dinner:{} }} }
            );

        console.log('Array saved to database');
      } catch (err) {
        console.error('Error saving array', err);
      }
    }

    
    async function readAndValidateArray() {
      try {
        const collection = db.collection('famus_items');
        let result = await collection.findOne({});
          if (result && result[selectedDay]) {
            // const arrayFromDb_breakfast = seleted.breakfast;

            let modifiedArray = result[selectedDay]
            let i = 0
            let total_len = breakfast.length+1 + lunch.length+1 + dinner.length+1
            while(i < total_len){
              let m = 0
              while(m < breakfast.length){
                let result = modifiedArray.breakfast.hasOwnProperty(breakfast[m])
                if(result != true){
                  modifiedArray.breakfast[breakfast[m]] = 0
                };
                m = m+1
              };
              n = 0
              while(n < lunch.length){
                let result1 = modifiedArray.lunch.hasOwnProperty(lunch[n])
                if(result1 != true){
                  modifiedArray.lunch[lunch[n]] = 0
                };
                n = n+1
              };
              o = 0 
              while(o < dinner.length){
                let result2 = modifiedArray.Dinner.hasOwnProperty(dinner[o])
                if(result2 != true){
                  modifiedArray.Dinner[dinner[o]] = 0
                };
                o = o+1
              };
              
              if(breakfast[i] in modifiedArray.breakfast){
                modifiedArray.breakfast[breakfast[i]] = modifiedArray.breakfast[breakfast[i]]+1
                console.log("Breakfast Modified for :- ",breakfast[i])
              }
              if(lunch[i] in modifiedArray.lunch){
                modifiedArray.lunch[lunch[i]] = modifiedArray.lunch[lunch[i]]+1
                console.log("Lunch Modified for :- ",lunch[i])
              };
              if(dinner[i] in modifiedArray.Dinner){
                modifiedArray.Dinner[dinner[i]] ++
                console.log("Dinner Modified for :- ",dinner[i])
              };
              i++;
            };

            await collection.updateOne(
              {},
              { $set: { [selectedDay]: modifiedArray } }
            );
            var l = 0
    
            var famus_Items = []
            famus_Items.push(selectedDay)
            console.log(famus_Items)

          } else {
            console.log('Array not found in the database');
          }
      } catch (err) {
        console.error('Error reading and validating array', err);
      }
    }
    
    connectToDatabase()
      .then(() => {
      readAndValidateArray();
      })
      .catch(error => {
        console.error('Error connecting to database', error);
      });;
    
    // Save the food selection to the database
    await foodSelection.save();


    res.status(201).json({ message: "Food selection saved successfully" });
  } catch (error) {
    console.error("Error saving food selection:", error);
    res.status(500).json({ message: "Server error" });
  }
});




router.get("/userSelectedDays/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    console.log("Received userId:", userId);

    // Query the database to find all user selections with the matching userId
    const userSelections =  await UserFoodSelection.find({  userId });
    console.log("User selections:", userSelections);

    // Extract selected days from user selections
    const selectedDays = userSelections.map(selection => selection.selectedDay);

    console.log("Selected days:", selectedDays);

    res.status(200).json({ selectedDays });
  } catch (error) {
    console.error("Error fetching selected days:", error);
    res.status(500).json({ message: "Server error" });
  }

 
});


router.get("/userSelectedFood/:userId", async (req, res) => {
  try {
    const userId = req.params.userId; 

    
    const foodSelections = await UserFoodSelection.find({ userId });

   
    const selectedFoodByDay = {};

    
    foodSelections.forEach((selection) => {
      const { selectedDay, breakfast, lunch, dinner } = selection;

      if (!selectedFoodByDay[selectedDay]) {
        selectedFoodByDay[selectedDay] = [];
      }

      selectedFoodByDay[selectedDay].push({
        breakfast,
        lunch,
        dinner,
      });
    });

   
    res.json(selectedFoodByDay);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});








module.exports = router;
