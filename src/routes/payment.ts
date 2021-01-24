import { PaymentController } from '../controllers/payment';

export class PaymentRoutes {
    private PaymentController: PaymentController = new PaymentController();

    public routes(app: any): void {
        app.get('/api/discounts', this.PaymentController.getDiscounts);

        app.get('/api/price', this.PaymentController.getPrice);
    }
}