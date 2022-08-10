const express = require('express');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const path = require('path');
const cors = require('cors');
const app = express();


/**
 * @swagger
 * components:
 *  schemas:
 *      SuccessResponse:
 *          type: object
 *          properties:
 *              success:
 *                  type: boolean
 *              msg:
 *                  type: string
 *                  default: ''
 *              data:
 *                  type: object
 *      ErrorResponse:
 *          type: object
 *          properties:
 *              success:
 *                  type: boolean
 *              msg:
 *                  type: string
 *              errors:
 *                  type: object
 */

 const specs = swaggerJsDoc({
     definition: {
         openapi : "3.0.0",
         info: {
             title: "Eats Mobile API",
             version: "1.0.0",
             description: "Eats Mobile api"
         },
         components: {
             securitySchemes:{
                 bearerAuth: {
                     type: "http",
                     scheme: "bearer",
                     bearerFormat: "JWT"
                 }
             }
         },
         security: [
             {
                 bearerAuth: []
             }
         ],
         servers: [
             {
                 url: "http://localhost:" + 3009,
                 description: 'Dev Server'
             },
             {
                 url: "https://m.app-stage.a2deats.com",
                 description: 'Staging Server'
             },
             {
                 url: "https://m.app-prod.a2deats.com",
                 description: 'Production Server'
             }
         ],
     },
     apis: [
         "./data.js"
     ]
 });
 
 

 
 //parse raw json data
 app.use(express.json({extended:false}));
 
 
 // parse form data
 app.use(express.urlencoded({ extended: true }));
 
 //allow cors
 app.use(cors());
 
 //console out all the apis request
 
 
 //setup swagger UI
 if(process.env.IS_PROD !== '1') {
     app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
 }

app.use("/",require("./data.js"))

const port = process.env.PORT || 3009

app.listen(port, () => {
    console.log(`Server is running on this port no ${port}`);
});
