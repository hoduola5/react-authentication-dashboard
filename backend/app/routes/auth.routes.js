import express from "express";
import  {signup,signin}from "../controllers/auth.controller.js";
const router = express.Router();

// router.delete('/:id',);


  // app.use(function(req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });

  router.post(
    "/api/auth/signup",
    signup
  );

  router.post("/api/auth/signin", signin);

  export default router;