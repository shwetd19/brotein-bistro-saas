// controllers/event.controller.js
import Event from "../models/event.model.js";

export const createEvent = (req, res) => {
  const eventData = req.body;
  Event.create(eventData)
    .then((event) => res.status(201).json(event))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const getAllEvents = (_, res) => {
  Event.find({})
    .then((events) => res.status(200).json(events))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const getEventById = (req, res) => {
  const { id } = req.params;
  Event.findById(id)
    .then((event) => {
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(event);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const deleteEvent = (req, res) => {
  const { id } = req.params;
  Event.findByIdAndDelete(id)
    .then(() => res.status(204).send())
    .catch((error) => res.status(500).json({ message: error.message }));
};
