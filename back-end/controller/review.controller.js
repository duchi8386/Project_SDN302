const Review = require("../model/review.model");
const Product = require("../model/product.model");

exports.createReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user.userId;

        const existedProduct = await Product.findById(productId);
        if(!existedProduct) {
            res.status(400).json({
                status: 400,
                message: "Product not found",
                localDate: new Date()
            });
        }

        const newReview = new Review({
            user: userId,
            product: productId,
            rating,
            comment
        });

        await newReview.save();

        res.status(201).json({
            status: 201,
            message: "Create review successfully",
            localDate: new Date()
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
            localDate: new Date()
        })
    }
}

exports.getReviewsByProductId = async (req, res) => {
    try {
        const { productId } = req.params;

        const existedProduct = await Product.findById(productId);
        if (!existedProduct) {
            return res.status(404).json({
                status: 404,
                message: "Product not found",
                localDate: new Date(),
            });
        }

        const reviews = await Review.find({ product: productId })
            .populate("user", "fullName email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            status: 200,
            message: "Reviews retrieved successfully",
            data: reviews,
            localDate: new Date(),
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
            localDate: new Date(),
        });
    }
};
