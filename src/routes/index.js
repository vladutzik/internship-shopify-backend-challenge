import { Router } from 'express';

import ApiRoutes from './api';

let api = Router();

api.use('/api', ApiRoutes);

export default api;

