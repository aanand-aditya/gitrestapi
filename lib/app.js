import {Client} from 'node-rest-client';
import express from 'express';
import connect from './connection';
import initRoutes from '../app/routes';
import bodyParser from 'body-parser';

let client = new Client();
export default function start(){
  let app = express();
  app.use(bodyParser.json());
  connect(err => {
  	if(err) {
  	  console.log(err);
  	  return;
  	}
    initRoutes(app);
  	app.listen(3000, () => {
  	  console.log("Server started at port 3000");
    });
  })
}
