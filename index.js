const express = require('express');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const passportConfig = require('./config/passport')
const logger = require('./config/logger');

const sequelize = require('./models').sequelize;
const authRoutes = require('./controller/routes/auth');
const userRoutes = require('./controller/routes/user');
const challRoutes = require('./controller/routes/chall');
const noticeRoutes = require('./controller/routes/notice');
const logRoutes = require('./controller/routes/log');
const { corsOptions } = require('./config/secret.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(hpp());
app.use(helmet());
app.use(cors({
    origin: true,
    credentials: true,
    exposedHeaders: ['Content-Disposition']
}));
// app.use(cors(corsOptions));
passportConfig();

sequelize.sync();
// sequelize.sync({ force: true });
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', challRoutes);
app.use('/', noticeRoutes);
app.use('/', logRoutes);

app.use((req, res, next) => {
    const err = new Error('404');
    err.status = 404;
    err.message = 'Not Found';
    next(err);
})

app.use((err, req, res, next) => {
    logger(req, 'error', `500 Server error. Error log: ${err}`, err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server error",
        err
    });
})

const server = app.listen('1288', () => {
    const port = server.address().port;
    const host = server.address().host;
    console.log(`server listening on port ${port}`);
});