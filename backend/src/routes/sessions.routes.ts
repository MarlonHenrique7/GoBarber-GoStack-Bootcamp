import {Router} from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

interface deletePassword{
    id: string;
    name: string;
    email: string;
    password?: string;
    avatar: string;
    created_at: Date;
    updated_at: Date;
}

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

    const {email, password} = request.body;

    const authenticateUser = new AuthenticateUserService();

    const {user, token} = await authenticateUser.execute({
        email,
        password,
    });

    const userDeletedPassword:deletePassword = user;

    delete userDeletedPassword.password;

    return response.json({ userDeletedPassword, token })
});

export default sessionsRouter;




