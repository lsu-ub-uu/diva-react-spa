import { Request, Response } from 'express';
import axios from 'axios';
import { findRecordTypeByName } from '../services/recordTypeServives';

const { CORA_API_URL } = process.env;

// @desc		Get recordType by id
// @route		GET /api/publication/:id
// @access	Public
export const getRecordTypeByName = async (
  req: Request,
  res: Response,
  error: any,
) => {
  const recordType = req.params.name;
  try {
    // console.log('URL:', `${CORA_API_URL}/record/recordType/${recordType}`);
    let responseArray = [];
    const config = {
      headers: {
        Accept: 'application/vnd.uub.record+json',
      },
    };
    const response = await axios.get(
      `${CORA_API_URL}/record/recordType/${recordType}`,
      config,
    );

    responseArray = response.data.record.data.children;
    res.status(200).json(findRecordTypeByName(responseArray, recordType));
  } catch {
    res.status(404).json({ error: `RecordType ${recordType} not found` });
  }
};
