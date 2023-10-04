import { Request, Response } from "express";
import { Review } from "../entity/Review";
import { MongoClientDataSource } from "..";
import { Business } from "../entity/Business";

export const getReviewByIdBusiness = async (req: Request, res: Response): Promise<Response> => {
  const business = await MongoClientDataSource.getRepository(Business).findOne({ where: { idBusiness: req.body.id}});
  if (!business) {
    return res.status(404).send({ error: 'Business not found.' });
  }
  const reviews = await MongoClientDataSource.getRepository(Review).find({ where: { idBusiness: req.body.id}});
  const result = {
    business : business,
    reviews : reviews
  }
  return res.json(result);
};

export const setReview = async (req: Request, res: Response): Promise<Response> => {

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

  const review = new Review();
  review.text = req.body.text;
  review.rating = req.body.rating;
  review.userName = req.body.userName;
  review.idBusiness = req.body.idBusiness;
  const newReview = MongoClientDataSource.getRepository(Review).create(req.body);
  const results = MongoClientDataSource.getRepository(Review).save(newReview);
  return res.json(results);
};