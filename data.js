const csv=require("csv-parser")
const fs=require("fs")
const express = require("express")
const route = express.Router();

/**
 * @swagger
 * /salary:
 *  get:
 *      summary: get all the data from the csv file
 *      description: get all salary data
 *      tags: [menu]
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/SuccessResponse'
 *          default:
 *              description: Default response for this api
 */


var results=[]
route.get("/salary",(req,res) => {
    try{
        fs.createReadStream('salary_data.csv')
        .pipe(csv({}))
        .on('data',(data) => {
            results.push(data)
        })
        .on("end",()=>{
            res.send(results)
            console.log(results);
        })
    }
    catch(err){
        console.error(err.message);
        res.status(400).send("data not found,some is missing in the code")
    }
})

// const r=[]
// const ten=[]
// route.get("/salary/currency=USD",(req,res) => {
//     console.log(l);
//     try{
//         fs.createReadStream('salary_data.csv')
//         .pipe(csv({}))
//         .on('data',(data) => {
//             r.push(data)
//         })
//         .on("end",()=>{
//             for (var i=0;i<10;i++){
//                 if (r.`${Please indicate the currency[i]}`==req.query.currency){
//                     console.log(r);
//                     res.send(ten)
//                 }
//             }
//         })
//     }
//     catch(err){
//         console.error(err.message);
//         res.status(400).send("data not found,some is missing in the code")
//     }
// })


module.exports = route;