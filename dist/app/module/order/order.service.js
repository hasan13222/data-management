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
exports.OrderServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
// create order
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const MObjectId = mongoose_1.default.Types.ObjectId;
    // finding product from product database
    const productToOrder = yield product_model_1.ProductModel.findOne({
        _id: new MObjectId(order.productId),
    });
    if (!productToOrder) {
        return false;
    }
    // checking qty
    const inventoryQty = (_a = productToOrder === null || productToOrder === void 0 ? void 0 : productToOrder.inventory) === null || _a === void 0 ? void 0 : _a.quantity;
    const remainingQty = inventoryQty - order.quantity;
    if (remainingQty < 0) {
        return "stock out";
    }
    else if ((remainingQty === 0)) {
        yield product_model_1.ProductModel.updateOne({ _id: new MObjectId(order.productId) }, { $set: { inventory: { quantity: remainingQty, inStock: false } } });
        const result = yield order_model_1.OrderModel.create(order);
        return result;
    }
    else {
        yield product_model_1.ProductModel.updateOne({ _id: new MObjectId(order.productId) }, { $set: { inventory: { quantity: remainingQty, inStock: true } } });
        const result = yield order_model_1.OrderModel.create(order);
        return result;
    }
});
// get all orders
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find();
    return result;
});
// get all orders by email
const getOrdersByEmailFromDB = (filterEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find({ email: filterEmail });
    return result;
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
    getOrdersByEmailFromDB,
};
