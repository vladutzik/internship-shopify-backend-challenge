import { Router } from 'express';
import { version } from '../../../package.json';
import Menu from './menu/index';

export default () => {
	let api = Router();

	// mount the facets resource
	api.use('/validateMenu/:menuId', Menu.validate);
	api.use('/validateMenu', Menu.validate);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
