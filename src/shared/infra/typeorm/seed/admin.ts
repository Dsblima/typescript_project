import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from 'uuid';

import { connectionSource } from '..';

async function create() {
    const id = uuidV4();
    const password = await hash('admin', 8);
    await connectionSource.initialize();
    await connectionSource.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxxxxxxx')
        `
    );

    await connectionSource.destroy();
}

create().then(() => console.log('Admin User Created'));
