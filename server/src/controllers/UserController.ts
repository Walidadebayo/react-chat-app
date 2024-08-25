import { Message } from "../models/MessageModel";
import { User } from "../models/UserModel";
import { Request, Response } from 'express';


// Register a new user
export const Register = async (req: Request, res: Response) => {
    try {
        const { name, username, email, password } = req.body; // destructure the request body
        const user = new User({ name, username, email, password }); // Create a new user
        const token = user.generateAuthToken(); // Generate a token
        await user.save(); // Save the user
        res.status(201).json({ message: 'success', token }); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Login a user
export const Login = async (req: Request, res: Response) => {
    try {
        const { username_email, password } = req.body; // destructure the request body
        const user = await User.findOne({ $or: [{ username: username_email }, { email: username_email }] }); // Find the user
        if (!user) return res.status(400).json({ message: 'Invalid credentials' }); // Check if the user exists
        const isMatch = await user.comparePassword(password); // Compare the password
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' }); // Check if the password is correct and send an error response if it is not
        const token = user.generateAuthToken(); // Generate a token
        res.cookie('auth_token', token, { httpOnly: true }); // Set the token in a cookie
        res.json({ message: 'success', token }); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Validate a user
export const ValidateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById((req as any).user.id).select('-password'); // Find the user
        if (!user) return res.status(400).json({ message: 'User is not valid' }); // Check if the user exists
        res.status(201).json({ user, token: (req as any).token }); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Get a user by id

export const GetUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).select('-password -contacts'); // Find the user
        if (!user) return res.status(400).json({ message: 'User is not valid' }); // Check if the user exists
        res.status(201).json(user); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Logout a user
export const Logout = async (req: Request, res: Response) => {
    try {
        res.clearCookie('auth_token'); // Clear the cookie
        res.status(200).json({ message: 'success' }); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Update a user profile
export const UpdateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById((req as any).user.id).select('-password -contacts'); // Find the user
        if (!user) return res.status(400).json({ message: 'User is not valid' }); // Check if the user exists
        user.setProperties(req.body); // Set the user properties
        await user.updateOne(); // Update the user
        res.status(201).json({ message: 'success' }); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Update a user password
export const UpdatePassword = async (req: Request, res: Response) => {
    try {
        const user = await User.findById((req as any).user.id).select('password id'); // Find the user
        if (!user) return res.status(400).json({ message: 'User is not valid' }); // Check if the user exists
        const isMatch = await user.comparePassword(req.body.oldPassword); // Compare the password
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' }); // Check if the password is correct and send an error response if it is not
        user.password = req.body.newPassword; // Set the new password
        await user.updateOne(); // Update the user password
        res.status(201).json({ message: 'success' }); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Update a user profile picture
export const UpdateProfilePicture = async (req: Request, res: Response) => {
    try {
        const user = await User.findById((req as any).user.id).select('profilePicture id'); // Find the user
        if (!user) return res.status(400).json({ message: 'User is not valid' }); // Check if the user exists
        user.profilePicture = req.body.profilePicture; // Set the profile picture
        await user.updateOne(); // Update the profile picture
        res.status(201).json({ message: 'success' }); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Delete a user
export const DeleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById((req as any).user.id); // Find the user
        if (!user) return res.status(400).json({ message: 'User is not valid' }); // Check if the user exists
        await user.deleteOne(); // Delete the user
        res.status(201).json({ message: 'success' }); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// search users
export const SearchUsers = async (req: Request, res: Response) => {
    try {
        const search = req.query.search ?
            {
                $or: [
                    { name: { $regex: req.query.search, $options: 'i' } },
                    { username: { $regex: req.query.search, $options: 'i' } },
                    { email: { $regex: req.query.search, $options: 'i' } }
                ]
            } : {}; // Set the search query
        const users = await User.find(search).select('-password -contacts'); // Find the users
        res.status(201).json(users); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Add a friend
export const AddContact = async (req: Request, res: Response) => {
    try {
        const user = await User.findById((req as any).user.id).select('contacts'); // Find the user
        if (!user) return res.status(400).json({ message: 'User is not valid' }); // Check if the user exists
        const contact = await User.findById(req.params.id).select('id'); // Find the contact
        if (!contact) return res.status(400).json({ message: 'User is not valid' }); // Check if the contact exists
        await user.updateOne({ $push: { contacts: contact.id } }); // Add the contact
        res.status(201).json({ message: 'success' }); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Remove a friend
export const RemoveContact = async (req: Request, res: Response) => {
    try {
        const user = await User.findById((req as any).user.id).select('contacts'); // Find the user
        if (!user) return res.status(400).json({ message: 'User is not valid' }); // Check if the user exists
        const contact = await User.findById(req.params.id).select('id'); // Find the contact
        if (!contact) return res.status(400).json({ message: 'User is not valid' }); // Check if the contact exists
        await user.updateOne({ $pull: { contacts: contact.id } }); // Remove the contact
        res.status(201).json({ message: 'success' }); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}



// Get contacts with their last message
export const GetContacts = async (req: Request, res: Response) => {
    try {
        const user = await User.findById((req as any).user.id).select('contacts profilePicture').populate('contacts', '-password -contacts -email'); // Find the user
        if (!user) return res.status(400).json({ message: 'User is not valid' }); // Check if the user exists
        user.contacts = await Promise.all(user.contacts.map(async (contact: any) => {
            var lastMessage = await Message.findOne({ $or: [{ sender: user.id, receiver: contact.id }, { receiver: user.id, sender: contact.id }] }).select('content timestamp').sort('-timestamp'); // Find the last message
            var unreadMessages = await Message.find({ sender: contact.id, receiver: user.id, read: false }).countDocuments(); // Find the number of unread messages
            if (lastMessage) {
                var timestamp = lastMessage?.timestamp;
                var now = new Date();
                var seconds = Math.floor((now.getTime() - timestamp?.getTime()) / 1000);
                var minutes = Math.floor(seconds / 60);
                var hours = Math.floor(minutes / 60);
                var days = Math.floor(hours / 24);
                var weeks = Math.floor(days / 7);
                var months = Math.floor(weeks / 4);
                var years = Math.floor(months / 12);
                if (years > 0) {
                    contact.lastMessage.timeAgo = years + ' Years';
                } else if (months > 0) {
                    contact.lastMessage.timeAgo = months + ' Months';
                } else if (weeks > 0) {
                    contact.lastMessage.timeAgo = weeks + ' Weeks';
                } else if (days > 0) {
                    contact.lastMessage.timeAgo = days + ' Days';
                } else if (hours > 0) {
                    contact.lastMessage.timeAgo = hours + ' Hours';
                } else if (minutes > 0) {
                    contact.lastMessage.timeAgo = minutes + ' Minutes';
                } else {
                    contact.lastMessage.timeAgo = seconds + ' Seconds';
                }
            }
            contact = contact.toObject(); // Convert the contact to an object
            contact.unreadMessages = unreadMessages; // Set the number of unread messages
            contact.lastMessage = lastMessage ? lastMessage.content : '';
            // convert timestamp to seconds, minutes, hours, days, weeks, months, years
            return contact; // Return the contact
        }));
        res.status(201).json({
            contacts: user.contacts.sort((a: any, b: any) => {
                return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
            }),
            profilePicture: user.profilePicture
        }); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Get user by username
export const GetUserByUsername = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password -contacts'); // Find the user
        if (!user) return res.status(400).json({ message: 'User is not valid' }); // Check if the user exists
        res.status(201).json(user); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Get user by email
export const GetUserByEmail = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.params.email }).select('-password -contacts'); // Find the user
        if (!user) return res.status(400).json({ message: 'User is not valid' }); // Check if the user exists
        res.status(201).json(user); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}





