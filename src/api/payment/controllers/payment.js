
// @ts-nocheck
const stripe = require('stripe')(process.env.STRIPE_KEY)
/**
 * payment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::payment.payment', ({ strapi }) => ({
    async create(ctx) {
        const order = ctx.request.body;
        try {
            const foundOrder = await strapi.entityService.findOne("api::order.order", order.data.order)
            console.log(foundOrder)
            const price = foundOrder.prices
            console.log(price)
            const orderType = foundOrder.orderType
            console.log(orderType)
            const lineItems = [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: orderType,
                        },
                        unit_amount: price * 100,
                    },
                    quantity: 1,
                },
            ];

            // Create the Stripe Checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}?session_id={CHECKOUT_SESSION_ID}`, // Replace with your success URL
                cancel_url: `${process.env.CLIENT_URL}?success=false`, // Replace with your cancel URL
            });

            console.log(session)

            // Create the order
            await strapi.service('api::payment.payment').create({ data: { order: foundOrder.id, Stripe_url: session.url } })

            return { stripeSession: session }
        } catch (err) {
            // return 500 error
            ctx.response.status = 500;
            return { error: { message: 'There was a problem creating the charge' } };
        }
    },
    // async update(ctx) {
    //     // const { session_id } = ctx.request.body
    //     // console.log(session_id)
    //     const { payment_id } = ctx
    //     console.log(payment_id)
    //     // const foundOrder = await strapi.query("api::payment.payment")
    //     // console.log(foundOrder)
    // }
}));



