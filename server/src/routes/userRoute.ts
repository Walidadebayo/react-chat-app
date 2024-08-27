import { Router } from 'express';
import { AddContact, DeleteUser, GetContacts, GetUserByEmail, GetUserById, GetUserByUsername, Login, Logout, Register, RemoveContact, SearchUsers, UpdatePassword, UpdateProfilePicture, UpdateUser, ValidateUser } from '../controllers/UserController';
import { Auth } from '../middlewares/UserAuth';

const router = Router();

router.post('/auth/signup', Register);
router.post('/auth/login', Login);
router.post('/auth/logout', Logout);
router.get('/auth/validate', Auth, ValidateUser);
router.get('/?', Auth, SearchUsers);
router.get('/id/:id', Auth, GetUserById);
router.patch('/update-info/', Auth, UpdateUser);
router.patch('/update-password/', Auth, UpdatePassword);
router.patch('/update-profile-picture/', Auth, UpdateProfilePicture);
router.delete('/delete-account/', Auth, DeleteUser);
router.post('/add-contact/:id', Auth, AddContact);
router.delete('/delete-contact/:id', Auth, RemoveContact);
router.get('/contacts', Auth, GetContacts);
router.get('/username/:username', Auth, GetUserByUsername);
router.get('/email/:email', Auth, GetUserByEmail);


export default router;