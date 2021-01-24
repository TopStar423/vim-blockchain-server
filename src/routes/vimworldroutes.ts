import { VIMWorldController } from '../controllers/vimcontroller';
//import { VIMInputValidator } from '../validators/inputvalidator';

export class VIMWorldRoutes {

    private VIMController: VIMWorldController = new VIMWorldController();

    public routes(app: any): void {

        /***********************************************
        * App routes.
        ***********************************************/
        app.route('/vim/balance/:walletaddress')
            .get(this.VIMController.fetchWalletInfo);

        app.route('/vim/detail/:walletaddress')
            .get(this.VIMController.fetchOwnedVimInfo);

    }
}
