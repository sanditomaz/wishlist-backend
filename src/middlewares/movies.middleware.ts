import { movieValidation, watchedValidation, genreValidation } from "../validator/movies.validator.js";
import { Request, Response, NextFunction } from "express";
import { Movie, Genre } from "../protocols/movies.js";
import { checkIfMovieExists } from "../repositories/movies.repository.js";


const genreValidator = async (req: Request, res: Response, next: NextFunction) => {
    const genreName = req.body as Genre;

    const { error } = genreValidation(genreName);

    if (error) {
        return res.status(422).send({
            message: error.message
        }) 
    }

   next();

}

const movieValidator = async (req: Request, res: Response, next: NextFunction) => {
     const movieInfo = req.body as Movie;

     const { error } = movieValidation(movieInfo);

    if (error) {
        return res.status(422).send({
            message: error.message
        }) 
    }

   
    try{
        console.log(movieInfo.name)
       const checkMovie = await checkIfMovieExists(movieInfo.name);
       if (checkMovie.rows[0]) return res.status(409).send("Movie already exists");
       
        next();
    }catch(error){
      
        res.sendStatus(500);
    }

}


const watchedValidator = async (req: Request, res: Response, next: NextFunction) => {



}

export { movieValidator, watchedValidator, genreValidator };