import { Request, Response } from "express";
import { Movie, Genre, Query, QueryMovie, QueryUser, Wishlist } from "../protocols/movies.js";
import { insertMovie, insertGenre, getGenreId, getAllTheMovies, getAllMovieByGenre, addMovieToWishList, updateWatchedMovie, deleteWishlistMovie, getUsersMovies } from "../repositories/movies.repository.js";

async function postGenre(req: Request, res: Response) {
    const genreName = req.body as Genre;
    const { genre } = genreName;
  
    insertGenre(genre);

    res.status(200).send(genre)

}


async function getGenre(req: Request, res: Response) {
    
    try{

        const genreData = await getGenreId()

        res.status(200).send(genreData.rows)
    }catch(error){
        res.sendStatus(500);
    }
}


async function postMovie(req: Request, res: Response) {
  const movieInfo = req.body as Movie;
  const {name, image, platform, genreId} = movieInfo;

  insertMovie(name, image, platform, genreId);

 res.sendStatus(200);
}



async function getAllMovies(req: Request, res: Response) {
    try{

        const movies = await getAllTheMovies();
       
        res.status(200).send(movies.rows)
    }catch(error){
        res.sendStatus(500)
    }
}


async function getMovieByGenre(req: Request, res: Response) {
    const { genre } = req.params as Query;
    
    try{

        const movies = await getAllMovieByGenre(Number(genre));
       
        res.status(200).send(movies.rows)
    }catch(error){
        res.sendStatus(500)
    }
}

//----------------

async function addMovieToList(req: Request, res: Response) {
    const { userId } = res.locals as QueryUser;

    const wishlistInfo = req.body as Wishlist;
    const { movieId, watched } = wishlistInfo;

    addMovieToWishList(userId, movieId, watched);
    
   res.sendStatus(200);
  
}

async function getUserMovies(req: Request, res: Response) {
    const { userId } = res.locals as QueryUser;
    console.log(userId);
    try{
        
      const userMovies = await getUsersMovies(userId);
      res.status(200).send(userMovies);

    }catch(error){
        res.status(500).send(error);
    }
}


async function updateMovie(req: Request, res: Response) {
    const { userId } = res.locals as QueryUser;

    const update = req.body as Wishlist;
    const { watched, movieId } = update;

    updateWatchedMovie(watched, userId, movieId);

    res.sendStatus(201);
}


async function deleteMovie(req: Request, res: Response) {
    const { movie } = req.params as QueryMovie;
    const { userId } = res.locals as QueryUser;

    try{
        
        await deleteWishlistMovie(Number(movie), userId);
       
        res.sendStatus(204);
    }catch(error){
        res.sendStatus(500);
    }

  
}


export { postMovie, getAllMovies, updateMovie, deleteMovie, getUserMovies, getMovieByGenre, addMovieToList, postGenre, getGenre };