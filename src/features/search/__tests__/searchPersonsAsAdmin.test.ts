import axios from 'axios';
import { rest } from 'msw';
import { server } from '../../../__mocks__/server';
import searchService from '../searchService';

describe('searchPersonsAsAdmin', () => {
  test.todo('Returning search data', async () => {
    const response = await axios.get(
      `https://cora.epc.ub.uu.se/diva/spaclientbff/api/search/admin/person/egil`,
    );
    console.log(response);
    // const search = await searchService.searchPersonsAsAdmin('egil');
    // console.log(search);
  });
});
