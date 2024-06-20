import { DataSourceOptions } from 'typeorm';

import { ConnectionOptions } from './ormconfig';

export const dataSourceOptions: DataSourceOptions = {
    migrationsTableName: 'migrations',
    type: 'postgres',
    host:
        process.env.NODE_ENV === 'test' ? 'localhost' : ConnectionOptions.host,
    port: ConnectionOptions.port,
    username: ConnectionOptions.username,
    password: ConnectionOptions.password,
    database:
        process.env.NODE_ENV === 'test'
            ? 'rentx_test'
            : ConnectionOptions.database,
    logging: false,
    synchronize: false,
    name: 'default',
    entities: ConnectionOptions.entities,
    migrations: ConnectionOptions.migrations,
};
