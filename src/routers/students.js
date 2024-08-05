import { Router } from 'express';
import { createStudentController } from '../controllers/students.js';
import { deleteStudentController } from '../controllers/students.js';
import { upsertStudentController } from '../controllers/students.js';
import { patchStudentController } from '../controllers/students.js';

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

studentsRouter.post('/students', ctrlWrapper(createStudentController));
studentsRouter.delete(
  '/students/:studentId',
  ctrlWrapper(deleteStudentController),
);

studentsRouter.put(
  '/students/:studentId',
  ctrlWrapper(upsertStudentController),
);

studentsRouter.patch(
  '/students/:studentId',
  ctrlWrapper(patchStudentController),
);

export default studentsRouter;
