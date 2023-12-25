"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.default = notFound;
