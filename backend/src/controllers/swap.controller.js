import Swap from "../models/swap.model.js";

export const requestSwap = async (req, res) => {
  try {
    const { receiver, offeredSkill, requestedSkill, message } = req.body;

    if (receiver === req.user._id.toString()) {
      return res.status(400).json({ message: "Cannot swap with yourself" });
    }

    const newSwap = new Swap({
      requester: req.user._id,
      receiver,
      offeredSkill,
      requestedSkill,
      message
    });

    await newSwap.save();
    res.status(201).json({ message: "Swap request sent", swap: newSwap });
  } catch (err) {
    res.status(500).json({ message: "Error requesting swap", error: err.message });
  }
};

export const acceptSwap = async (req, res) => {
  try {
    const { id } = req.params;
    const swap = await Swap.findById(id);

    if (!swap) return res.status(404).json({ message: "Swap not found" });
    if (swap.receiver.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    swap.status = "accepted";
    await swap.save();
    res.status(200).json({ message: "Swap accepted", swap });
  } catch (err) {
    res.status(500).json({ message: "Error accepting swap", error: err.message });
  }
};

export const rejectSwap = async (req, res) => {
  try {
    const { id } = req.params;
    const swap = await Swap.findById(id);

    if (!swap) return res.status(404).json({ message: "Swap not found" });
    if (swap.receiver.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    swap.status = "rejected";
    await swap.save();
    res.status(200).json({ message: "Swap rejected", swap });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting swap", error: err.message });
  }
};

// Delete a swap request (only requester can delete)
export const deleteSwap = async (req, res) => {
  try {
    const { id } = req.params;
    const swap = await Swap.findById(id);

    if (!swap) return res.status(404).json({ message: "Swap not found" });
    if (swap.requester.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    await swap.deleteOne();
    res.status(200).json({ message: "Swap request deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting swap", error: err.message });
  }
};

// Get current user's swaps (sent or received)
export const getMySwaps = async (req, res) => {
  try {
    const swaps = await Swap.find({
      $or: [{ requester: req.user._id }, { receiver: req.user._id }]
    })
      .populate("requester", "username email")
      .populate("receiver", "username email");

    res.status(200).json(swaps);
  } catch (err) {
    res.status(500).json({ message: "Error fetching swaps", error: err.message });
  }
};
