import Gituser from "../model/users";
import SearchQueries from "../model/searchQuery";
import _ from "lodash";
import http from "https";

export default function callApi(userName, pageNo, res1){
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
      
    SearchQueries.update({stringQuery: userName}, { $inc : { noOfSearch: 1 } },(err,doc) => {
      if(err)
        console.log(err);
      else{
        console.log("value has been incremented");
      }

    });

    body = Buffer.concat(body).toString();
    body = JSON.parse(body);
    let result = body.items;
    result.map(data => {
     	data = _.pick(data, 'login', 'url');
     	let add = new Gituser(data);
      add.save(function(err, dataobj){
        if(err)
          console.log(err);
        else{
          console.log(dataobj);        
        }
      });

  	});

    res1.send(result);
     	 
       
  })

   
  .on('error', e => {
      console.log(e);
    });

 });
  
}