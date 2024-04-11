import { Router } from "express";
import passport from "passport";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user/user.controller";

const route = Router();

route.get("/get-users", getUsers);
route.post("/create-user", createUser);
route.get("/get-user/", passport.authenticate('jwt', { session: false }), getUser);
route.put("/update-user/:id", passport.authenticate('jwt', { session: false }), updateUser);
route.delete("/delete-user/:id", passport.authenticate('jwt', { session: false }), deleteUser);

export default route;