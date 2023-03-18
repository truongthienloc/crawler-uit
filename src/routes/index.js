import express from 'express';

const rootRoute = express.Router();

export { rootRoute };
export { default as viewRoute } from './viewRoute';
