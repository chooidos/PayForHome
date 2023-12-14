import { Response, Request, response } from 'express';

import db from '../models';
import { UtilityPaymentAttributes } from '../models/utilityPayment';

export const getAllUtilityPayments = async (req: Request, res: Response) => {
  const utilityId = req.params.utilityId;
  const realtyId = req.params.realtyId;
  const realtyUtility = await db.RealtyUtilityAssignment.findOne({
    where: {
      UtilityId: utilityId,
      RealtyId: realtyId,
    },
  });
  db.UtilityPayment.findAll({
    where: { realtyUtilityId: realtyUtility.id },
    order: [['createdAt', 'DESC']],
  })
    .then((utilityPayments: UtilityPaymentAttributes[]) => {
      res.status(200).json([...utilityPayments]);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err });
    });
};

export const addUtilityPayment = async (req: Request, res: Response) => {
  const { date, value, price }: UtilityPaymentAttributes = req.body;
  const utilityId = req.params.utilityId;
  const realtyId = req.params.realtyId;

  try {
    const realtyUtility = await db.RealtyUtilityAssignment.findOne({
      where: {
        UtilityId: utilityId,
        RealtyId: realtyId,
      },
    });

    if (!realtyUtility) {
      return res.status(400).send({ err: "utility doesn't exist" });
    }

    const utility = await db.Utility.findOne({
      where: {
        id: utilityId,
      },
    });

    if (!utility.isCountable) {
      await db.UtilityPayment.create({
        realtyUtilityId: realtyUtility.id,
        date,
        value,
        price,
        paid: false,
      });
      return res.status(200).send({ status: 'success' });
    }

    const lastUtilityPayment = await db.UtilityPayment.findOne({
      where: {
        realtyUtilityId: realtyUtility.id,
      },
      order: [['createdAt', 'DESC']],
    });

    const lastValue =
      (lastUtilityPayment && (lastUtilityPayment.value as number)) || 0;

    if (lastValue >= value) {
      return res.status(400).send({
        status: 'error',
        message: {
          errors: [
            {
              message: `New value "${value}" should be higher than previos "${lastValue}"`,
            },
          ],
        },
      });
    }
    const consumed = value - lastValue;

    const totalPrice = price * consumed;

    await db.UtilityPayment.create({
      realtyUtilityId: realtyUtility.id,
      date,
      value,
      price,
      consumed,
      totalPrice,
      paid: false,
    });
    res.status(200).send({ status: 'success' });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
};

export const editUtilityPayment = async (req: Request, res: Response) => {
  const {}: UtilityPaymentAttributes = req.body;
  const editUtilityId = req.params.id;

  db.UtilityPayment.update(
    {},
    {
      where: {
        id: editUtilityId,
      },
    },
  )
    .then(() => {
      res
        .status(200)
        .send({ message: 'UtilityPayment is eddited successfully' });
    })
    .catch((err: Error) => {
      res.status(500).send({ message: err });
    });
};
