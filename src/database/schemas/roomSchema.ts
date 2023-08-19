const mongoose = require('mongoose');

const Schema = mongoose.Schema;
export const roomSchema = Schema({
  name: {type: String, required: true},
  seating_capacity: {type: Number, required: true},
});
