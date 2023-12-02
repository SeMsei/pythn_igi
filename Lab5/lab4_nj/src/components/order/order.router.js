
import express from 'express';

class OrderRouter {
  constructor(orderController) {
    this.orderController = orderController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/').post(this.orderController.createOrder);
    router.route('/').get(this.orderController.getOrders);
    return router;
  }
}

export default OrderRouter;