import { Router } from 'express';
import { getReviewByIdBusiness, setReview } from '../controllers/review.controller';
const router = Router();

/**
 * GET /api/review
 * @tags getReviewByIdBusiness - Get all the reviews of a business
 * @summary Get all the reviews of a business
 * @param {number} idBusiness - correo - application/json
 * @return {object} 200 - success response
 */
router.get("/api/review", getReviewByIdBusiness);
/**
 * POST /api/review/add
 * @tags setReview - Method to create a review.
 * @summary Create review
 * @param {number} idReview - idReview - application/json
 * @param {string} text - text - application/json
 * @param {number} rating- rating - application/json
 * @param {string} userName - userName - application/json
 * @param {number} idBusiness - idBusiness - application/json
 * @return {object} 200 - success response
 */
router.post("/api/review/add",setReview);

export default router;
