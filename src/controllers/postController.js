const db = require('../models');
const Yup = require('yup');
const Post = db.post;
const Image = db.image;
const LikePost = db.likePost;
const CommentPost = db.comment;
const User = db.user;
const sequelize = require('sequelize')
const {singleQuote} = require("nodemailer/.prettierrc");

const CreatePostSchema = () => {
  return Yup.object().shape({
    content: Yup.string().required(),
    images: Yup.array(
      Yup.string().url().required()
    ).nullable(),
    isPublic: Yup.boolean().required()
  });
}

const CommentPostSchema = () => {
  return Yup.object().shape({
    comment: Yup.string().required(),
  });
}

const createPost = async (req, res) => {
  try {
    await CreatePostSchema().validate(req.body, {abortEarly: false});
    const post = await Post.create({
      content: req.body.content,
      isPublic: req.body.isPublic,
      author: req.user.id
    })
    if (req.body.images)
      await Image.bulkCreate(req.body.images.map(image => {
        return {
          image_path: image,
          postId: post.id,
          userId: req.user.id
        }
      }))
    return res.status(201).json({
      statusCode: 201,
      message: "Created",
      data: "oke"
    });
  } catch (e) {
    return res.status(400).json({
      statusCode: 400,
      error: e?.errors || e?.message
    })
  }

};

const reactionPost = async (req, res) => {
  try {
    const {postId} = req.params;

    if (!postId)
      throw new Error("Invalid post Id");
    const post = await Post.findByPk(postId)
    if (!post)
      throw new Error("Invalid post")

    const hasReaction = await LikePost.findOne({
      where: {
        postId: postId,
        userId: req.user.id
      }
    })
    if (!hasReaction) {
      await Promise.all([
        Post.update({
          countLike: sequelize.literal('countLike + 1')
        }, {
          where: {
            id: postId
          }
        }),
        LikePost.create({
          postId: postId,
          userId: req.user.id
        })
      ])
    } else {
      await Promise.all([
        Post.update({
          countLike: sequelize.literal('countLike - 1')
        }, {
          where: {
            id: postId
          }
        }),
        LikePost.destroy({
          where: {
            postId: postId,
            userId: req.user.id
          }
        })
      ])
    }

    return res.status(201).json({
      statusCode: 201,
      message: "Created",
      data: "oke"
    });
  } catch (e) {
    return res.status(400).json({
      statusCode: 400,
      error: e?.errors || e?.message
    })
  }

};
const commentPost = async (req, res) => {
  try {
    await CommentPostSchema().validate(req.body, {abortEarly: false});

    const {postId} = req.params;

    if (!postId)
      throw new Error("Invalid post Id");

    const post = await Post.findByPk(postId)

    if (!post)
      throw new Error("Invalid post")

    await Promise.all([
      Post.update({
        countComment: sequelize.literal('countComment + 1')
      }, {
        where: {
          id: postId
        }
      }),
      CommentPost.create({
        postId: postId,
        userId: req.user.id,
        comment: req.body.comment,
        date: new Date().toISOString()
      })
    ])

    return res.status(201).json({
      statusCode: 201,
      message: "Created",
      data: "oke"
    });
  } catch (e) {
    return res.status(400).json({
      statusCode: 400,
      error: e?.errors || e?.message
    })
  }
};

const getDetailPost = async (req, res) => {
  try {
    const {postId} = req.params;
    if (!postId)
      throw new Error("Invalid post Id");
    const post = await Post.findByPk(postId, {
      include: [{model: CommentPost, attributes: ['comment', 'date']}, {model: Image, attributes: ['image_path']}]
    })
    if (!post)
      throw new Error("Invalid post")

    return res.status(200).json({
      statusCode: 200,
      message: "Success",
      data: post
    });
  } catch (e) {
    return res.status(400).json({
      statusCode: 400,
      error: e?.errors || e?.message
    })
  }
};
const getNewPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        author: {
          [sequelize.Op.not]: req.user.id
        },
      limit: 20,
      order: [
        ["createdAt", "DESC"]
      ],
      include: [{
        model: CommentPost, attributes: ['comment', 'date'], include: [
          {model: User, attributes: ['name']}
        ]
      }, {model: Image, attributes: ['image_path']},
        {model: LikePost, attributes: ['userId']}
      ]

    })
    return res.status(200).json({
      statusCode: 200,
      message: "Success",
      data: posts
    });
  }} catch (e) {
    return res.status(400).json({
      statusCode: 400,
      error: e?.errors || e?.message
    })
  }

const getPostMe = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        author: req.user.id
      },
      order: [
        ["createdAt", "DESC"]
      ],
      include: [{
        model: CommentPost, attributes: ['comment', 'date'], include: [
          {model: User, attributes: ['name']}
        ]
      }, {model: Image, attributes: ['image_path']},
        {model: LikePost, attributes: ['userId']}
      ]
    })
    return res.status(200).json({
      statusCode: 200,
      message: "Success",
      data: posts
    });
  } catch (e) {
    return res.status(400).json({
      statusCode: 400,
      error: e?.errors || e?.message
    })
  }
};
module.exports = {
  createPost,
  reactionPost,
  commentPost,
  getDetailPost,
  getNewPosts,
  getPostMe
}