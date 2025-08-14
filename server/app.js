const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appArror");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const clothRouter = require("./routes/clothRoutes");
const addressRouter = require("./routes/addressRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const cartRouter = require("./routes/cartRoutes");
const wishlistRouter = require("./routes/wishlistRoutes");

const corsOptions = {
  origin: " http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();

//MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json({ limit: "4Mb" }));
app.use(cookieParser());

//ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter); //for only admins
app.use("/api/v1/clothes", clothRouter);
app.use("/api/v1/addresses", addressRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/wishlists", wishlistRouter);

//CUSTOM ERROR MESSAGE FOR UNHANDLED ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`This route ${req.originalUrl} doesn't exist.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
