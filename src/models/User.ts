import {Schema, model, type Document} from 'mongoose';

interface IUser extends Document {
    username: string,
    email: string,
    thoughts: Schema.Types.ObjectId[],
    friends: Schema.Types.ObjectId[]
}

const userSchema = new Schema<IUser> (
    {
        username: {
            type: String,
            required:true,
            unique: true,
            trim:true
        },
        email: {
            type:String,
            required: true,
            unique: true,
            validate: {
                validator: function (v:string) {
                    return /.+\@.+\..+/.test(v);
                },
                message: 'Email must include an @ sign, Mucho Gracias.'
            }
        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts',
        },
        ],
        friends: [
            {
                type:Schema.Types.ObjectId,
                ref: 'Friends'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendcount')
    .get(function () {
            return `You have this many friends: ${this.friends.length}`;
        })

const User = model('user',userSchema);

export default User;        