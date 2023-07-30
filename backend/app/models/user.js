
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: false
  },
 
})

const user = mongoose.model('list', userSchema);
export default user;

