import http from 'http';
import https from 'https';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import api from './controllers/api';
import config from './config.json';

let app = express();
if (process.env.NODE_ENV === 'production') {
	app.server = https.createServer({}, app);
} else {
	app.server = http.createServer(app);
}

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

app.use('/api', api());

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
