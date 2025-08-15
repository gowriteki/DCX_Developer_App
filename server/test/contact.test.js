import request from "supertest"
import dotenv from "dotenv";
import supertest from "supertest";
import app from "../index.js";

 
dotenv.config();
 
const { reqaddContact, requpdateContact } = require("../utils/data/Contact.test.data.js");
 

let contactId =
//Create Product Test
describe("POST /contact/createContact", () => {
    test("should create a contacts", async () => {
        return request(app)
            .post("/contact/createContact")
            .expect(201)
            .then(({ body })=>{
                contactId = body.data.contactId
            })
 
    });
});
 
 


 
