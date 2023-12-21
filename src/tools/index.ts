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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import axios from 'axios';

axios.defaults.baseURL = 'https://cora.epc.ub.uu.se/diva/rest/';

const message: string = "DivaOutput Bulk Generator v0.1!";
console.log(message);


const data = {
  title: {
    mainTitle: {
      value: "en huvudtitel",
    },
    _language: "fao",
  },
  contributor: {
    author: [
      {
        givenName: {
          value: "Urban",
        },
        familyName: {
          value: "Testsson",
        },
      },
    ],
  },
  nationalSubjectCategory: [
    {
      value: "nationalSubjectCategory:6325370460697648",
    },
  ],
  administrativeNote: [
    {
      value: "den här posten skapades av build generator",
    },
  ],
};
