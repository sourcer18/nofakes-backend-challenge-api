import { Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

/**
 * Business
 * @typedef {object} Business contains information about the review
 * @property {number} idBusiness 
 * @property {string} name
 * @property {string} website
 * @property {string} address
 * @property {string} phone
 * @property {string} email
 * @property {number} numberOfReviews
 */

@Entity()
export class Business {
  @ObjectIdColumn()
  idBusiness: ObjectID;

  @Column({ length: 75 })
  name: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column()
  email: string;

  @Column()
  numberOfReviews: number;

  @Column()
  avgRating?: number;
}
