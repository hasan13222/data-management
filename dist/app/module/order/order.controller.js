"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_validator_1 = __importDefault(require("./order.validator"));
const order_service_1 = require("./order.service");
// create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = req.body;
        const newOrderValue = order_validator_1.default.parse(newOrder);
        const result = yield order_service_1.OrderServices.createOrderIntoDB(newOrderValue);
        if (!result) {
            res.status(500).json({
                success: true,
                message: 'Order not found',
            });
        }
        else if (result === 'stock out') {
            res.status(500).json({
                success: true,
                message: 'Insufficient quantity available in inventory',
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: 'Order created successfully',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
});
// get all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryValue = req.query.email;
        if (queryValue) {
            const result = yield order_service_1.OrderServices.getOrdersByEmailFromDB(queryValue);
            res.status(200).json({
                success: true,
                message: 'Orders retrieved by email successfully',
                data: result,
            });
        }
        else {
            const result = yield order_service_1.OrderServices.getAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: 'All orders retrieved successfully',
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message || 'Something went wrong',
            error: error,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
