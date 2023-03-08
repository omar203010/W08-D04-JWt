import  express ,{Application,Request,Response} from "express";
import { PrismaClient } from '@prisma/client'
import routes from './routes/routes'
const port = process.env.PORT || 3006;
const app:Application = express();
const prisma = new PrismaClient()
import * as dotenv from 'dotenv'
import cors from 'cors';

app.use(cors());

dotenv.config();

app.use(express.json());


app.use("/", routes)






const PORT = 8000;
app.listen(PORT, () => {console.log("server listening on port " + PORT);
});
