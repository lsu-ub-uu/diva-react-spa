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

import {
  CORA_DATA_LOADED_EVENT,
  eventEmitter,
  start,
} from '@/data/errorHandler';
import { Server } from 'http';

const getRandomPort = () => Math.floor(Math.random() * (65535 - 1024) + 1024);

export const startServer = async (): Promise<Server> => {
  const coraDataLoaded = new Promise((resolve) => {
    eventEmitter.once(CORA_DATA_LOADED_EVENT, resolve);
  });

  const server = start(getRandomPort());

  await coraDataLoaded;
  return server;
};
