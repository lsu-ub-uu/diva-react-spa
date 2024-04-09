import { Request, Response } from 'express';
import * as console from 'console';
import { requestAuthTokenOnLogin } from '../cora/auth';
import { errorHandler } from '../server';
import { DataGroup, DataListWrapper } from '../utils/cora-data/CoraData';
import { getSearchResultDataListBySearchType } from '../cora/record';
import { transformCoraValidationTypes } from '../config/transformValidationTypes';

/**
 * @desc Post appToken to get authToken
 * @route POST /api/auth/:user
 * @access Public
 */
export const postAppTokenToGetAuthToken = async (req: Request, res: Response) => {
  const { user } = req.params;
  const appToken = req.body.token;

  try {
    const authToken = await requestAuthTokenOnLogin(user, appToken);
    res.status(201).json({ authToken });
  } catch (error: unknown) {
    console.log(error);
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};

/**
 * @desc Get loginUnits from Cora
 * @route GET /api/auth/loginUnits
 * @access Public
 */
export const getAllLoginUnits = async (req: Request, res: Response) => {
  try {
    // const authToken = req.header('authToken') ?? '';
    const searchQuery: DataGroup = {
      name: 'validationTypeSearch',
      children: [
        {
          name: 'include',
          children: [
            {
              name: 'includePart',
              children: [
                {
                  name: 'validatesRecordTypeSearchTerm',
                  value: 'recordType_divaOutput'
                }
              ]
            }
          ]
        }
      ]
    };

    const response = await getSearchResultDataListBySearchType<DataListWrapper>(
      'validationTypeSearch',
      searchQuery
    );
    // const validationTypes = transformCoraValidationTypes(response.data);
    // const optionList = validationTypes.map((validationType) => ({
    //   value: validationType.id,
    //   label: validationType.nameTextId
    // }));
    res.status(200).json('optionList');
  } catch (error: unknown) {
    const errorResponse = errorHandler(error);
    res.status(errorResponse.status).json(errorResponse).send();
  }
};
