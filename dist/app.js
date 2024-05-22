"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/module/product/product.route");
const order_route_1 = require("./app/module/order/order.route");
const app = (0, express_1.default)();
// json parser
app.use(express_1.default.json());
// cors middleware
app.use((0, cors_1.default)());
// endpoints
// products
app.use('/api/products', product_route_1.ProdcutRoutes);
// orders
app.use('/api/orders', order_route_1.OrderRoutes);
app.get('/', (req, res, next) => {
    try {
        res.send('Welcome to the data management application');
    }
    catch (error) {
        next(error);
    }
});
// not found route handler
app.all("*", (req, res) => {
    res.status(404).send({
        success: false,
        message: 'Route not found',
    });
});
// global error handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).send({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
    else {
        next();
    }
});
exports.default = app;
