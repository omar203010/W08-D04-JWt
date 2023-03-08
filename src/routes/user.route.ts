import  express  from "express";
import {createUser, getAllUsers, login} from '../controllear/user.controllear'
import validate from "../middleware/vildate";
import { registrationSchema } from '../zode.schema/zod.users';
import auth from "../middleware/auth";

let router = express.Router();
// read
router.get('/', getAllUsers);

// create 
router.post('/',auth,validate(registrationSchema), createUser)
//log in
router.post('/login',login)




export default router;