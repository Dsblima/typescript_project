import { DataSource } from 'typeorm';

import { dataSourceOptions } from './config/DataSourceConfig';

export const connectionSource = new DataSource(dataSourceOptions);
