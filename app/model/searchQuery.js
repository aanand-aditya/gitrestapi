import mongoose from 'mongoose';
import {connect} from "../../lib/connection"
let Schema = mongoose.Schema;

let querySchema = Schema({
  searchQuery: String,
  noOfSearch: Number
},
 
 {timestamps: true}

);

//userSchema.index({'login': 1, 'id': 1}, {unique: true});

export default mongoose.model("SearchQuery", userSchema);
