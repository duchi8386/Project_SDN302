const Cart = require("../model/cart.model");
const Product = require("../model/product.model");
const Order = require("../model/order.model");
const Payment = require("../model/payment.model");

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.userId;

        // Kiểm tra sản phẩm có tồn tại không
        const product = await Product.findById(productId);
        if (!product || product.status !== "active") {
            return res.status(404).json({ message: "Product not found or inactive" });
        }

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json({ message: "Added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.viewCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const cart = await Cart.findOne({ user: userId }).populate("items.product");

        if (!cart) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
