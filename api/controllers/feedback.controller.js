import Feedback from "../models/feedback.model.js";

export const createFeedback = (req, res) => {
  const feedbackData = req.body;
  Feedback.create(feedbackData)
    .then((feedback) => res.status(201).json(feedback))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const getAllFeedback = (_, res) => {
  Feedback.find({})
    .then((feedbacks) => res.status(200).json(feedbacks))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const getFeedbackById = (req, res) => {
  const { id } = req.params;
  Feedback.findById(id)
    .then((feedback) => {
      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }
      res.status(200).json(feedback);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const updateFeedback = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  Feedback.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  })
    .then((updatedFeedback) => res.status(200).json(updatedFeedback))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const deleteFeedback = (req, res) => {
  const { id } = req.params;
  Feedback.findByIdAndDelete(id)
    .then(() => res.status(204).send())
    .catch((error) => res.status(500).json({ message: error.message }));
};
