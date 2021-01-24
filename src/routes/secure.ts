import { Router } from 'express';

const router = Router();
const secureController = require('../controllers').secure;

router.post('/changediscount', secureController.changeDiscounts);
