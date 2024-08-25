import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    profilePicture: string;
    contacts: mongoose.Types.ObjectId[];
    comparePassword: (password: string) => Promise<boolean>;
    generateAuthToken: () => string;
    setProperties: (properties: { [key: string]: any }) => void;
}


const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: 'https://i.ibb.co/nbTqjw5/user.png' },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Hash the password before saving the user model
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password as string, 12);
    }
    next();
});

// Compare user password
UserSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}

// Generate token for authentication
UserSchema.methods.generateAuthToken = function () {
    try {
        const token: string = jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET as string, { expiresIn: '30d' }); // Generate a token
        return 'Bearer ' + token;
    } catch (error) {
        console.log(error);
    }
}

// Set Properties Method for UserSchema
UserSchema.methods.setProperties = function (properties: { [key: string]: any }) {
    for (const key in properties) {
        this[key] = properties[key]; // Set the properties
    }
}

export const User = mongoose.model<IUser>('User', UserSchema);
