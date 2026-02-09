import User from "../../DB/Models/user.js";

// 1️ Create new user
export const createUser = async (data) => {
  const existingUser = await User.findOne({ where: { email: data.email } });
  if (existingUser) throw new Error("Email already exists");

  const user = User.build(data);
  await user.save();
  return user;
};

// 2️ Create or update by PK
export const upsertUser = async (id, updates) => {
  let user = await User.findByPk(id);

  if (user) {
    await user.update(updates, { validate: false });
    return user;
  }

  user = await User.create({ id, ...updates });
  return user;
};

// 3️ Find by email
export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// 4️ Find by PK excluding role
export const findUserByIdExcludingRole = async (id) => {
  return await User.findByPk(id, { attributes: { exclude: ["role"] } });
};
