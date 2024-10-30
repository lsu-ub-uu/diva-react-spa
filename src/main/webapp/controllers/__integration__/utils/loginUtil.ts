/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import TestAgent from 'supertest/lib/agent';
import { Auth } from '../../../types/Auth';

const divaAdminUser = {
  user: 'divaAdmin@cora.epc.ub.uu.se',
  appToken: '49ce00fb-68b5-4089-a5f7-1c225d3cf156'
};

export const loginAsDivaAdmin = async (testAgent: TestAgent): Promise<Auth> => {
  const response = await testAgent.post('/api/auth/appToken').send(divaAdminUser);
  expect(response.status).toBe(201);
  return response.body.auth;
};
