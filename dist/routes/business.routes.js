"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const business_controller_1 = require("../controllers/business.controller");
const router = (0, express_1.Router)();
/**
 * GET /api/business
 * @tags getBusinessById - Get the business by id
 * @summary  Get the business by id
 * @param {number} id - id - application/json
 * @return {object} 200 - success response
 */
router.get("/api/business", business_controller_1.getBusinessById);
/**
 * POST /api/business/add
 * @tags setBusiness - Method to create a business.
 * @summary Create business
 * @param {string} name - name - application/json
 * @param {string} website - website - application/json
 * @param {string} address- address - application/json
 * @param {string} phone - phone - application/json
 * @param {string} email - email - application/json
 * @param {string} numberOfReviews - numberOfReviews - application/json
 * @return {object} 200 - success response
 */
router.post("/api/business/add", business_controller_1.setBusiness);
/**
 * GET /api/business/avg
 * @tags getBusinessAvg - Get the business by id whith average business rating
 * @summary  Average business rating
 * @param {number} id - id - application/json
 * @return {object} 200 - success response
 */
router.get("/api/business/avg", business_controller_1.getBusinessAvg);
exports.default = router;
