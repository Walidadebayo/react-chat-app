import { Message } from "../models/MessageModel";
import { Request, Response } from 'express';
import { User } from "../models/UserModel";

// Send a message
export const SendMessage = async (req: Request, res: Response) => {
    try {
        const { receiver, message } = req.body; // destructure the request body
        const sender = (req as any).user.id; // Get the sender's id
        const newMessage = new Message({ sender, receiver, message }); // Create a new message
        await newMessage.save(); // Save the message
        res.status(201).json({ message: 'success' }); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}

// Get messages
export const GetMessages = async (req: Request, res: Response) => {
    try {
        let user = await User.findById(req.params.id).select('id name username profilePicture'); // Find the user
        const messages = await Message.find({
            $or: [
                { sender: (req as any).user.id, receiver: req.params.id },
                { receiver: (req as any).user.id, sender: req.params.id }
            ]
        }).populate('sender', 'id profilePicture').populate('receiver', 'id profilePicture').sort('-timestamp'); // Find the messages
        res.status(201).json(
            {
                receiver: user,
                messages
            }
        ); // Send a response
    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Send an error response
    }
}



