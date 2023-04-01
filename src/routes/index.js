import express from 'express';
import crawlerRoute from './crawlerRoute';

const rootRoute = express.Router();

rootRoute.use('/crawler', crawlerRoute);

export { rootRoute };
export { default as viewRoute } from './viewRoute';
