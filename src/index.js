import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import Routes from './routes';
import config from './config.json';

let app = express();
app.use(express.static(__dirname + '/src/templates'));
app.server = http.createServer(app);
app.enable('trust proxy')
// logger
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use('/', Routes);

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
