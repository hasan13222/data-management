"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/module/product/product.route");
const app = (0, express_1.default)();
// json parser
app.use(express_1.default.json());
// cors middleware
app.use((0, cors_1.default)());
// endpoints
app.use('/api/products', product_route_1.ProdcutRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the data management application');
});
exports.default = app;
