import { Router } from 'express';

import {
  getStudentsController,
  getStudentByIdController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper';

const studentsRouter = Router();

studentsRouter.get('/students', ctrlWrapper(getStudentsController));
studentsRouter.get(
  '/students/:studentId',
  ctrlWrapper(getStudentByIdController),
);

export default studentsRouter;
