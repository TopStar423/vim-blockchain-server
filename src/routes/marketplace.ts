import { MarketplaceController } from "../controllers/marketplace";
import { ServerAuthMiddleware } from '../middleware/serverAuth';

export class MarketplaceRoutes {
    private MarketplaceController: MarketplaceController = new MarketplaceController();
    private ServerAuthMiddleware: ServerAuthMiddleware = new ServerAuthMiddleware();

    public routes(app: any): void {
        app.post('/api/marketplace/vims', this.ServerAuthMiddleware.validateToken, this.MarketplaceController.getVims);
    }
}