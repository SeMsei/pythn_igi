import Vacancy from './vacancy.entities.js';

import jwt from 'jsonwebtoken'

function check_jwt(token) {

  const decoded = jwt.verify(token, 'privatekey', (err, decoded) => {
    if (err) {
    } else {
      return decoded;
    }
  });

  if (decoded == undefined) {
    return false;
  }

  const role = decoded.user.role;

  if (role != "Staff" && role != 'Admin') {
    return false;
  }

  return true;
}

class VacancyController {
  constructor(vacancyService) {
    this.vacancyService = vacancyService;
  }

  createVacancy = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const vacancy = new Vacancy({title: req.body.title, description: req.body.description, salary: req.body.salary});
    
    const ret = await this.vacancyService.addVacancy(vacancy);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  getVacancys = async (req, res) => {
    const sort = req.query.sort;
    const find = req.query.find;

    const ret = await this.vacancyService.getVacancys(sort, find);
    return res.status(ret.status_code).send(ret.data);
  }

  getVacancy = async (req, res) => {
    const { id } = req.params;

    const ret = await this.vacancyService.getVacancy(id);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  putVacancy = async (req, res) => {
    const { id } = req.params;

    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const vacancy = new Vacancy({title: req.body.title, description: req.body.description, salary: req.body.salary});
    const ret = await this.vacancyService.putVacancy(id, vacancy);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  deleteVacancy = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const { id } = req.params;
    const ret = await this.vacancyService.deleteVacancy(id);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };
}

export default VacancyController;