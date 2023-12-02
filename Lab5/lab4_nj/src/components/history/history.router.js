
import express from 'express';

class HistoryRouter {
  constructor(historyController) {
    this.historyController = historyController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.historyController.getHistory);
    router.route('/:id').put(this.historyController.putHistory);
    router.route('/:id').delete(this.historyController.deleteHistory);
    router.route('/').get(this.historyController.getHistorys);
    router.route('/').post(this.historyController.createHistory);
    return router;
  }
}

export default HistoryRouter;