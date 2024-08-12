import { Router } from 'express';
import { createStudentController } from '../controllers/students.js';
import { deleteStudentController } from '../controllers/students.js';
import { upsertStudentController } from '../controllers/students.js';
import { patchStudentController } from '../controllers/students.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';

import {
  getStudentsController,
  getStudentByIdController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const studentsRouter = Router();

studentsRouter.get('/students', ctrlWrapper(getStudentsController));
studentsRouter.get(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post('/students', ctrlWrapper(createStudentController));
studentsRouter.delete(
  '/students/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController),
);

studentsRouter.put(
  '/students/:studentId',
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

studentsRouter.patch(
  '/students/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

studentsRouter.post(
  '/',
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

export default studentsRouter;
