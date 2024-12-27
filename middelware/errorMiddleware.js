const errmdlwr = (err, req, res, next) => {
    console.log(err); // Log the error for debugging

    const deferr = {
        status: 500,
        message: "Internal Server Error",
    };

    // Handle validation errors (Mongoose validation errors, for example)
    if (err.name === "ValidationError") {
        deferr.status = 400;
        deferr.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(", ");
    }

    // Handle other specific errors (add more as needed)
    if (err.name === "CastError") {
        deferr.status = 400;
        deferr.message = `Invalid ${err.path}: ${err.value}`;
    }

    // Send the error response
    res.status(deferr.status).json({ message: deferr.message });
};

export default errmdlwr;
