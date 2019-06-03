import Debug from 'debug';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from 'morgan';
import userRouter from './routes/user';
import carRoute from './routes/cars';
import purchaseOrder from './routes/purchaseOrder';
import priceRoute from './routes/updatePrice';
import postedRoute from './routes/updatePosted';
import viewCar from './routes/viewSpecific';

dotenv.config();
const debug = Debug('http');
const app = express();

const port = process.env.port || 5000;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


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

app.listen(port, () => {
    debug(`server is listening at port ${port}`);
});

