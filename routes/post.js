const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

fs.readdir('uploads', (error) => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();

router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const { content, url, category } = req.body;
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: req.user.id,
      category: category,
    });
    await post.save();

    // 사용자에게 포인트 추가
    const user = await User.findByPk(req.user.id);
    if (user.points == null) user.points = 0;
    user.points += 1; // 게시글 작성 시 1포인트를 추가
    if (user.points >= user.level*user.level){
      user.level ++;
    }
    await user.save();

    const hashtags = req.body.content.match(/#[^\s]*/g);

    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          })
        )
      );

      await post.addHashtags(result.map((r) => r[0]));
    }

    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/hashtag', async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({
              include: [{ model: User }],
              order: [['createdAt', 'DESC']], 
            });
        }
        return res.render('main', {
            title: `${query}`,
            user: req.user,
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.get('/category', async (req, res, next) => {
  const category = req.query.category;
  if (!category) {
      return res.redirect('/');
  }
  try {
      const posts = await Post.findAll({
          where: { category },
          include: [{ model: User }],
          order: [['createdAt', 'DESC']],
      });
      return res.render('main', {
          title: `${category}`,
          user: req.user,
          twits: posts,
          category: category, // 현재 선택된 카테고리명을 템플릿으로 전달
      });
  } catch (error) {
      console.error(error);
      return next(error);
  }
});


module.exports = router;
