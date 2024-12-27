import userModel from "../model/userModel.js";

export const updateUserController = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    next("Please provide all fields");
  }
  const user = await userModel.findOne({ _id: req.user.userId });
  Object.assign(user, { name, email, lastName, location });
  await user.save();
  const token = user.createJWT();
  res.status(200).json({ user, token });
};
