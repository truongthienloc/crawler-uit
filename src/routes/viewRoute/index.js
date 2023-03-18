import express from 'express';
import { viewController } from '~/controllers';

const viewRoute = express.Router();

viewRoute.get('/', viewController.getHomepage);

export default viewRoute;
