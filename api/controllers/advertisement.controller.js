import Advertisement from "../models/advertisement.model.js";
import aggregate from "mongoose";

export const createAdvertisement = (req, res) => {
  const advertisementData = req.body;
  Advertisement.create(advertisementData)
    .then((advertisement) => res.status(201).json(advertisement))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const getAllAdvertisements = (_, res) => {
  Advertisement.find({})
    .then((advertisements) => res.status(200).json(advertisements))
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const getAdvertisementById = (req, res) => {
  const { id } = req.params;
  Advertisement.findById(id)
    .then((advertisement) => {
      if (!advertisement) {
        return res.status(404).json({ message: "Advertisement not found" });
      }
      res.status(200).json(advertisement);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const deleteAdvertisement = (req, res) => {
  const { id } = req.params;
  Advertisement.findByIdAndDelete(id)
    .then(() => res.status(204).send())
    .catch((error) => res.status(500).json({ message: error.message }));
};

export const getLatestAdvertisement = (_, res) => {
  Advertisement.findOne({})
    .sort({ createdAt: -1 })
    .then((advertisement) => {
      if (!advertisement) {
        return res.status(404).json({ message: "Advertisement not found" });
      }
      res.status(200).json(advertisement);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};
