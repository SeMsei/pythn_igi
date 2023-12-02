
import express from 'express';

class VacancyRouter {
  constructor(vacancyController) {
    this.vacancyController = vacancyController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.vacancyController.getVacancy);
    router.route('/:id').put(this.vacancyController.putVacancy);
    router.route('/:id').delete(this.vacancyController.deleteVacancy);
    router.route('/').get(this.vacancyController.getVacancys);
    router.route('/').post(this.vacancyController.createVacancy);
    return router;
  }
}

export default VacancyRouter;