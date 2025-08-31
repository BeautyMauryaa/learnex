export const getProfile = (req, res) => {
  res.json({
    msg: "Profile fetched successfully",
    user: req.user, // comes from verifyToken middleware
  });
};
