import User from './user.entities.js';
import jwt from 'jsonwebtoken'

function check_jwt(token) {

  const decoded = jwt.verify(token, 'privatekey', (err, decoded) => {
    if (err) {
    } else {
      return decoded;
    }
  });

  console.log(decoded);

  if (decoded == undefined) {
    return false;
  }

  var _user = decoded.user;

  if (_user == null)
    _user = decoded._user;

  if (_user.role != 'Admin') {
    return false;
  }

  return true;
}

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  createUser = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const user = new User({name: req.body.name, phone: req.body.phone, role: req.body.role, password: req.body.password, email: req.body.email});
    
    const ret = await this.userService.addUser(user);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  getUsers = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const find = req.query.find;

    const ret = await this.userService.getUsers(find);
    return res.status(ret.status_code).send(ret.data);
  }

  getUser = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const { id } = req.params;

    const ret = await this.userService.getUser(id);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  putUser = async (req, res) => {
    const { id } = req.params;

    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const user = new User({name: req.body.name, phone: req.body.phone, role: req.body.role, password: req.body.password, email: req.body.email});
    const ret = await this.userService.putUser(id, user);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  deleteUser = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const { id } = req.params;
    const ret = await this.userService.deleteUser(id);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };
}

export default UserController;