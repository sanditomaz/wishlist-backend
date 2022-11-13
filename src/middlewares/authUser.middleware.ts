import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../repositories/users.repository.js";

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  
  if (!token) {
    return res.sendStatus(401);
  }
 
  try {
    const valid = await verifyToken(token);

    if (valid.rows.length === 0) return res.sendStatus(401);

    const userId = valid.rows[0].userId;
    if (userId === null) return res.sendStatus(404);

    res.locals.userId = userId;
    next();
  } catch (error) {
    
    res.status(500).send(error);
  }
};

export { validateUser };