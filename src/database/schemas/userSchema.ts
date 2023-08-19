var mongoose = require("mongoose");
const {USER} = require('../constants');

const Schema = mongoose.Schema;
export const userSchema = Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
});

