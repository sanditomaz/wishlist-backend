import { signUpValidation, signInValidation } from "../validator/users.validator.js";
import { Request, Response, NextFunction } from "express";
import { User, UserLogin } from "../protocols/user.js";
import { checkIfUserExists} from "../repositories/users.repository.js";
import bcrypt from "bcrypt"; 

const signUpValidator = async (req: Request, res: Response, next: NextFunction) => {
    const userSignUpInfo = req.body as User;
    
    const { error } = signUpValidation(userSignUpInfo);
  
    if (error) {
        return res.status(422).send({
            message: error.message
        }) 
    }


    try{

        const checkEmail = await checkIfUserExists(userSignUpInfo.email);
        if (checkEmail.rows[0]) return res.status(409).send("Email already exists");
        
        next();
    }catch(error){
        res.sendStatus(500);
    }

 
  };


const signInValidator = async (req: Request, res: Response, next: NextFunction) => {
    const userLoginInfo = req.body as UserLogin;

    const { error } = signInValidation(userLoginInfo);
  
    if (error) {
        return res.status(422).send({
            message: error.message
        }) 
    }


    try{

        const checkifUserisValid = await checkIfUserExists(userLoginInfo.email);
        if (checkifUserisValid.rowCount === 0) return res.status(404).send("User not found, check email or password");

        const validPass = bcrypt.compareSync(userLoginInfo.password, checkifUserisValid.rows[0].password);
        const userId = checkifUserisValid.rows[0].id;

        if (!validPass) {
            res.status(401).send("User not found, check email or password");
            return;
          }
      
          res.locals.userId = userId;

        next();
    }catch(error){
        res.sendStatus(500);
    }

 
}

  export { signUpValidator, signInValidator };