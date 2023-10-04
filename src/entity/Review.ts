import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

/**
 * Review
 * @typedef {object} Review contains information about the review
 * @property {number} idReview 
 * @property {string} text
 * @property {number} rating
 * @property {string} userName
 * @property {number} idBusiness
 */

@Entity()
export class Review {
  @ObjectIdColumn()
  idReview: ObjectID;

  @Column({ length: 500 })
  text: string;

  @Column({ type: 'int' })
  rating: number;

  @Column()
  userName: string;

  @Column()
  idBusiness: number;
}
