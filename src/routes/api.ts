import { APIController } from '../controllers/api';
import { AuthorizationMiddleware } from '../middleware/authorization';

export class APIRoutes {

    private APIController: APIController = new APIController();
    private AuthorizationMiddleware: AuthorizationMiddleware = new AuthorizationMiddleware();

    public routes(app: any): void {

        /***********************************************
         * App routes.
         ***********************************************/
        app.post('/api/get-token', this.APIController.generateToken);
    }
}