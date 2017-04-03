import Gituser from "../model/users";
import SearchQueries from "../model/searchQuery";
import callApi from "../utility/utility"
import _ from "lodash";
import http from "https";

export default class UserController{
  static showAll(req1, res1){
  	let userName = req1.query.q;
  	let pageNo = 1;
  	pageNo = req1.query.page;
    SearchQueries
  	 .findOne().where('stringQuery').equals(userName)
  	 .then(data => {
       if(data != null){
         let searchPage = data.noOfSearch;
         console.log(searchPage);
         if(searchPage <= pageNo)
         {
      	   callApi(userName, pageNo, res1);
         }
         else{
           Gituser
           .find({login: {$regex: userName}})
           .skip(30*(pageNo-1))
           .then(data => {
             let resultData = [];
             data.map(res =>{
               res = _.pick(res, 'login', 'url');
               resultData.push(res);
             })
             res1.send(resultData);
          })
         .catch(err => {
           res1.send(err);
          });
        }
      }
      else
      { 
        let insertValue = {stringQuery: userName, noOfSearch: 0};
        let add1 = new SearchQueries(insertValue);
        add1.save(function(err, dataobj){
          if(err)
            console.log(err);
          else{
            console.log(dataobj);
          }
        });
        callApi(userName, pageNo, res1);
      }
    
     

  })
  .catch(err => {
    console.log(err);
  });
    
 }

}