const db = require('../models')
const jwt = require('jsonwebtoken');
const Admins = db.admin
const User = db.user;
const {Op} = require('sequelize');
const Post = db.post;
const registerAdmins = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({error: "Bad request: Missing request body"})
    }
    const inf = {
      userName: req.body.userName,
      passWord: req.body.passWord,
      fullName: req.body.fullName,
      email: req.body.email
    }
    const admin = await Admins.create(inf)
    console.log(admin)
    const token = jwt.sign({userId: admin.id, userName: admin.userName}, 'LuckyAndPower', {expiresIn: '24h'});
    return res.status(201).json({token, message: 'Register Success'})
  } catch (error) {
    console.log(error);
    // Handle SequelizeUniqueConstraintError
    if (error.name === 'SequelizeUniqueConstraintError') {
      let customMessage = 'Tai Khoan Da Ton Tai';
      return res.status(409).json({error: customMessage});
    }
    res.status(500).json({error: "Internal Server Error"});
  }
};

const loginAdmins = async (req, res) => {
  try {
    const {userName, passWord} = req.body;

    const admin = await Admins.findOne({where: {userName, passWord}});

    if (!admin) {
      return res.status(401).json('Incorrect UserName or PassWord');
    }

    const token = jwt.sign({
      userId: admin.id,
      userName: admin.userName,
      isSystem: admin.isSystemAdmin
    }, 'LuckyAndPower', {expiresIn: '100h'});
    let fullName = admin.fullName;
    return res.json({
      token,
      fullName,
      message: 'Login Success'
    });
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
};

const checkToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    // Tách phần "Bearer " khỏi token
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, 'LuckyAndPower');
    if (decoded) {
      const userName = decoded.userName;
      console.log('User Name:', userName);
      // Truy vấn tất cả thông tin trừ mật khẩu từ userName trong cơ sở dữ liệu
      const admin = await Admins.findOne({
        where: {userName: userName},
        attributes: {exclude: ['passWord']}
      });
      if (admin) {
        res.status(200).json({admin: admin, message: "Success"});
      } else {
        res.status(404).json({error: "Admin not found for the given userName"});
      }
    } else {
      res.status(401).json({error: "Unauthorized"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal Server Error"});
  }
};
const getAdminPassword = async (userName) => {
  try {
    const admin = await Admins.findOne({
      where: {userName: userName},
    });

    return admin ? admin.passWord : null;
  } catch (error) {
    return res.status(404).json({error: "Admin not found"});
  }
};
// Middleware to extract and verify the token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({error: 'Unauthorized - Token not provided'});
  }

  // Tách phần "Bearer " khỏi token
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({error: 'Unauthorized - Invalid token format'});
  }
  // console.log(token)
  jwt.verify(token, 'LuckyAndPower', (err, decoded) => {
    if (err) {
      return res.status(401).json({error: 'Unauthorized - Invalid token'});
    }
    req.userName = decoded.userName;
    next();
  });
};
const verifyTokenSysTem = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({error: 'Unauthorized - Token not provided'});
  }
  // Tách phần "Bearer " khỏi token
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({error: 'Unauthorized - Invalid token format'});
  }
  jwt.verify(token, 'LuckyAndPower', (err, decoded) => {
    if (err) {
      return res.status(401).json({error: 'Unauthorized - Invalid token'});
    }
    if (!decoded.isSystem) {
      console.log(decoded.isSystem)
      return res.status(403).json({error: 'Forbidden - You are not system admin'});
    }
    req.userName = decoded.userName
    next();
  });
};

const updatePassword = async (req, res) => {
  try {
    const userName = req.userName;
    const {oldPassword, newPassword} = req.body;

    const currentPassword = await getAdminPassword(userName);

    if (oldPassword === currentPassword) {
      // console.log(newPassword)
      const [updatedRowsCount, updatedPassword] = await Admins.update(
        {passWord: newPassword},
        {where: {userName}, returning: true}
      );
      if (updatedRowsCount === 0) {
        res.status(404).json({error: "Cập nhật mật khẩu không thành công"});
        return;
      }
      res.status(200).json({message: "Thay đổi mật khẩu thành công"});
    } else {
      res.status(400).json({error: "Mật khẩu cũ không đúng"});
    }
  } catch (error) {
    res.status(500).json({error: "Internal Server Error"});
  }
}
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(
      users
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

// Find user by username
const getUserByUsername = async (req, res) => {
  const {username} = req.body;
  try {
    const user = await User.findAll({where: {name: username}});
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

// Find user by email
const getUserByEmail = async (req, res) => {
  const {email} = req.body;

  try {
    const user = await User.findAll({where: {email}});

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};


const getUserByEmailAndUsername = async (req, res) => {
  const {email, username} = req.body;

  try {
    const user = await User.findAll({where: {email, name: username}});

    if (user.length) {
      res.status(200).json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const [updatedRows] = await User.update(req.body, {where: {id: id}});
    if (updatedRows === 0) {
      return res.status(404).json({error: 'User not found'});
    }

    return res.status(200).json('Cập nhật thành công');
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedRows = await User.destroy({where: {id: id}});
    if (deletedRows === 0) {
      return res.status(404).json({error: 'User not found'});
    }
    res.status(200).json('Xóa thành công User');


  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};
const getAllPostReport = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        countReport: {
          [Op.gt]: 0
        }
      }
    });
    if (posts.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: 'Post not found'
      });
    }
    return res.status(200).json(
      posts
    );
  } catch (e) {
    return res.status(500).json({
      statusCode: 500,
      error: e?.errors || e?.message || "Internal Server Error"
    });
  }
};
const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: "Post not found"
      });
    }
    await post.destroy();
    return res.status(200).json({
      statusCode: 200,
      message: "Deleted successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
      error: e.errors
    });
  }
}
const sortPost = async (req, res) => {
  try {
    console.log('sortPost')
    const posts = await Post.findAll({
      where: {
        countReport: {
          [Op.gt]: 0
        }
      },
      order: [
        ['countReport', 'DESC']
      ],
      limit: 10 // Thêm thuộc tính limit để lấy top 10 bài viết
    });

    if (posts.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: "Not Found",
        error: 'Post not found'
      });
    }

    return res.status(200).json(posts);
  } catch (e) {
    return res.status(500).json({
      statusCode: 500,
      error: e?.errors || e?.message || "Internal Server Error"
    });
  }
}


module.exports = {
  registerAdmins,
  loginAdmins,
  checkToken,
  updatePassword,
  verifyToken,
  getAllUsers,
  getUserByUsername,
  getUserByEmail,
  getUserByEmailAndUsername,
  updateUser,
  deleteUser,
  verifyTokenSysTem,
  getAllPostReport,
  deletePost,
  sortPost
}
