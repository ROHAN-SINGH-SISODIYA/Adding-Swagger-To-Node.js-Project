"use strict";
// Node Modules
const express = require("express");
const router = express.Router();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// App Modules
const User = require("../Models/User");
const Admin = require("../Models/Admin");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * path:
 *  /users/:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router.post("/users", (req, res) => {
  const { email, name } = req.body;
  console.log(req.body);
  if(name!='Rohan')
  {
    const user = new User(name, email);
    res.json(user);
  }
  else{
    res.json({message:"Wrong User"});
  }  
});

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Admin management
 */

/**
 * @swagger
 * path:
 *  /admins/:
 *    post:
 *      summary: Create a new Admin
 *      tags: [Admins]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Admin'
 *      responses:
 *        "200":
 *          description: A Admin schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Admin'
 */
router.post("/admins", (req, res) => {
  const { email, name ,password } = req.body;
  console.log(req.body);
  if(password==='12345')
  {
    const user = new User(name, email,password);
    res.json(user);
  }
  else{
    res.json({message:"Wrong Admin Password"});
  }
});


/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *        example:
 *           name: Rohan
 *           email: fake1@email.com
 */
router.get("/users", (req, res, next) => {
  const userOne = new User("Rohan", "fake@gmail.com");
  const userTwo = new User("Sonu", "fakeagain@gmail.com");
  res.json({ userOne, userTwo });
});


/**
 * @swagger
 *  components:
 *    schemas:
 *      Admin:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          password:
 *            type: string
 *            format: password
 *        example:
 *           name: Rohan Rajput
 *           email: rohan@email.com
 *           password: "12345"
 */
router.get("/admin", (req, res, next) => {
  const userOne = new Admin("Rohan Rajput", "rohan@gmail.com","12345");
  const userTwo = new Admin("Sonu", "sonu@gmail.com","12345");
  res.json({ userOne, userTwo });
});



// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Time to document that Express API you built",
      version: "1.0.0",
      description:
        "A test project to understand how easy it is to document and Express API",
      license: {
        name: "MIT",
        url: ""
      },
      contact: {
        name: "Swagger",
        url: "https://swagger.io",
        email: "Info@SmartBear.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1"
      }
    ]
  },
  apis: ["./Models/User.js", "./Routes/index.js"]
};

const specs = swaggerJsdoc(options);
router.use("/docs", swaggerUi.serve);
router.get(
  "/docs",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error Handler
router.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = router;
