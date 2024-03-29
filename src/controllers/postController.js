const db = require('../models');
const Yup = require('yup');
const Post = db.post;
const Image = db.image;
const LikePost = db.likePost;
const CommentPost = db.comment;
const User = db.user;
const {Op} = require('sequelize');
const ReportPost = db.reportPost
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
          // userId: req.user.id
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
      include: [
        {
          model: CommentPost,
          attributes: ['comment', 'date'],
          include: [
            {
              model: User,
              attributes: ['id', 'name'],
              include: {
                model: Image,
                attributes: ['image_path'],
              },
            },
          ],
        },
        {model: Image, attributes: ['image_path']},
        {model: LikePost, attributes: ['userId']},
        {
          model: User, attributes: ['id', 'name'],
          include: {model: Image, attributes: ['image_path']}
        },
      ],
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
    console.log("userId:", req.user.id);
    const authorId = req.user.id;
    const posts = await Post.findAll({
      where: {
        author: {
          [Op.not]: authorId
        }
      },
      limit: 20,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: CommentPost,
          attributes: ['comment', 'date'],
          include: [
            {
              model: User,
              attributes: ['id', 'name'],
              include: {
                model: Image,
                attributes: ['image_path'],
              },
            },
          ],
        },
        {model: Image, attributes: ['image_path']},
        {model: LikePost, attributes: ['userId']},
        {
          model: User, attributes: ['id', 'name'],
          include: {model: Image, attributes: ['image_path']}
        },
      ],
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Success",
      data: posts,
    });
  } catch (e) {
    return res.status(400).json({
      statusCode: 400,
      error: e?.errors || e?.message,
    });
  }
};

const getPostByMe = async (req, res) => {
  try {
    let authorId = req.user.id;
    console.log("userId:", req.user.id);
    const posts = await Post.findAll({
      where: {
        author: authorId
      },
      limit: 20,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: CommentPost,
          attributes: ['comment', 'date'],
          include: [
            {
              model: User,
              attributes: ['id', 'name'],
              include: {
                model: Image,
                attributes: ['image_path'],
              },
            }
          ]
        },
        {model: Image, attributes: ['image_path']},
        {model: LikePost, attributes: ['userId']},
        {
          model: User, attributes: ['id', 'name'],
          include: {model: Image, attributes: ['image_path']}
        },
      ]
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Success",
      data: posts
    });
  } catch (e) {
    return res.status(400).json({
      statusCode: 400,
      error: e?.errors || e?.message
    });
  }
};

const reportPost = async (req, res) => {
  try {
    const {postId} = req.params;

    if (!postId)
      throw new Error("Invalid post Id");
    const post = await Post.findByPk(postId)
    if (!post)
      throw new Error("Invalid post")

    const hasReport = await ReportPost.findOne({
      where: {
        postId: postId,
        userId: req.user.id
      }
    })
    if (!hasReport) {
      await Promise.all([
        Post.update({
          countReport: sequelize.literal('countReport + 1')
        }, {
          where: {
            id: postId
          }
        }),
        ReportPost.create({
          postId: postId,
          userId: req.user.id
        })
      ])
    } else {
      await Promise.all([
        Post.update({
          countReport: sequelize.literal('countReport - 1')
        }, {
          where: {
            id: postId
          }
        }),
        ReportPost.destroy({
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


}
const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;
    const post = await Post.findOne({
      where: {
        id: postId,
        author: userId
      }
    });
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

module.exports = {
  createPost,
  reactionPost,
  commentPost,
  getDetailPost,
  getNewPosts,
  getPostByMe,
  reportPost,
  deletePost
}