import jsonwebtoken from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/UserModel';

interface IVerified {
    id: string;
    email: string;
}

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    jsonwebtoken.verify(token, process.env.JWT_SECRET as string, async (error, verified) => {
        if (error) return res.status(401).json({ message: 'Invalid token' });
        const user = await User.findById((verified as IVerified).id).select('-password');
        if (!user) return res.status(401).json({ message: 'User not found' });
        (req as any).user = user;
        (req as any).token = token;
        next();
    });
}