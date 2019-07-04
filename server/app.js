import Debug from 'debug';
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { cloudinaryConfig } from './config/cloudinaryConfig';
import userRouter from './routes/user';
import carRoute from './routes/cars';
import purchaseOrder from './routes/purchaseOrder';
import priceRoute from './routes/updatePrice';
import postedRoute from './routes/updatePosted';
import viewCar from './routes/viewSpecific';
import view from './routes/viewUnsold';
import PriceRange from './routes/priceRange';
import viewAllRoute from './routes/viewAll';
import usedUnsold from './routes/usedUnsold';
import viewAllNew from './routes/viewAllNew';
import markAd from './routes/markAd';
import unsoldMake from './routes/viewUnsoldMake';
import allOrders from './routes/allOrders';
import newUnsold from './routes/newUnsold';
import bodyType from './routes/bodyTypes';
import documentation from './swagger.json';
import getAds from './routes/getAds';

dotenv.config();
const debug = Debug('http');
const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use('/automart', swaggerUi.serve, swaggerUi.setup(documentation));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));
app.use('*', cloudinaryConfig);

app.get('/api/v1', (req, res) => {
    res.json({
      message: 'Welcome to Auto-Mart API'
    });
  });

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/car', carRoute);
app.use('/api/v1/order', purchaseOrder);
app.use('/api/v1/order', priceRoute);
app.use('/api/v1/cars', postedRoute);
app.use('/api/v1/car', viewCar);
app.use('/api/v1/auth', view);
app.use('/api/v1/cars', PriceRange);
app.use('/api/v1/cars', viewAllRoute);
app.use('/api/v1/check', usedUnsold);
app.use('/api/v1/cars', newUnsold);
app.use('/api/v1/cars', viewAllNew);
app.use('/api/v1/car', markAd);
app.use('/api/v1/car', bodyType);
app.use('/api/v1/make', unsoldMake);
app.use('/api/v1/vieworders', allOrders);
app.use('/api/v1/viewads', getAds);

app.listen(port, () => {
    debug(`server is listening at port ${port}`);
});

export default app;
