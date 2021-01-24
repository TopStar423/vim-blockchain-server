import { TiersController } from "../controllers/tiers";
import { AuthorizationMiddleware } from '../middleware/authorization';

export class TiersRoutes {
    private TiersController: TiersController = new TiersController();
    private AuthorizationMiddleware: AuthorizationMiddleware = new AuthorizationMiddleware();

    public routes(app: any): void {
        app.post('/api/tiers', this.AuthorizationMiddleware.validateToken, this.TiersController.getUserTiers);

        app.get('/api/tiers/historical', this.TiersController.getHistorical);

        app.get('/api/tiers/banners', this.TiersController.getBanners);

        app.get('/api/tiers/policy', this.TiersController.getPolicy);

        app.get('/api/tiers/terms', this.TiersController.getTerms);
    }
}