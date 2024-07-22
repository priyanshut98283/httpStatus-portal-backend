const List = require("../models/List");

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ userId: req.userId });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createList = async (req, res) => {
  try {
    const { name, items } = req.body;
    const newList = new List({ name, items, userId: req.userId });
    await newList.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    await List.findOneAndDelete({ _id: id, userId: req.userId });
    res.json({ message: "List deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateList = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, items } = req.body;
    const updatedList = await List.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { name, items },
      { new: true }
    );
    if (!updatedList) return res.status(404).json({ error: "List not found" });
    res.json(updatedList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
