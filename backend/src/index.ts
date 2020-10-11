import app from './app';
import config from './config/config';
import { sequelizeInit } from './config/db';

const { PORT } = config;

(async () => {
  sequelizeInit();
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})();