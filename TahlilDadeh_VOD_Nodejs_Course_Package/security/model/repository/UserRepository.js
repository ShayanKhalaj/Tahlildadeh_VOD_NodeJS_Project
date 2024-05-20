import { userDB } from "../schema/UserSchema.js";

const isUserExistedByThisEmail = async (email) => {
  return await userDB.users.find({ email: email });
};

const isUserExistedByThisMobile = async (mobile) => {
  return await userDB.users.find({ mobile: mobile });
};

const isUserExistedByThisUserName = async (username) => {
  return await userDB.users.find({ username: username });
};

const register = async (user) => {
  try {
    const username = await isUserExistedByThisUserName(user.username);
    const mobile = await isUserExistedByThisMobile(user.mobile);
    const email = await isUserExistedByThisEmail(user.email);
    if (username.length > 0) {
      return "existed";
    }
    if (mobile.length > 0) {
      return "existed";
    }
    if (user.email && email.length > 0) {
      return "existed";
    } else {
      await userDB.users.create(user);
      return true;
    }
  } catch (error) {
    return false;
  }
};

const getUserByUserName = async(username)=>{
  return await userDB.users.findOne({username:username})
}

const getUserById=async(id)=>{
  return await userDB.users.findById(id)
}

export const UserRepository = { register,getUserByUserName,getUserById };
