import express from 'express';
import { createTask, updateTask, deleteTask, getAllTasks} from '../controllear/task.controllear';
import { createSchema, updateSchema, deleteSchema } from '../zode.schema/zod.tasks';
import validate from '../middleware/vildate';
import auth from '../middleware/auth';


const router = express.Router();

router.get('/',getAllTasks);
router.post('/',auth,validate(createSchema),createTask);
router.put('/:id',auth,validate(updateSchema),updateTask);
router.delete('/:id',auth,validate(deleteSchema),deleteTask);


export default router;