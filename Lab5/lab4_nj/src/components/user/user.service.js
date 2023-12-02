import Response from '../../utils/response.js';
import User from './user.entities.js';
import bcrypt from 'bcrypt';

class UserService {
    constructor() {
      this.books = [];
    }
  
    addUser = async (user) => {
        if (user.email == null || user.phone == null || user.role == null ||
          user.password == null || user.name == null)
            return new Response(null, 400, "User fields cannot be null");

        const users = await User.find({});

        if (users.length == 0)
          user.id = 0;
        else
          user.id = users[users.length - 1].id + 1;

        user.password = await bcrypt.hash(user.password, 10);

        await user.save();
        return new Response(user, 201, "Create Successfull");
    };
  
    getUsers = async (find) => {
      var users = await User.find({}, 'id name email password phone role');
      console.log(users);

      if (find != null) {
        users = users.filter((user) => user.name.startsWith(find));
      }

      return new Response(users, 200, "Get Successfull");
    }
  
    getUser = async (id) => {
      const user = await User.findOne({id: id}, 'id name email password phone role');

      if (user == null) {
        return new Response(null, 400, "No such user");
      }

      return new Response(user, 200, "Get successfull");
    };

    putUser = async (id, user) => {
      const _user = await User.findOne({id: id}, 'id name email password phone role');

      if (_user == null) {
        return new Response(null, 400, "No such user");
      }

      if (_user.email == null || _user.phone == null || _user.role == null ||
        _user.password == null || _user.name == null)
        return new Response(null, 400, "User fields cannot be null");

        user.password = await bcrypt.hash(user.password, 10);

      const ret = await User.findOneAndUpdate({id: id}, {name: user.name, phone: user.phone, role: user.role, password: user.password, email: user.email}, {new: true});

      return new Response(ret, 200, "Put successfull");
    };

    deleteUser = async (id) => {
      const _user = await User.findOne({id: id});

      if (_user == null)
        return new Response(null, 400, "No such user");

      await User.findOneAndDelete({id: id});

      return new Response(_user, 200, "Delete successfull");
    };

    getUserByEmail = async (email) => {
      return await User.findOne({email: email});
    };
  }
  
  export default UserService;