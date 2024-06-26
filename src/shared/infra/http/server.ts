import { connectionSource } from '@shared/infra/typeorm';

import { app } from './app';

app.listen(3333, async () => {
    await connectionSource.initialize();
    await connectionSource.runMigrations();
    console.log('Server is running!!');
});
