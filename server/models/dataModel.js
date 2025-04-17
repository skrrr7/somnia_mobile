import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    dayOfTheWeek: {type: String, required: true},
   
})

const dataModel = mongoose.models.data ||mongoose.model('data', dataSchema);

export default dataModel;