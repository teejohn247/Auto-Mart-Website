import posted from '../models/postCars';

const allposted = (req, res) => {
  res.status(200).json({
    status: 200,
    data: posted,
  });
};
export default allposted;
