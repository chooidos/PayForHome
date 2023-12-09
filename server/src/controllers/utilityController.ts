import { Response, Request } from 'express';

import db from '../models';
import { UtilityAttributes } from '../models/utility';

export const getAllUtilities = async (req: Request, res: Response) => {
  db.Utility.findAll({
    where: {
      isDeleted: false,
    },
  })
    .then((utilities: UtilityAttributes[]) => {
      res.status(200).json([...utilities]);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err });
    });
};

export const addUtility = async (req: Request, res: Response) => {
  const {
    name,
    isCountable,
    isDeleted = false,
    icon,
    comment,
  }: UtilityAttributes = req.body;

  db.Utility.create({
    name,
    isCountable,
    isDeleted,
    icon,
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
  const editUtilityId = req.params.id;

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
        id: editUtilityId,
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
