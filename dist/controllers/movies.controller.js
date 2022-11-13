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
import { insertMovie, insertGenre, getGenreId, getAllTheMovies, getAllMovieByGenre, addMovieToWishList, updateWatchedMovie, deleteWishlistMovie, getUsersMovies } from "../repositories/movies.repository.js";
function postGenre(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var genreName, genre;
        return __generator(this, function (_a) {
            genreName = req.body;
            genre = genreName.genre;
            insertGenre(genre);
            res.status(200).send(genre);
            return [2 /*return*/];
        });
    });
}
function getGenre(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var genreData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getGenreId()];
                case 1:
                    genreData = _a.sent();
                    res.status(200).send(genreData.rows);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.sendStatus(500);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function postMovie(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var movieInfo, name, image, platform, genreId;
        return __generator(this, function (_a) {
            movieInfo = req.body;
            name = movieInfo.name, image = movieInfo.image, platform = movieInfo.platform, genreId = movieInfo.genreId;
            insertMovie(name, image, platform, genreId);
            res.sendStatus(200);
            return [2 /*return*/];
        });
    });
}
function getAllMovies(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var movies, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getAllTheMovies()];
                case 1:
                    movies = _a.sent();
                    res.status(200).send(movies.rows);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.sendStatus(500);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getMovieByGenre(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, movies, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getAllMovieByGenre(Number(id))];
                case 2:
                    movies = _a.sent();
                    res.status(200).send(movies.rows);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addMovieToList(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, wishlistInfo, movieId, watched;
        return __generator(this, function (_a) {
            userId = res.locals.userId;
            wishlistInfo = req.body;
            movieId = wishlistInfo.movieId, watched = wishlistInfo.watched;
            addMovieToWishList(userId, movieId, watched);
            res.sendStatus(200);
            return [2 /*return*/];
        });
    });
}
function getUserMovies(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, userMovies, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = res.locals.userId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getUsersMovies(userId)];
                case 2:
                    userMovies = _a.sent();
                    res.status(200).send(userMovies.rows);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _a.sent();
                    res.status(500).send(error_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateMovie(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, update, watched, movieId;
        return __generator(this, function (_a) {
            userId = res.locals.userId;
            update = req.body;
            watched = update.watched, movieId = update.movieId;
            updateWatchedMovie(watched, userId, movieId);
            res.sendStatus(201);
            return [2 /*return*/];
        });
    });
}
function deleteMovie(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var movie, userId, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    movie = req.params.movie;
                    userId = res.locals.userId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, deleteWishlistMovie(Number(movie), userId)];
                case 2:
                    _a.sent();
                    res.sendStatus(204);
                    return [3 /*break*/, 4];
                case 3:
                    error_5 = _a.sent();
                    res.sendStatus(500);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export { postMovie, getAllMovies, updateMovie, deleteMovie, getUserMovies, getMovieByGenre, addMovieToList, postGenre, getGenre };
