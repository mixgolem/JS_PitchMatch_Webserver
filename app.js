const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const favicon = require('serve-favicon');//파비콘
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

require('dotenv').config();

//라우터 선언 및 경로 연결
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/users');
const eplRouter = require('./routes/epl');

const passportConfig = require('./passport');
const { sequelize } = require('./models');    //시퀼라이즈 연결을 위해

const app = express();
sequelize.sync();   //시퀼라이즈 동기화
passportConfig(passport);


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');
app.set('port', process.env.PORT || 8001);


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use('/img', express.static(path.join(__dirname,'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);       //기본 경로
app.use('/auth', authRouter);   //로그인 처리
app.use('/post', postRouter);   //게시글 작성
app.use('/user', userRouter);   //사용자 정보
app.use('/epl', eplRouter);     //축구 데이터

//에러처리부분
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//개발용
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') ==='development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

//서버 오픈
app.listen(app.get('port'), () => {
  console.log(app.get('port'),'번 포트에서 대기 중');
});
