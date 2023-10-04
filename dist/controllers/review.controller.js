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
exports.setReview = exports.getReviewByIdBusiness = void 0;
const Review_1 = require("../entity/Review");
const __1 = require("..");
const Business_1 = require("../entity/Business");
const getReviewByIdBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const business = yield __1.MongoClientDataSource.getRepository(Business_1.Business).findOne({ where: { idBusiness: req.body.id } });
    if (!business) {
        return res.status(404).send({ error: 'Business not found.' });
    }
    const reviews = yield __1.MongoClientDataSource.getRepository(Review_1.Review).find({ where: { idBusiness: req.body.id } });
    const result = {
        business: business,
        reviews: reviews
    };
    return res.json(result);
});
exports.getReviewByIdBusiness = getReviewByIdBusiness;
const setReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, rating, userName } = req.body;
    if (typeof text !== 'string') {
        return res.status(400).json({ error: 'The text must be of type string.' });
    }
    if (text.length < 20 || text.length > 500) {
        return res.status(400).json({ error: 'The text must be between 20 and 500 characters.' });
    }
    if (typeof rating !== 'number' || rating < 1 || rating > 5 || rating !== Math.floor(rating)) {
        return res.status(400).json({ error: 'The rating must be an integer between 1 and 5.' });
    }
    if (typeof userName !== 'string' || userName.trim() === "") {
        return res.status(400).json({ error: 'The username is required and must be of type string.' });
    }
    const review = new Review_1.Review();
    review.text = req.body.text;
    review.rating = req.body.rating;
    review.userName = req.body.userName;
    review.idBusiness = req.body.idBusiness;
    const newReview = __1.MongoClientDataSource.getRepository(Review_1.Review).create(req.body);
    const results = __1.MongoClientDataSource.getRepository(Review_1.Review).save(newReview);
    return res.json(results);
});
exports.setReview = setReview;
