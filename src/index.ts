/**
 * @example
 * This Code Was Written By
 *          = Mohamed Rabie Rabie Elmdary
 *
 * This Example For DBMS Usage
 */

// this is how to create a model

/* start create user model */
import { Model, Type, Dbms } from './database';

interface UserModel {
  email: string;
  password: string;
}

interface User extends UserModel {
  id: string;
}

const userModel = new Model<UserModel>({
  email: {
    type: Type.STRING
  },
  password: {
    type: Type.STRING
  }
});

const User = new Dbms('users', userModel);
/* end create user model */

async function main() {
  // please check file 'src/database/db/db.json'
  const DURATION = 2000; //1s

  await User.create({
    email: 'dsasad',
    password: 'a4sd56sa'
  });

  // let's create new User
  const createdUser = await User.create({
    email: 'email@company.com',
    password: 'myawesomepassword'
  });
  console.log('\ncreatedUser\n', createdUser);

  let user;
  setTimeout(async () => {
    // let's read user
    user = await User.find(createdUser.id);
    console.log('\nuser\n', user);
  }, DURATION);

  setTimeout(async () => {
    // let's read all users
    const users = await User.findAll();
    console.log('\nusers\n', users);
  }, DURATION * 2);

  setTimeout(async () => {
    // let's update a user
    const updatedUser = await User.update(user.id, { email: 'my@new.email' });
    console.log('\nupdatedUser\n', updatedUser);
  }, DURATION * 3);

  setTimeout(async () => {
    // let's delete a user
    const deletedUser = await User.delete(user.id);
    console.log('\ndeletedUser\n', deletedUser);
  }, DURATION * 4);
}

// start programme after 1s
setTimeout(main, 1000);
