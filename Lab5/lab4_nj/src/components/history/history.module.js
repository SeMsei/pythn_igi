import HistoryController from './history.controller.js';
import HistoryService from './history.service.js';
import HistoryRouter from './history.router.js';

const historyService = new HistoryService();
const historyController = new HistoryController(historyService);
const historyRouter = new HistoryRouter(historyController);

export default {
  service: historyService,
  controller: historyController,
  router: historyRouter.getRouter(),
};