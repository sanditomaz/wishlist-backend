var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { connection } from "../database/database.js";
function checkIfMovieExists(name) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("SELECT name FROM \"public.movies\" WHERE name ILIKE ($1);", [name])];
        });
    });
}
function checkIfGenreExists(genre) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("SELECT genre FROM \"public.genres\" WHERE genre ILIKE ($1);", [genre])];
        });
    });
}
function insertGenre(genre) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("INSERT INTO \"public.genres\" (genre) VALUES($1);", [genre])];
        });
    });
}
function getGenreId() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("SELECT * FROM \"public.genres\";")];
        });
    });
}
function insertMovie(name, image, platform, genreId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("INSERT INTO \"public.movies\" (name, image, platform, \"genreId\") VALUES($1, $2, $3, $4);", [name, image, platform, genreId])];
        });
    });
}
function getAllTheMovies() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("SELECT * FROM \"public.movies\";")];
        });
    });
}
function getAllMovieByGenre(genre) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("SELECT * FROM \"public.movies\" WHERE \"genreId\" = ($1);", [genre])];
        });
    });
}
function checkIfMovieIsInWishlist(userId, movieId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("SELECT * FROM \"public.users_movies\" WHERE \"userId\" = ($1) AND \"movieId\" = ($2);", [userId, movieId])];
        });
    });
}
function addMovieToWishList(userId, movieId, watched) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("INSERT INTO \"public.users_movies\" (\"userId\", \"movieId\", watched) VALUES($1, $2, $3);", [userId, movieId, watched])];
        });
    });
}
function updateWatchedMovie(watched, userId, movieId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("UPDATE \"public.users_movies\" SET watched =  ($1) WHERE \"userId\" = ($2) AND \"movieId\" = ($3);", [watched, userId, movieId])];
        });
    });
}
function deleteWishlistMovie(movieId, userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("DELETE FROM \"public.users_movies\" WHERE \"userId\" = ($1) AND \"movieId\" = ($2);", [userId, movieId])];
        });
    });
}
function getUsersMovies(userId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, connection.query("SELECT pm.name, pm.image, pm.platform, pm.\"genreId\" FROM \"public.users_movies\" pum JOIN \"public.movies\" pm ON pum.\"movieId\" = pm.id WHERE pum.\"userId\" = ($1);", [userId])];
        });
    });
}
export { checkIfMovieExists, insertMovie, insertGenre, getGenreId, getAllTheMovies, getAllMovieByGenre, checkIfMovieIsInWishlist, addMovieToWishList, updateWatchedMovie, deleteWishlistMovie, getUsersMovies, checkIfGenreExists };
