import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import { HealthRoutes } from "./routes/health.routes";
import { AuthRoutes } from "./routes/auth.routes";

import { createHealthModule } from "./factories/health.factory";
import { createUserModule } from "./factories/user.factory";

import { createPassport } from "./config/passport";
import { createAuthModule } from "./factories/auth.factory";
import { verifyToken } from "./middlewares/auth.middleware";

dotenv.config();

const app = express();

app.use(cors({}));
app.use(morgan("combined"));
app.use(express.json());

const { healthController } = createHealthModule();
const { userService } = createUserModule();
const { authController } = createAuthModule();

const passport = createPassport(userService)

app.use(passport.initialize());

const authRoutes = new AuthRoutes(authController, passport);
app.use("/auth", authRoutes.router)

app.use(verifyToken)

const healthRoutes = new HealthRoutes(healthController);
app.use("/api/logs", healthRoutes.router);


export default app;
