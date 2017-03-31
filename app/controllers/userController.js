import Gituser from "../model/users";
import SearchQuery from "../model/searchQuery";
import _ from "lodash";
import http from "https";

export default class UserController{
  static showAll(req, res){
  	let userName = req.query.q;
  	let pageNo = 1;
  	pageNo = req.query.page;
  	let q = SearchQuery
  	 .find().where(searchQuery).equals(userName)
  	 .then(data => {
  	 	console.log("executed");
  	 })
    if(q)
    {
      let query = SearchQuery
       .find().where(searchQuery).equals(userName)
       .then(data => {
          console.log("query executed");
        });
      let searchPage = query.noOfSearch;
      if(searchPage <= pageNo)
      {
      	callApi();
      }
      else{
      	Gituser
      	 .find().where(login).regex(/^)
      	//fetch data from database
      }
    }
    else{
      let options = {
        host: "api.github.com",
        path: '/search/users?q='+userName+'&page='+pageNo,
        headers: {
          'User-Agent': 'faltu app'
        }
      
       };

    console.log(options);
    let body = [];
    var req = http.get(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
      res.on('data', chunk => {
      	body.push(chunk);

      })
     .on('end',(data) => {
     	body = Buffer.concat(body).toString();
     	body = JSON.parse(body);
     	let result = body.items;
     	result.map(data => {
     		//
     		data = _.pick(data, 'login', 'url');
     		console.log(data);
     		let add = new Gituser(data);
            add.save(function(err, dataobj){
              if(err)
                console.log(err);
              else{
                console.log("data added");
              }
            });
     	});
     	
       
     })
   .on('error', e => {
      console.log(e);
    });
  });
    
  }
 }

}