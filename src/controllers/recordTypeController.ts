import { Request, Response } from 'express';
import axios from 'axios';
import { findRecordTypeByName } from '../services/recordTypeServives';

// @desc		Get recordType by id
// @route		GET /api/publication/:id
// @access	Public
export const getRecordTypeByName = async (
  req: Request,
  res: Response,
  error: unknown,
) => {
  try {
    const recordType = req.params.name;
    let responseArray = [];
    const config = {
      headers: {
        Accept: 'application/vnd.uub.record+json',
      },
    };
    const response = await axios.get(
      `https://cora.epc.ub.uu.se/systemone/rest/record/recordType/${recordType}`,
      config,
    );

    // res.status(200).json(response.data);
    responseArray = response.data.record.data.children;

    const returnObject = {
      id: '',
    };
    console.log('ret1', returnObject);

    responseArray.map((a: any) => {
      return Object.entries(a).map((b) => {
        if (Array.isArray(b)) {
          b.map((c) => {
            if (Array.isArray(c)) {
              c.map((d: string) => {
                if (Object.values(d).includes('id')) {
                  returnObject.id = Object.values(d)[1];
                }
                return returnObject;
              });
            }
            return returnObject;
          });
          return returnObject;
        }
        return returnObject;
      });
    });
    console.log('ret2', returnObject);
    res.status(200).json(returnObject);
  } catch {
    console.log(error);
    throw new Error(`${error}`);
  }
};
