export const ConnectionOptions = {
    type: 'postgres',
    port: 5432,
    host: '192.168.3.8',
    username: 'docker',
    password: 'ignite',
    database: 'rentx',
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    entities: ['./src/modules/**/entities/*.ts'],
    cli: {
        migrationsDir: './src/shared/infra/typeorm/migrations',
    },
};
