import app from './app.js';
import passport from 'passport';
import google from 'passport-google-oauth20';
const GoogleStrategy = google.Strategy;
import userModule from '../src/components/user/user.module.js'
import User from '../src/components/user/user.entities.js';
import jwt from 'jsonwebtoken';


const tmp = passport.use(new GoogleStrategy({
  clientID: '296776361631-2gupo86im593snsm3oigu5vvc8mk6fl5.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:8000/auth/google/callback',
  scope: ['profile', 'email'],
}, (accessToken, refreshToken, profile, done) => {
  console.log(profile , profile.emails);
  return done(null, profile);
}));

console.log(tmp, 'ggggg');




app.use(passport.initialize());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false}),
  async function(req, res) {
    // Создание и подписание JWT токена
    console.log(req.user._json.email, 'qweqwe');
    const _user = await userModule.service.getUserByEmail(req.user._json.email);
    if (_user == null) {
      var randomstring = Math.random().toString(36).slice(-8);
      const user = new User({name: req.user._json.name, phone: '+375123456789', role: 'User', password: randomstring, email: req.user._json.email});
      console.log(user);
      const ret = await userModule.service.addUser(user);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);

        const token = jwt.sign({_user}, 'privatekey', { expiresIn: '1000h' });
        console.log(token);
        res.redirect(`http://localhost:3000/google-callback?token=${token}`);
   
    //return res.status(ret.status_code).send(ret.data);
    }
    else {
          console.log(_user, 'asd');
          const tmp_user = new User({name: _user.name, phone: _user.phone, role: _user.role, password: _user.password, email: _user.email});
          console.log(tmp_user, 'zxc');
          const token = jwt.sign({_user}, 'privatekey', { expiresIn: '1000h' });
          console.log(token);
          res.redirect(`http://localhost:3000/google-callback?token=${token}`);
          //return res.status(202).send(token);
    }
    //res.send('xui');
    
  }
);

app.listen(8000, () => {
  console.log('Server listening...');
});