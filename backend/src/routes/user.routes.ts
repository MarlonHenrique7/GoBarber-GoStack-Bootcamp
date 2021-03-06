import {response, Router} from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUserService';

import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {

    const {name, email, password} = request.body;

    const creatUser = new CreateUserService();

    const user = await creatUser.execute({
        name,
        email,
        password,
    });

    const userDeletedPassword = {'name': user.name, 'email': user.email}

    // delete userDeletedPassword;

    return response.json(userDeletedPassword);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response)=> {

    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file?.filename as string,
    });

    const userDeletedPassword = {'name': user.name, 'email': user.email}

    // delete userDeletedPassword;

    return response.json(userDeletedPassword);

});

export default usersRouter;




