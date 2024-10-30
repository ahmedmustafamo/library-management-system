function handleError(res, error, message) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
        success: false,
        message: `Error on ${message}.`,
    });
}
module.exports = handleError;