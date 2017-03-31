import mongoose from 'mongoose';
import {connect} from "../../lib/connection"
let Schema = mongoose.Schema;

let userSchema = Schema({
  login: String,
  url: String
},
 
 {timestamps: true}

);

//userSchema.index({'login': 1, 'id': 1}, {unique: true});

export default mongoose.model("Gituser", userSchema);
