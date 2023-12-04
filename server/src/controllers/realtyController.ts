import { Response, Request } from 'express';
import { RealtyAttributes } from './../models/realty';

import db from './../models';

export const getAllRealty = async (req: Request, res: Response) => {
  db.Realty.findAll({ attributes: { exclude: ['id'] } })
    .then((realty: RealtyAttributes[]) => {
      res.status(200).json([...realty]);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err });
    });
};

export const addRealty = async (req: Request, res: Response) => {
  const { name, country, city, address }: RealtyAttributes = req.body;

  db.Realty.create({
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

export const editRealty = async (req: Request, res: Response) => {
  const { name, country, city, address }: RealtyAttributes = req.body;
  const editRealtyName = req.params.name;

  db.Realty.update(
    {
      name,
      country,
      city,
      address,
    },
    {
      where: {
        name: editRealtyName,
      },
    },
  )
    .then(() => {
      res.status(200).send({ message: 'Realty is eddited successfully' });
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err });
    });
};

export const removeRealty = async (req: Request, res: Response) => {
  const name = req.params.name;

  db.Realty.destroy({
    where: {
      name: name,
    },
  })
    .then(() => {
      res.status(200).send({ message: 'Realty deleted successfully' });
    })
    .catch((err: Error) => {
      res.status(500).send({ error: err });
    });
};
