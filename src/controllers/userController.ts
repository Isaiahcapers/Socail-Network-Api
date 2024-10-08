import {User, Thought,} from '../models/index.js';
import {Request, Response} from 'express';

// Get all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(400).json(err);
    }
}
// Get a single user
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({_id: req.params.userId}).populate({path:'thoughts', 
         });
        // .populate({ path: 'thoughts', select: '-__v' });

    if (!user ) {
        return res.status(404).json({message: 'No user with that ID'});
    }    
        return res.json(user);
        
    } catch (err) {
        return res.status(400).json(err);
    }
}
// Create a User
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create (req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}
// Update a User
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId},
            {$set: req.body },
            { runValidators: true, new: true}
        );

        if (!user) {
            return res.status(404).json ({message: 'No User with this id!'});
        }
        res.json(user);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        return;
    }
}
// Delete a User
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
        if (!user) {
            return res.status(404).json({message: 'No user with that ID'});
        }
        await Thought.deleteMany({ _id: { $in: user.thoughts}});
        res.json({message: 'User and thoughts deleted!'})
        return;
    } catch (error) {
        res.status(500).json(error);
        return;
    }
}
// Add a friend
export const addFriend = async (req: Request, res: Response) => {
    try {
        
    const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId}},
        { new: true}
    );
    if (!friend) {
        return res.status(404).json({message: 'No friend with that ID'});        
    }
    res.json(friend);
    return;
    } catch (error) {
        res.status(500).json(error);
        return;
    } 
} 
// Delete a friend
export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId}},
        {new: true});
        if (!friend) {
            return res.status(404).json({message: 'No friend with that ID'});
        }
        return res.json({message: 'Friend deleted!'});
    } catch (error) {
        return res.status(500).json(error);
    }
}