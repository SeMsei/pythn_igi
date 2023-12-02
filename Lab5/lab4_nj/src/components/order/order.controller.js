import Order from './order.entities.js';
import jwt from 'jsonwebtoken'

class OrderController {
    

  createOrder = async (req, res) => {
    const token = req.body.headers.Authorization;
    console.log(req);

    const decoded = jwt.verify(token, 'privatekey', (err, decoded) => {
        if (err) {
        } else {
          return decoded;
        }
      });

      console.log('decoded: ', decoded, token);

      var _user = decoded.user;

      if (_user == null)
        _user = decoded._user;



        const order = new Order({book_name: req.body.title, user_id: _user.id});
        const orders = await Order.find({});

        if (orders.length == 0)
            order.id = 0;
        else
            order.id = orders[orders.length - 1].id + 1;

        order.save();
   
        return res.status(200).send(order);
  };

  getOrders= async (req, res) => {
    const token = req.get('Authorization');

    const decoded = jwt.verify(token, 'privatekey', (err, decoded) => {
        if (err) {
        } else {
          return decoded;
        }
      });

      console.log('decoded: ', decoded);

      var _user = decoded.user;

      if (_user == null)
        _user = decoded._user;

        console.log(_user);

      const orders = await Order.find({user_id: _user.id});

      console.log(orders);

      return res.status(200).send(orders);
  }
}

export default OrderController;