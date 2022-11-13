import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { registerUser } from "../repositories/users.repository.js";
import { User } from "../protocols/user.js";
import { logUserIn } from "../repositories/users.repository.js";

async function signUp(req: Request, res: Response) {
  const userSignUpInfo = req.body as User;
  const {name, image, email, password} = userSignUpInfo;

  const hashPassword = bcrypt.hashSync(password, 10);

  try{
    const registedUser = await registerUser(name, image, email, hashPassword); 
    console.log(registedUser)
    
    res.status(200).send("opa");
  }catch (error){
    res.sendStatus(500);
  }

 

}

async function signIn(req: Request, res: Response) {
     const token = uuidv4();
     const { userId } = res.locals;

     logUserIn(userId, token);  

    res.status(200).send({ token: token });
}

export { signUp, signIn };