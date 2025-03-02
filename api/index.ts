// 1. All required import
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { app } from "./config";
import GlobalError from "./middlewares/GlobalError";
import ApiError from "./utils/ApiError";
// Imported Passport

// Imported Security
import cors from "cors";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import compression from "compression";
import expressMongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import helmet from "helmet";
import { I18n } from "i18n";
import path from "path";
// Imported Routes same order of routes files
import addressRoute from "./routes/addresses";
import archiveRoute from "./routes/archives";
import authRoute from "./routes/auth";
import commentRoute from "./routes/comments";
import likeRoute from "./routes/likes";
import postRoute from "./routes/posts";
import savedRoute from "./routes/saveds";
import testRoute from "./routes/tests";
import userRoute from "./routes/users";

// Todo: 2. Modify on the express.Request (req) to accept somerhing like: {req.files, req.user}
declare module "express" {
  interface Request {
    user?: any;
    fields?: any;
    filterData?: any;
  }
}
// 3. Middleware
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "http://localhost:3000",
      "https://blog-mern-inky.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-CSRF-Token",
      "X-API-KEY",
    ],
    credentials: true,
  })
);
// app.use(cookieParser());
// app.use(
//   csurf({
//     cookie: {
//       httpOnly: true,

//       sameSite: "strict",
//     },
//   })
// );
app.use(express.json({ limit: "2kb" }));
app.use(compression());
app.use(expressMongoSanitize());
app.use(hpp({ whitelist: ["category"] }));
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
const i18n = new I18n({
  locales: ["en", "ar"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  queryParameter: "lang",
});
app.use(i18n.init);
app.use(express.static("uploads"));
// http://localhost:5000/products/product-1726081638657-coverimg.webp if you want to open the img from the browser.

// 4. Passport

// 5. Routes
const mountRoutes = (app: express.Application) => {
  // app.use(
  //   (
  //     req: express.Request,
  //     res: express.Response,
  //     next: express.NextFunction
  //   ) => {
  //     res.cookie("cookies", req.csrfToken());
  //     next();
  //   }
  // );
  app.use("/api/v1/addresses", addressRoute);
  app.use("/api/v1/archives", archiveRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/comments", commentRoute);
  app.use("/api/v1/likes", likeRoute);
  app.use("/api/v1/posts", postRoute);
  app.use("/api/v1/saveds", savedRoute);
  app.use("/api/v1/tests", testRoute);
  app.use("/api/v1/users", userRoute);
  app.all(
    "**",
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      return next(
        new ApiError(400, `The Route ${req.originalUrl} Not Found !`)
      );
    }
  );
  app.use(GlobalError);
};
mountRoutes(app);
