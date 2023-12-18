const db = require('../models');
const JwtService = require("../services/jwtServices.js");
const {BadTokenError} = require("../utils/apiError.js");

const authMiddleware = async (req, res, next) => {
    try {
        if (process.env.SERVER_JWT === "false") return next();
        console.log(">>>>>>>token1<<<<<<<<<");
        const token = JwtService.jwtGetToken(req);
        console.log("Received Token in Middleware:", token);
        const decoded = JwtService.jwtVerify(token);
        console.log("Decoded Token in Middleware:", decoded);
        req.userId = decoded.userId;
        return next();
    } catch (e) {
        console.log(e)
        res.status(401).json(
            {JSON : new BadTokenError()}
        )
    }
};

module.exports = {
    authMiddleware
}