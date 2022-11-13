import { QueryResult } from "pg";
import { connection } from "../database/database.js";
import { User, UserEntity } from "../protocols/user.js";

async function checkIfUserExists(email: UserEntity["email"]): Promise<QueryResult<UserEntity>>{
    return connection.query(`SELECT * FROM "public.users" WHERE email = ($1);`, [email]);
}

async function registerUser(name: User["name"], image: User["image"], email: User["email"], password: User["password"]): Promise<QueryResult<User>>{
    return connection.query(`INSERT INTO "public.users" (name, image, email, password) VALUES  ($1, $2, $3, $4);`, [name, image, email, password]);
}

async function logUserIn(userId: number, token: string) {
    return connection.query(`INSERT INTO "public.sessions" ("userId", token) VALUES($1, $2);`,[userId, token]);
}

async function verifyToken(token: string) {
    return connection.query(`SELECT * FROM "public.sessions" WHERE token = ($1);`,[token]);
}

export { registerUser, logUserIn, checkIfUserExists, verifyToken };