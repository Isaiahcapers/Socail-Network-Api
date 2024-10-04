import {User, Thought, Reaction} from '../models/index.js';
import {Request, Response} from 'express';

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json(err);
    }
}

// Get a single user
