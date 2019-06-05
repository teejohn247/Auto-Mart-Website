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
import viewUnsold from './routes/viewUnsold';
import PriceRange from './routes/priceRange';
import viewAllRoute from './routes/viewAll';
import usedUnsold from './routes/usedUnsold';
import viewAllNew from './routes/viewAllNew';
import documentation from '../swagger.json';

dotenv.config();
const debug = Debug('http');
const app = express();


const port = process.env.port || 5000;

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
app.use('/api/v1/cars', viewUnsold);
app.use('/api/v1/cars', PriceRange);
app.use('/api/v1/cars', viewAllRoute);
app.use('/api/v1/cars', usedUnsold);
app.use('/api/v1/cars', viewAllNew);

app.listen(port, () => {
    debug(`server is listening at port ${port}`);
});

