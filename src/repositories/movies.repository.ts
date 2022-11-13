import { QueryResult } from "pg";
import { connection } from "../database/database.js";
import { Movie, MovieEntity, Genre, WishlistEntity, Wishlist } from "../protocols/movies.js";

async function checkIfMovieExists(name:Movie["name"]): Promise<QueryResult<Movie>>{
    return connection.query(`SELECT name FROM "public.movies" WHERE name ILIKE ($1);`, [name]);
}

async function checkIfGenreExists(genre:Genre["genre"]): Promise<QueryResult<Genre>>{
    return connection.query(`SELECT genre FROM "public.genres" WHERE genre ILIKE ($1);`, [genre]);
}

async function insertGenre(genre:Genre["genre"]): Promise<QueryResult<Genre>>{
    return connection.query(`INSERT INTO "public.genres" (genre) VALUES($1);`, [genre]);
}


async function getGenreId(): Promise<QueryResult<Genre>>{
    return connection.query(`SELECT * FROM "public.genres";`);
}
 
async function insertMovie(name:Movie["name"], image:Movie["image"], platform:Movie["platform"], genreId:Movie["genreId"]): Promise<QueryResult<Movie>>{
    return connection.query(`INSERT INTO "public.movies" (name, image, platform, "genreId") VALUES($1, $2, $3, $4);`, [name, image, platform, genreId]);
}

async function getAllTheMovies(): Promise<QueryResult<MovieEntity>>{
    return connection.query(`SELECT * FROM "public.movies";`);
}

async function getAllMovieByGenre(genre: number): Promise<QueryResult<MovieEntity>>{
    return connection.query(`SELECT * FROM "public.movies" WHERE "genreId" = ($1);`, [genre]);
}

async function checkIfMovieIsInWishlist(userId:WishlistEntity["userId"], movieId:WishlistEntity["movieId"]): Promise<QueryResult<WishlistEntity>>{
    return connection.query(`SELECT * FROM "public.users_movies" WHERE "userId" = ($1) AND "movieId" = ($2);`, [userId, movieId]);
}

async function addMovieToWishList(userId:Wishlist["userId"], movieId:Wishlist["movieId"], watched:Wishlist["watched"]): Promise<QueryResult<WishlistEntity>>{
    return connection.query(`INSERT INTO "public.users_movies" ("userId", "movieId", watched) VALUES($1, $2, $3);`, [userId, movieId, watched]);
}

async function updateWatchedMovie(watched:Wishlist["watched"], userId:Wishlist["userId"], movieId:Wishlist["movieId"]): Promise<QueryResult<WishlistEntity>>{
    return connection.query(`UPDATE "public.users_movies" SET watched =  ($1) WHERE "userId" = ($2) AND "movieId" = ($3);`, [watched, userId, movieId]);
}

async function deleteWishlistMovie(movieId:Wishlist["movieId"], userId:Wishlist["userId"]): Promise<QueryResult<WishlistEntity>>{
    return connection.query(`DELETE FROM "public.users_movies" WHERE "userId" = ($1) AND "movieId" = ($2);`, [userId, movieId]);
}

async function getUsersMovies(userId:Wishlist["userId"]): Promise<QueryResult<MovieEntity>>{
    return connection.query(`SELECT pm.name, pm.image, pm.platform, pm."genreId" FROM "public.users_movies" pum JOIN "public.movies" pm ON pum."movieId" = pm.id WHERE pum."userId" = ($1);`, [userId]);
}

export{ checkIfMovieExists, insertMovie, insertGenre, getGenreId, getAllTheMovies, getAllMovieByGenre, checkIfMovieIsInWishlist, addMovieToWishList, updateWatchedMovie, deleteWishlistMovie, getUsersMovies, checkIfGenreExists }; 