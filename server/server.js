const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const notificationRouter = require("./routes/notification.router");
const manuscriptRouter = require("./routes/manuscript.router");
const circlesRouter = require("./routes/circles.router");
const commentsRouter = require("./routes/comments.router");
const messagesRouter = require("./routes/messages.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/manuscript",  manuscriptRouter);
app.use("/api/notification", notificationRouter);
app.use("/manuscript", manuscriptRouter);
app.use("/api/circles", circlesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/messages", messagesRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
