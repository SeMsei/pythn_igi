import userModule from '../user/user.module.js';
import User from '../user/user.entities.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

  return true;
}

class AuthController {

  register = async (req, res) => {
    const user = new User({name: req.body.name, phone: req.body.phone, role: req.body.role, password: req.body.password, email: req.body.email});
    
    const ret = await userModule.service.addUser(user);

    const tmp_user = ret.data;

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);

    console.log(ret);

    const token = jwt.sign({user}, 'privatekey', { expiresIn: '1000h' });
   
    return res.status(201).send(token);
  };

  auth = async (req, res) => {
    const token = req.body.headers.Authorization;

    console.log('token: ', token);

    const decoded = jwt.verify(token, 'privatekey', (err, decoded) => {
      if (err) {
      } else {
        return decoded;
      }
    });

    console.log('user: ', decoded);
  
    if (decoded == undefined) {
      return res.status(404).send('Incorrect token');
    }
  
    if (decoded.user == undefined)
      return res.status(200).send(decoded._user);
    
    return res.status(200).send(decoded.user);
  }

  login = async (req, res) => {
    console.log(req.body);
    const user = await userModule.service.getUserByEmail(req.body.email);
    
    if (user == null) {
      return res.status(404).send('213');
    }

    

    console.log(req.body.password, user);

    bcrypt.compare(req.body.password, user.password, (err, reslt) => {
      if (reslt) {
        console.log(user);
        const token = jwt.sign({user}, 'privatekey', { expiresIn: '1000h' });
        console.log(token);
        return res.status(202).send(token);
      }
      return res.status(404).send('12354');
    });
  };
}

export default AuthController;