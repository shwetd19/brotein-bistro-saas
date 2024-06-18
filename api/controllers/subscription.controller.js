import Subscription from '../models/subscription.model.js';

export const createSubscription = (req, res) => {
  const subscriptionData = req.body;
  Subscription.create(subscriptionData)
   .then(subscription => res.status(201).json(subscription))
   .catch(error => res.status(500).json({ message: error.message }));
};

export const getAllSubscriptions = (_, res) => {
  Subscription.find({})
   .then(subscriptions => res.status(200).json(subscriptions))
   .catch(error => res.status(500).json({ message: error.message }));
};

export const getSubscriptionById = (req, res) => {
  const { id } = req.params;
  Subscription.findById(id)
   .then(subscription => {
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
      res.status(200).json(subscription);
    })
   .catch(error => res.status(500).json({ message: error.message }));
};
