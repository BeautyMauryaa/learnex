export const getProfile = (req, res) => {
  res.json({
    message: "Profile fetched successfully",
    user: req.user, // comes from verifyToken middleware
  });
};
