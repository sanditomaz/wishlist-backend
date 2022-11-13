import express from "express";
import { postMovie, getAllMovies, updateMovie, getUserMovies, deleteMovie, getMovieByGenre, addMovieToList, postGenre, getGenre} from "../controllers/movies.controller.js";
import { movieValidator, genreValidator, watchedValidator, updateValidator } from "../middlewares/movies.middleware.js";
const router = express.Router();

router.post("/movies/genre", genreValidator, postGenre);
router.get("/movies/genre", getGenre);

router.post("/movies", movieValidator, postMovie);
router.get("/movies", getAllMovies);
router.get("/movies/:genre", getMovieByGenre);

router.post("/movies/mylist", watchedValidator, addMovieToList);
router.get("/movies/mylist", getUserMovies);
router.put("/movies/mylist", updateValidator, updateMovie);
router.delete("/movies/mylist", deleteMovie);

export default router;