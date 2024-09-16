"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const imageRoutes_1 = __importDefault(require("./routes/imageRoutes")); // Your routes
// app.ts
const app = (0, express_1.default)();
exports.app = app;
// Enable CORS for all routes and origins
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Allow your frontend origin
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true, // If you're using cookies
}));
app.use(express_1.default.json());
app.use('/api', imageRoutes_1.default); // Mount your routes
