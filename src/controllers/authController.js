const db = require('../models');
const User = db.user;
const { Op } = require("sequelize");
const crypto = require('crypto');
const Yup = require('yup');
const JwtService = require("../services/jwtServices.js");
const {BadRequestError, UnauthorizedError, ValidationError} = require("../utils/apiError.js");
const sendMail = require('../middlerwares/sendMail.js')

const login = async (req, res) => {
    try {
        const schema = Yup.object().shape({
            email: Yup.string().email().required().test(
                'is-gmail',
                'Email must be a Gmail address',
                (value) => {
                    if (value) {
                        return value.endsWith('@gmail.com');
                    }
                    return false;
                }
            ),
            password: Yup.string().required(),
        });
        try {
            await schema.validate(req.body);
        } catch (e) {
            console.error(e)
            return res.status(400).json({
                    statusCode : 400,
                    message:"Bad Request",
                    error:e.errors
                }
            );
        }
        let { email, password } = req.body;
        const user = await User.findOne({
            where: {
            [Op.or]: [
                {email: email,
                    status: true},
            ],
        },
                });
        if (!user) {
            return res.status(401).json({
                statusCode : 401,
                message:"Unauthorized",
                error: 'User does not exist'
            });
        }
        const isPasswordValid = await user.checkPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({
                statusCode : 401,
                message:"Unauthorized",
                error: 'Invalid password.'
            });
        }
        const accessToken = JwtService.jwtSign(user.id, { expiresIn: '7d' });
        const { name, email: userEmail, ...userData } = user.get();
        const text = {
            accessToken,
            userData,
        };
        return res.status(200).json({
            statusCode: 200,
            message:"OK",
            text,
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error',
            error:e.errors
        });
    }
};
const logout = async (req, res) => {
    try {
        JwtService.jwtBlacklistToken(JwtService.jwtGetToken(req));
        res.status(200).json({
            statusCode: 200,
            message:"Log out successfully",
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error',
            error: e.errors
        });

    }
}
const forgotPassword = async (req, res) => {
    try {
        const schema = Yup.object().shape({
            email: Yup.string().email().required().test(
                'is-gmail',
                'Email must be a Gmail address',
                (value) => {
                    if (value) {
                        return value.endsWith('@gmail.com');
                    }
                    return false;
                }
            ),
        });
        try {
            await schema.validate(req.body);
        } catch (e) {
            console.error(e)
            return res.status(400).json({
                    statusCode : 400,
                    message:"Bad Request",
                    error:e.errors
                }
            );
        }
        let { email } = req.body;

        const user = await User.findOne({
            where: {
                [Op.or]: [
                    {email: email,
                        status: true},
                ],
            },
        });
        if (!user) {
            return res.status(401).json({
                statusCode : 401,
                message:"Unauthorized",
                error: 'User does not exist'
            });
        }
        console.log("user có tồn tai");
        const verificationCode = await user.createPasswordChangedToken()
        console.log("code da luu chua");
        console.log("code:", verificationCode);
        await user.save();
        resetUserId= user.id;
        console.log(">>>>>>!>>>>>!>>>>1>"+resetUserId)
        console.log("user da luu ");
        const passwordCode = crypto.createHash('sha256').update(verificationCode.toString()).digest('hex');
        console.log("passwordCode:", passwordCode);
        const html = `Chúc mừng bạn đến với GoodBody, đây là mã code của bạn: ${verificationCode}. Mã này sẽ hết hạn trong 15 phút.`;
        const text = {
            email,
            html
        }
        console.log(text);
        const rs = await sendMail(text)
        return res.status(200).json({
            statusCode: 200,
            message:"OK",
            data:rs
        })
    } catch (e) {
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error',
            error: e.errors
        })
    }
}
const checkCode = async (req, res) => {
    try {
        const schema = Yup.object().shape({
            email:Yup.string().required(),
            verificationCode: Yup.number().required(),
        });
        try {
            await schema.validate(req.body);
        } catch (e) {
            console.error(e);
            return res.status(400).json({
                statusCode: 400,
                message: "Bad Request",
                error: e.errors,
            });
        }
        console.log("verificationCode");
        const {email,inputVerificationCode} = req.body;
        console.log("code:", inputVerificationCode);
        const hashedVerificationCode = crypto
            .createHash("sha256")
            .update(inputVerificationCode.toString())
            .digest("hex");
        console.log("hashedToken:", hashedVerificationCode);
        const user = await User.findOne({
            where: {
                email:email,
                passwordCode: hashedVerificationCode,
                codeResetExpires: {
                    [Op.gt]: Date.now(),
                },
            },
        });

        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                message: "Bad Request",
            });
        }
        console.log("user:", user.id);
        console.log("resetUserId:", resetUserId)
        if(resetUserId===user.id){
            res.status(200).json({
                statusCode: 200,
                message: "OK",
                notification: "Valid code",
            });
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error",
            error: e.errors
        });
    }
};
const resetPassword = async (req, res) => {
    try {
        const schema = Yup.object().shape({
            email:Yup.string().required(),
            newPassword:Yup.string().required().min(8),
        });
        let {email, newPassword} = req.body
        try {
            await schema.validate(req.body);
        } catch (e) {
            console.error(e)
            return res.status(400).json({
                    statusCode : 400,
                    message:"Bad Request",
                    error:e.errors
                }
            );
        }
        const user = await User.findOne({where: {
                email: email}});
        if (!user) {
            return res.status(400).json({
                statusCode : 400,
                message:"Bad Request",
            });
        }
        console.log("user_reset:", user.id);
        user.password = newPassword;
        user.passwordCode = null;
        user.passwordChangedAt = Date.now();
        user.codeResetExpires = null;
        await user.save();
        console.log("user:", user.id);
        console.log("resetUserId:", resetUserId)
        return res.status(200).json({
            statusCode: 200,
            message: 'OK',
            notification: "Password updated"
        });
    } catch (e) {
        return res.status(500).json({
            statusCode: 500,
            message: 'Internal Server Error',
            error: e.errors
        })
    }
};
module.exports = {
    login,
    logout,
    checkCode,
    forgotPassword,
    resetPassword
}
