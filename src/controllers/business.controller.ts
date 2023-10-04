import { Request, Response } from "express";
import { Business } from "../entity/Business";
import { MongoClientDataSource } from "..";
import { Review } from "../entity/Review";

export const getBusinessById = async (req: Request, res: Response): Promise<Response> => {
    const business = await MongoClientDataSource.getRepository(Business).findOne(req.body.id);
    if (!business) {
        return res.status(404).send({ error: 'Business not found.' });
    }
    return res.json(business);
};

export const getBusinessAvg = async (req: Request, res: Response): Promise<Response> => {
  const business = await MongoClientDataSource.getRepository(Business).findOne({ where: { idBusiness: req.body.id}});
  if (!business) {
    return res.status(404).send({ error: 'Business not found.' });
  }

  const reviews = await MongoClientDataSource.getRepository(Review).find({ where: { idBusiness: req.body.id } });
  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  business.avgRating = parseFloat(avgRating.toFixed(1));
  return res.json(business);
};
  
export const setBusiness = async (req: Request, res: Response): Promise<Response> => {
    const newBusiness = MongoClientDataSource.getRepository(Business).create(req.body);
    const results = MongoClientDataSource.getRepository(Business).save(newBusiness);
    return res.json(results);
};