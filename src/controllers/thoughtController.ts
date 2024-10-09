import {User, Thought} from '../models/index.js';
import {Request, Response} from 'express';

// Get all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(400).json(err);
    }
}
// Get a single thought
export const getSingleThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId});        

    if (!thought ) {
        return res.status(404).json({message: 'No thought with that ID'});
    }    
        res.json(thought);
        return;        
    } catch (err) {
        res.status(500).json(err);
        return; 
    }
}
// Create a Thought
export const createThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'No user with this ID!' });
        }
        res.json('Thought created and added to user!');
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        return;
    }
}
// Update a Thought
export const updateThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            {$set: req.body },
            { runValidators: true, new: true}
        );

        if (!thought) {
            return res.status(404).json ({message: 'No Thought with this id!'});
        }
        res.json(thought);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        return;
    }
}
// Delete a Thought
export const deleteThought = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        if (!thought) {
            return res.status(404).json({message: 'No thought with that ID'});
        }
        await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } }
        );
        res.json('Thought deleted!');
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        return;
    }
}

// Add a Reaction
export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID!' });
        }
        res.json(`Reaction added to thought! ${thought._id}`);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        return;
    }
}    

// Delete a Reaction
export const deleteReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID!' });
        }
        res.json(`Reaction deleted from thought! ${thought._id}`);
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        return;
    }
}    

export default {getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction};