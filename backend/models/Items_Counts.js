const mongoose = require("mongoose");

const Items_Counts_Schema = new mongoose.Schema({
    selectedDay : {
        type : String,
        required : true,
    },
    breakfastObj: {
        type: Object
    },
    lunchObj: {
        type: Object
    },
    dinnerObj: {
        type: Object
    }
});

const Item_counts = mongoose.model(
    'Items_counts',
    Items_Counts_Schema
);

module.exports = Item_counts;