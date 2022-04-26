'use strict';

const unitializedStripe = require('stripe')
/**
 * stripe.js controller
 *
 * @description: A set of functions called "actions" of the `stripe` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    // Add your own logic here.
    ctx.body = strapi
    .plugin('stripe')
    .service('myService')
    .getWelcomeMessage();
    // Send 200 `ok`
    ctx.send({
      message: 'ok'
    });
  },

  updateSettings: async (ctx) => {
    const {user} = ctx.state
    const {pk} = ctx.request.body

    //Ensure user is admin
    if(user.roles[0].id != 1){
      return ctx.unauthorized("Only administrators allowed!")
    }

    if(!pk){
      return ctx.throw(400, "Please provide a private key")
    }

    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'entreprenerd_stripe'
    })

    const result = await pluginStore.set({ key: 'pk', value: pk })

    ctx.send({
      result
    })
  },

  retrieveSettings: async (ctx) => {
    const {user} = ctx.state

    if(user.roles[0].id != 1){
      return ctx.unauthorized("Only admins")
    }

    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'entreprenerd_stripe'
    })

    const pk = await pluginStore.get({ key: 'pk' })

    ctx.send({
      pk: pk ? pk : ''
    })
  },

  createPaymentIntent: async (ctx) => {
    let {amount} = ctx.request.body
    amount = parseInt(amount)

    if(isNaN(amount) || amount === 0){
      return ctx.throw(400, "Please provide a valid amount")
    }

    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'entreprenerd_stripe'
    })

    const pk = await pluginStore.get({key: 'pk'})

    const stripe = unitializedStripe(pk)

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount,
    //   currency: "usd"
    // })

    // ctx.send({paymentIntent})


    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success-payement',
      cancel_url: 'http://localhost:3000/canceled-payement',
    });

    ctx.redirect(303, session.url)
  }
};
