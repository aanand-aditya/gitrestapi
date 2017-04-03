import mongoose from 'mongoose';
import {connect} from "../../lib/connection"
let Schema = mongoose.Schema;

let userSchema = Schema({
  login: String,
  url: String
},
 
 {timestamps: true}

);

export default mongoose.model("Gituser", userSchema);
