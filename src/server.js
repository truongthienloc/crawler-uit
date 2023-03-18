require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import expressEjsLayouts from 'express-ejs-layouts';
import configViewEngine from './configs/configViewEngine';
import { rootRoute, viewRoute } from './routes';

const app = express();

const port = process.env.PORT || 8080;

// config app
app.use(expressEjsLayouts);
configViewEngine(app);

// config middleware
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// config routes
app.use('/', viewRoute);
app.use('/', rootRoute);

// start app
app.listen(port, () => {
    console.log(`App is running in port: ${port}`);
});
