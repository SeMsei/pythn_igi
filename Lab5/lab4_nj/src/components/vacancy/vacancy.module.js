import VacancyController from './vacancy.controller.js';
import VacancyService from './vacancy.service.js';
import VacancyRouter from './vacancy.router.js';

const vacancyService = new VacancyService();
const vacancyController = new VacancyController(vacancyService);
const vacancyRouter = new VacancyRouter(vacancyController);

export default {
  service: vacancyService,
  controller: vacancyController,
  router: vacancyRouter.getRouter(),
};