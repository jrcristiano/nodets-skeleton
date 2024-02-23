import env from '../env';
import App from "./App";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(async () => {
    const app = new App().express;

    return app.listen(env.API_PORT, () => {
      console.log(`Server running at port ${env.API_PORT}`);
    });
  })
  .catch(error => console.log(error))
