import {Schema,Types, type Document} from 'mongoose';

interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId,
    reactionBody: String,
    username: String,
    createdAt: Date
}

const reactionSchema = new Schema<IReaction> (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required:true,
            maxlength: 280,
        },
        username: {
            type: String,
            required:true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

export default reactionSchema