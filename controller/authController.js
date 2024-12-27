import userModel from "../model/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    next("Please provide all fields");
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email already registered. Please login.");
  }
  const user = await userModel.create({ name, email, password });
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User created successfully",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

// export const loginController = async (req, res, next) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     next("Please provide all fields");
//   }
//   const user = await userModel.findOne({ email }).select("+password");
//   if (!user || !(await user.comparePassword(password))) {
//     next("Invalid username or password");
//   }
//   user.password = undefined;
//   const token = user.createJWT();
//   res.status(200).json({
//     success: true,
//     message: "Login successfully",
//     user,
//     token,
//   });
// };




export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation: check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide all fields" });
    }

    // Find user by email and include the password field
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Exclude password from the response
    user.password = undefined;

    // Create a token
    const token = user.createJWT();

    // Respond with success
    return res.status(200).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    next(error); // Pass any unexpected errors to the error middleware
  }
};
