import { connectionSource } from '@shared/infra/typeorm';

import { app } from './app';

app.listen(3333, async () => {
    await connectionSource.initialize();
    console.log('Server is running!!');
});
