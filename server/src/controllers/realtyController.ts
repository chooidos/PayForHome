import { Response, Request } from 'express';
import { RealtyAttributes } from './../models/realty';

import db from './../models';

export const getAllRealty = async (req: Request, res: Response) => {
  try {
    const realty = await db.Realty.findAll({ attributes: { exclude: ['id'] } });
    res.status(200).json([...realty]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addRealty = async (req: Request, res: Response) => {
  const { name, country, city, address }: RealtyAttributes = req.body;

  await db.Realty.create({
    name,
    country,
    city,
    address,
  })
    .then(() => {
      res.status(200).send({ message: 'Realty added successfully' });
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err });
    });
};

export const removeRealty = async (req: Request, res: Response) => {
  const { name }: RealtyAttributes = req.body;

  // await db.Realty.
};
