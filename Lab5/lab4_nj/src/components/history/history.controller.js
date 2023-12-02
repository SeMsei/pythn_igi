import History from './history.entities.js';

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

class HistoryController {
  constructor(historyService) {
    this.historyService = historyService;
  }

  createHistory = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const history = new History({description: req.body.description, year: req.body.year});
    
    const ret = await this.historyService.addHistory(history);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  getHistorys = async (req, res) => {
    const sort = req.query.sort;

    const ret = await this.historyService.getHistorys(sort);
    return res.status(ret.status_code).send(ret.data);
  }

  getHistory = async (req, res) => {
    const { id } = req.params;

    const ret = await this.historyService.getHistory(id);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  putHistory = async (req, res) => {
    const { id } = req.params;

    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const history = new History({description: req.body.description, year: req.body.year});
    const ret = await this.historyService.putHistory(id, history);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  deleteHistory = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const { id } = req.params;
    const ret = await this.historyService.deleteHistory(id);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };
}

export default HistoryController;