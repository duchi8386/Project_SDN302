const User = require("../model/user.model");

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            res.status(404).json({
                status: 400,
                message: "User not found",
                localDate: new Date()
            });
        }
        res.status(200).json({
            status: 200,
            data: user,
            localDate: new Date()
        })
    } catch(error) {
        res.status(500).send({
            status: 500,
            message: error.message,
            localDate: new Date()
        })
    }
}