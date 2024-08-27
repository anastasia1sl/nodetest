import { Router } from 'express';
import {
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
  getStudentsController,
  getStudentByIdController,
} from '../controllers/students.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { upload } from '../middlewares/multer.js';

const studentsRouter = Router();

studentsRouter.use(authenticate);

studentsRouter.get(
  '/',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(getStudentsController),
);

studentsRouter.get(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getStudentByIdController),
);

studentsRouter.post(
  '/register',
  checkRoles(ROLES.TEACHER),
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(createStudentController),
);

studentsRouter.put(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  upload.single('photo'),
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);

studentsRouter.patch(
  '/:studentId',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  upload.single('photo'),
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

studentsRouter.delete(
  '/:studentId',
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteStudentController),
);

export default studentsRouter;
