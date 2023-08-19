const mongoose = require('mongoose');
const {ROOM, USER} = require('../constants');
const Schema = mongoose.Schema;
export const bookingSchema = Schema({
  purpose: {type: String, required: true},
  date: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: USER},
  room: {type: Schema.Types.ObjectId, ref: ROOM},
  slots: {type: [Number]}
});

