import { Router } from 'express';
import path from 'path';

import ApiRoutes from './api';

let api = Router();

api.use('/api', ApiRoutes);

api.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/main.html'));
});

export default api;

