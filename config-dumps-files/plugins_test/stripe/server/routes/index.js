module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'stripeController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/settings',
    handler: 'stripeController.retrieveSettings',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/settings',
    handler: 'stripeController.updateSettings',
    config: {
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/pay',
    handler: 'stripeController.createPaymentIntent',
    config: {
      policies: [],
    },
  },
];
