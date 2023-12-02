import OrderController from './order.controller.js';
import OrderRouter from './order.router.js';

const orderController = new OrderController();
const orderRouter = new OrderRouter(orderController);

export default {
  controller: orderController,
  router: orderRouter.getRouter(),
};