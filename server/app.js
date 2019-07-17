import Debug from 'debug';
import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import { cloudinaryConfig } from './config/cloudinaryConfig';
import userRouter from './routes/user';
import carRoute from './routes/cars';
import purchaseOrder from './routes/purchaseOrder';
import priceRoute from './routes/updatePrice';
import postedRoute from './routes/updatePosted';
import viewCar from './routes/viewSpecific';
import viewOrders from './routes/viewOrder';
import viewAllRoute from './routes/viewAll';
import markAd from './routes/markAd';
import documentation from './swagger.json';
import getAds from './routes/getAds';
import userOrders from './routes/userOrderList';
import userAds from './routes/viewAdsList';
import adminAll from './routes/adminAll';


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

app.use(cors());
app.options('*', cors());

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};
app.use(allowCrossDomain);

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
app.use('/api/v1/order', viewOrders);
app.use('/api/v1/cars', viewAllRoute);
app.use('/api/v1/car', markAd);
app.use('/api/v1/ads', getAds);
app.use('/api/v1/auth', userOrders);
app.use('/api/v1/auth', userAds);
app.use('/api/v1/cars', adminAll);


app.listen(port, () => {
    debug(`server is listening at port ${port}`);
});


export default app;
