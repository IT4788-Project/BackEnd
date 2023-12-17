const db = require('../models');
const User = db.user;
const crypto = require('crypto');
const JwtService = require("../services/jwtServices.js");
const {BadRequestError, UnauthorizedError, ValidationError} = require("../utils/apiError.js");
const sendMail = require('../middlerwares/sendMail.js')
let resetUserId;

const login = async (req, res) => {
    try {
        const {email,password}= req.body
        // check user is exist
        const user = await User.findOne({where:{email}})
        if(!user)
            new BadRequestError("User not found")
        const isPassword = await user.checkPassword(password)
        if(!isPassword)
            new UnauthorizedError("Invalid password");
        // create token
        console.log(">>>>user"+user.id)
        const accessToken = JwtService.jwtSign(user.id,{expiresIn: "7d"});
        console.log(" >>>>>> accessToken")
        console.log(accessToken)
        // hide password
        const {name:hashedName,email: hashedEmail,password : hashedPassword, ...userDate} = user.get()
        const resBody  = {
            accessToken,
            userDate
        }
        return res.status(200).json({
            success : true,
            resBody
        });
    } catch (error) {
        return res.status(400).json({msg: error.message});
    }
}
const logout = async (req, res) => {
    try {
        JwtService.jwtBlacklistToken(JwtService.jwtGetToken(req));
        res.status(200).json({
            success:true,
            msg: "Authorized"});
    } catch (error) {
        next(error);
    }
}

const forgotPassword = async (req, res) => {
    try {
        const {email} = req.body
        console.log("email:", email);
        if (!email) {
            return (res.status(400).json({success: false, mes: "Email không tồn tại"}))
        }
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw new BadRequestError("User not found");
        }
        console.log("user có tồn tai");
        const verificationCode = await user.createPasswordChangedToken()
        console.log("code da luu chua");
        console.log("code:", verificationCode);
        await user.save();
        console.log("user da luu ");
        const passwordCode = crypto.createHash('sha256').update(verificationCode.toString()).digest('hex');
        console.log("hashedToken:", passwordCode);
        const html = `Chúc mừng bạn đến với GoodBody, đây là mã code của bạn: ${verificationCode}. Mã này sẽ hết hạn trong 15 phút.`;
        const data = {
            email,
            html
        }
        console.log(data);
        const rs = await sendMail(data)
        return res.status(200).json({
            success: true,
            rs
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            mes: error.message
        })
    }
}

const checkCode = async (req, res) => {
    try {
        const {verificationCode} = req.body;
        console.log("verificationCode:", verificationCode)
        if (!verificationCode) throw new Error('Missing inputs');
        console.log("code :" + verificationCode);
        const passwordCode = crypto.createHash('sha256').update(verificationCode.toString()).digest('hex');
        console.log("hashedToken:", passwordCode);
        const user = await User.findOne({passwordCode, codeResetExpires: {$gt: Date.now()}})
        console.log("user:", user.id);
        if (!user) {
            res.status(400).json({success: false, mes: "Mã code không tồn tại"})
        }
        resetUserId = user.id;
        console.log("resetUserId:", resetUserId)
        res.status(200).json({success: true, mes: "Mã code hợp lệ"})
    } catch (error) {
        console.error('Error in checkCode:', error.message);
        res.status(500).json({success: false, mes: error.message})
        return false;
    }
};

const resetPassword = async (req, res) => {
    try {
        const {newPassword} = req.body;
        console.log("password: " + req.body);
        if (!newPassword) return res.status(400).json({success: false, message: 'Missing inputs'});
        const user = await User.findOne({where: {id: resetUserId}});
        if (!user) return res.status(404).json({success: false, message: 'User not found'});
        console.log("user_reset:", user.id);
        user.password = newPassword;
        user.passwordCode = null;
        user.passwordChangedAt = Date.now();
        user.codeResetExpires = null;
        await user.save();
        return res.status(200).json({
            success: true,
            message: 'Password updated',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: 'Something went wrong'});
    }
};
module.exports = {
    login,
    logout,
    checkCode,
    forgotPassword,
    resetPassword
}
