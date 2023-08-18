import { Request, Response } from 'express';
import { createImageBinary } from '../services/binaryServices/createImageBinary';

// @desc		Post new binary
// @route		Post /api/binary/
// @access	Private
export const postBinary = async (req: Request, res: Response) => {
  const newBinary = req.body;

  let authToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    authToken = req.headers.authorization?.split(' ')[1];
  }

  try {
    const createdBinary = await createImageBinary(newBinary, authToken);
    res.status(201).json(createdBinary);
  } catch (error: any) {
    const errorMessage = error.message;
    const errorCode = Number(errorMessage.match(/\d+/)[0]);
    res.status(errorCode).json(errorMessage);
  }
};
