import { AdoptController } from '../controllers/adopt';
import { AuthorizationMiddleware } from '../middleware/authorization';

export class AdoptRoutes {
    private AdoptController: AdoptController = new AdoptController();
    private AuthorizationMiddleware: AuthorizationMiddleware = new AuthorizationMiddleware();

    public routes(app: any): void {
        app.post('/api/adopt/vims', this.AdoptController.getAvailableVims);
        app.post('/api/adopt', this.AdoptController.createAdopt);
        app.post('/api/adopt/list', this.AuthorizationMiddleware.validateToken, this.AdoptController.getAdopts);
    }
}