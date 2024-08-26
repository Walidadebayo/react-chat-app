import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute';
import messageRoute from './routes/messageRoute';

// const corsConfig = {
//     origin: process.env.BASE_URL || 'http://localhost:5173',
//     credentials: true
// };

dotenv.config();

const app = express();
const port: string | number = process.env.PORT || 5500;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/react';

(async () => {
    try {
        mongoose.connect(uri).then(() => {
            console.log('Connected to MongoDB');
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})();


app.get('/api/data', (req: express.Request, res: express.Response) => {
    res.json({ message: 'Hello from server!' });
});
app.use('/', userRoute);
app.use('/api', messageRoute);




if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req: express.Request, res: express.Response) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
var l = [
    {
        "id": "message1_id",
        "sender": {
            "id": "sender1_id",
            "profilePicture": "https://example.com/profile1.jpg"
        },
        "receiver": {
            "id": "receiver1_id",
            "profilePicture": "https://example.com/profile2.jpg"
        },
        "content": "Hello, how are you?",
        "timestamp": "2023-10-01T12:34:56Z"
    },
    {
        "id": "message2_id",
        "sender": {
            "id": "sender2_id",
            "profilePicture": "https://example.com/profile3.jpg"
        },
        "receiver": {
            "id": "receiver2_id",
            "profilePicture": "https://example.com/profile4.jpg"
        },
        "content": "I'm good, thanks!",
        "timestamp": "2023-10-01T12:35:56Z"
    }
];


// l.map((message) => {
//     console.log(message.content);
//     console.log(message.receiver.profilePicture);
// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});