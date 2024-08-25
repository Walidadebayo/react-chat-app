import { Router } from 'express';
import { AddContact, DeleteUser, GetContacts, GetUserByEmail, GetUserById, GetUserByUsername, Login, Logout, Register, RemoveContact, SearchUsers, UpdatePassword, UpdateProfilePicture, UpdateUser, ValidateUser } from '../controllers/UserController';
import { Auth } from '../middlewares/UserAuth';

const router = Router();

router.post('/auth/signup', Register);
router.post('/auth/login', Login);
router.post('/auth/logout', Logout);
router.get('/auth/validate', Auth, ValidateUser);
router.get('/api/user?', Auth, SearchUsers);
router.get('/api/user/:id', Auth, GetUserById);
router.patch('/api/update-info/', Auth, UpdateUser);
router.patch('/api/update-password/', Auth, UpdatePassword);
router.patch('/api/update-profile-picture/', Auth, UpdateProfilePicture);
router.delete('/api/delete-account/', Auth, DeleteUser);
router.post('/api/add-contact/:id', Auth, AddContact);
router.delete('/api/delete-contact/:id', Auth, RemoveContact);
router.get('/api/contacts', Auth, GetContacts);
router.get('/api/get-user-by-username/:username', Auth, GetUserByUsername);
router.get('/api/get-user-by-email/:email', Auth, GetUserByEmail);


export default router;