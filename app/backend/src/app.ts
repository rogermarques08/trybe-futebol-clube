import * as express from 'express';
import leaderboardRoutes from './database/routes/leaderboard.routes';
import loginRoutes from './database/routes/login.routes';
import matchRoutes from './database/routes/match.routes';
import TeamRoutes from './database/routes/team.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota.
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use('/teams', TeamRoutes);

    this.app.use('/login', loginRoutes);

    this.app.use('/matches', matchRoutes);

    this.app.use('/leaderboard', leaderboardRoutes);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
