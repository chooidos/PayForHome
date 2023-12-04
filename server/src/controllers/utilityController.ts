import { Response, Request } from 'express';

import db from '../models';
import { UtilityAttributes } from '../models/utility';

export const getAllUtilities = async (req: Request, res: Response) => {
  db.Utility.findAll({ attributes: { exclude: ['id'] } })
    .then((utilities: UtilityAttributes[]) => {
      res.status(200).json([...utilities]);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err });
    });
};

export const addUtility = async (req: Request, res: Response) => {
  const { name, isCountable, comment }: UtilityAttributes = req.body;

  db.Utility.create({
    name,
    isCountable,
    comment,
  })
    .then(() =>
      res.status(200).send({ message: 'Utility is added successfully' }),
    )
    .catch((err: Error) => {
      res.status(500).send({ message: err });
    });
};

export const editUtility = async (req: Request, res: Response) => {
  const {
    name,
    isCountable,
    isDeleted = false,
    icon,
    comment,
  }: UtilityAttributes = req.body;
  const editUtilityName = req.params.name;

  db.Utility.update(
    {
      name,
      isCountable,
      isDeleted,
      icon,
      comment,
    },
    {
      where: {
        name: editUtilityName,
      },
    },
  )
    .then(() => {
      res.status(200).send({ message: 'Utility is eddited successfully' });
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err });
    });
};
