import { Request, Response } from 'express';
import axios from 'axios';
import { findRecordTypeByName } from '../services/recordTypeServives';

const { BASEURL } = process.env;

// @desc		Get recordType by id
// @route		GET /api/publication/:id
// @access	Public
export const getRecordTypeByName = async (
  req: Request,
  res: Response,
  error: any,
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
      `${BASEURL}/record/recordType/${recordType}`,
      config,
    );
    console.log('URL:', `${BASEURL}/record/recordType/${recordType}`);
/* 
    const response = await axios.get(
      `https://cora.epc.ub.uu.se/diva/rest/record/recordType/${recordType}`,
      config,
    ); */

    responseArray = response.data.record.data.children;
    // res.status(200).json(responseArray);
    res.status(200).json(findRecordTypeByName(responseArray));
  } catch {
    // console.log(error);
    res.status(500).json({ error: `Error: ${error.message}` });
  }
};
