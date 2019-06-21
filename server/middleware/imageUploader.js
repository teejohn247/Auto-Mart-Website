import cloudinary from 'cloudinary';

const imageUploader = (req, res, next) => {
 cloudinary.v2.uploader.upload(req.file.path, (error, result) => {
        req.body.product_image = result.secure_url;
        return next();
    });
};

export default imageUploader;
