import express from 'express'
import userRouter from '../routes/user.route'
import taskRouter from '../routes/task.route'
import validate from '../middleware/vildate';
let router = express.Router()


router.use('/users', userRouter);


router.use('/tasks', taskRouter);

export default router;