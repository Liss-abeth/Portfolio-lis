const Home = require('../Models/HomeModel');

const getHome = async (req, res) => {
  try {
    const homeData = await Home.find(); // fetch all home entries
    res.json(homeData);
  } catch (err) {
    console.error("❌ Error fetching home data:", err.message);
    res.status(500).json({ message: "Error fetching home data", error: err.message });
  }
};

const createHome = async (req, res) => {
  try {
    const { welcomeText, intro, profileImg, userId } = req.body;

    if (!welcomeText || !intro) {
      return res.status(400).json({ message: "Welcome text and intro are required!" });
    }

    const newHome = new Home({
      welcomeText,
      intro,
      profileImg,
      userId,
    });

    await newHome.save();
    res.status(201).json(newHome);
  } catch (err) {
    console.error("❌ Error creating home data:", err.message);
    res.status(500).json({ message: "Error creating home", error: err.message });
  }
};

const updateHome = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home.userId.toString() !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });

    home.welcomeText = req.body.welcomeText || home.welcomeText;
    home.intro = req.body.intro || home.intro;
    home.profileImg = req.body.profileImg || home.profileImg;

    const updated = await home.save();
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating home data:", err.message);
    res.status(500).json({ message: "Error updating home", error: err.message });
  }
};

const deleteHome = async (req, res) => {
  try {
    const home = await Home.findById(req.params.id);
    if (home.userId.toString() !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });

    await home.deleteOne();
    res.json({ message: 'Home data deleted' });
  } catch (err) {
    console.error("❌ Error deleting home data:", err.message);
    res.status(500).json({ message: "Error deleting home", error: err.message });
  }
};

module.exports = {
  getHome,
  createHome,
  updateHome,
  deleteHome
};
