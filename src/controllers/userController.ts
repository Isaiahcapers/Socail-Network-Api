import {User, Thought, Reaction} from '../models/index.js';
import {application, Request, Response} from 'express';

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
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({_id: req.params.userId})
        .select('-__v');

    if (!user ) {
        return res.status(404).json({message: 'No user with that ID'});
    }    
    res.json(user);
        
    } catch (err) {
        res.status(400).json(err);
        return;
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
        res.json(application);
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
        res.json({message: 'User and associated app deleted!'})
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
    } 
} 
// Delete a friend
export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const friend = await User.findOneAndDelete(
            { _id: req.params.userId });
        if (!friend) {
            return res.status(404).json({message: 'No friend with that ID'});
        }
        await Thought.deleteMany({ _id: { $in: friend.thoughts}});
        res.json({message: 'Friend and associated thoughts deleted!'});
        res.json(friend);
    } catch (error) {
        res.status(500).json(error);
    }
}