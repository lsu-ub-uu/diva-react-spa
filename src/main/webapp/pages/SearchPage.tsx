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

import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export const SearchPage = () => {
  const { searchType } = useParams();
  const [searchParams] = useSearchParams();
  const queryString = searchParams.get('query');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const query = useMemo(
    () => (queryString !== null ? JSON.parse(queryString) : null),
    [queryString],
  );

  useEffect(() => {
    const search = async () => {
      const response = await axios.get(
        `/search/advanced/${'diva-outputSimpleSearch'}?query=${window.encodeURIComponent(JSON.stringify(query))}`,
      );
      setSearchResults(response.data);
    };
    search();
  }, [searchType, query]);

  return (
    <div>
      You searched for {searchType} with the query {searchParams.get('query')}
      RESULTS: {JSON.stringify(searchResults)}
    </div>
  );
};
