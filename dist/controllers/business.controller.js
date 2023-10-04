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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBusiness = exports.getBusinessAvg = exports.getBusinessById = void 0;
const Business_1 = require("../entity/Business");
const __1 = require("..");
const Review_1 = require("../entity/Review");
const getBusinessById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const business = yield __1.MongoClientDataSource.getRepository(Business_1.Business).findOne(req.body.id);
    if (!business) {
        return res.status(404).send({ error: 'Business not found.' });
    }
    return res.json(business);
});
exports.getBusinessById = getBusinessById;
const getBusinessAvg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const business = yield __1.MongoClientDataSource.getRepository(Business_1.Business).findOne({ where: { idBusiness: req.body.id } });
    if (!business) {
        return res.status(404).send({ error: 'Business not found.' });
    }
    const reviews = yield __1.MongoClientDataSource.getRepository(Review_1.Review).find({ where: { idBusiness: req.body.id } });
    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    business.avgRating = parseFloat(avgRating.toFixed(1));
    return res.json(business);
});
exports.getBusinessAvg = getBusinessAvg;
const setBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBusiness = __1.MongoClientDataSource.getRepository(Business_1.Business).create(req.body);
    const results = __1.MongoClientDataSource.getRepository(Business_1.Business).save(newBusiness);
    return res.json(results);
});
exports.setBusiness = setBusiness;
