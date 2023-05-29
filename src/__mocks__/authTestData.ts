import { CoraRecord } from '../utils/cora-data/CoraData';

export const authDataForOnePerson: CoraRecord = {
  data: {
    children: [
      {
        name: 'id',
        value: '25525fda-8e9f-46b5-83dd-e531b1f7e00b',
      },
      {
        name: 'validForNoSeconds',
        value: '600',
      },
      {
        name: 'idInUserStorage',
        value: 'coraUser:490742519075086',
      },
      {
        name: 'idFromLogin',
        value: 'coraUser:490742519075086',
      },
      {
        name: 'firstName',
        value: 'Everything',
      },
      {
        name: 'lastName',
        value: 'DiVA',
      },
    ],
    name: 'authToken',
  },
  actionLinks: {
    delete: {
      requestMethod: 'DELETE',
      rel: 'delete',
      url: 'https://cora.epc.ub.uu.se/apptokenverifier/rest/apptoken/coraUser:490742519075086',
    },
  },
};
