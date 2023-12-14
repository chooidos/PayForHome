import { Response, Request } from 'express';
import { RealtyAttributes } from './../models/realty';

import db from './../models';

export const getAllRealty = async (req: Request, res: Response) => {
  db.Realty.findAll({
    include: [
      {
        model: db.Utility,
      },
    ],
  })
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
  const editRealtyId = req.params.id;

  db.Realty.update(
    {
      name,
      country,
      city,
      address,
    },
    {
      where: {
        id: editRealtyId,
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
  const id = req.params.id;

  db.Realty.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.status(200).send({ message: 'Realty deleted successfully' });
    })
    .catch((err: Error) => {
      res.status(500).send({ error: err });
    });
};

export const assignUtility = async (req: Request, res: Response) => {
  const utilityId = req.params.id;
  const { realtyId } = req.body;

  try {
    const realtyUtility = await db.RealtyUtilityAssignment.findOne({
      where: {
        UtilityId: utilityId,
        RealtyId: realtyId,
      },
    });
    const utility = await db.Utility.findOne({
      where: {
        id: utilityId,
      },
    });
    if (!utility) {
      return res.status(400).send({ err: "utility doesn't exist" });
    }
    if (utility.isDeleted) {
      return res.status(400).send({ err: 'utility is deleted' });
    }
    if (!realtyUtility) {
      await db.RealtyUtilityAssignment.create({
        UtilityId: utilityId,
        RealtyId: realtyId,
      });
    }
    res.status(201).send({ status: 'success' });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

export const removeUtility = (req: Request, res: Response) => {
  const { id: utilityId } = req.params;
  const { realtyId } = req.body;

  db.RealtyUtilityAssignment.findOne({
    where: { UtilityId: utilityId, RealtyId: realtyId },
  })
    .then((realtyUtility) => {
      if (realtyUtility) {
        return realtyUtility.destroy();
      } else {
        return Promise.reject(new Error('Realty utility not found'));
      }
    })
    .then(() => {
      res.status(201).send({ status: 'success' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ status: 'error', message: err.message });
    });
};
