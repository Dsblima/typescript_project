import { hash } from 'bcryptjs';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import { connectionSource } from '@shared/infra/typeorm';

describe('Create Category Controller', () => {
    beforeAll(async () => {
        await connectionSource.initialize();
        await connectionSource.runMigrations();
        const id = uuidV4();
        const password = await hash('admin', 8);

        await connectionSource.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxxxxxxx')
            `
        );
    });

    afterAll(async () => {
        await connectionSource.dropDatabase();
        await connectionSource.close();
    });

    it('should be able to create a new category', async () => {
        const responseToken = await request(app).post('/session').send({
            email: 'admin@rentx.com.br',
            password: 'admin',
        });

        console.log('responseToken.body');
        console.log(responseToken.body);

        const { token } = responseToken.body;
        const response = await request(app)
            .post('/categories')
            .send({
                name: 'Category Supertest',
                description: 'Category Supertest',
            })
            .set({
                authorization: `Bearer ${token}`,
            });

        expect(response.status).toBe(201);
    });
});
