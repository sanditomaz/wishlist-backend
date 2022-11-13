import express from "express";
import { postMovie, getAllMovies, updateMovie, getUserMovies, deleteMovie, getMovieByGenre, addMovieToList, postGenre, getGenre} from "../controllers/movies.controller.js";
import { movieValidator, genreValidator, watchedValidator, updateValidator } from "../middlewares/movies.middleware.js";
import { validateUser } from "../middlewares/authUser.middleware.js";
const router = express.Router();

router.post("/movies/genre", genreValidator, postGenre);
router.get("/movies/genre", getGenre);

router.post("/movies", movieValidator, postMovie);
router.get("/movies", getAllMovies);
router.get("/movies/:genre", getMovieByGenre);

router.post("/movies/mylist", validateUser, watchedValidator, addMovieToList);
router.get("/movies/mylist", validateUser, getUserMovies);
router.put("/movies/mylist", validateUser, updateValidator, updateMovie);
router.delete("/movies/mylist/:movie", validateUser, deleteMovie);

export default router;