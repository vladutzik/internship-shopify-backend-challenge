import { Router } from 'express';
import Routes from '../../configs/routes';
import { version } from '../../../package.json';

import MenuRoutes from './menu';


let api = Router();

api.use(Routes.menu.index, MenuRoutes);

// perhaps expose some API metadata at the root
api.get('/', (req, res) => {
	res.json({ version });
});

export default api;
