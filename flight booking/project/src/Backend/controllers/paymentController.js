const Payment = require('../models/Payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  try {
    const { bookingId, amount, paymentMethodId } = req.body;
    const userId = req.user.id; // Ensure user is authenticated

    console.log(
      `Processing payment for bookingId: ${bookingId}, Amount: ${amount}, PaymentMethod: ${paymentMethodId}`,
    );

    if (!bookingId || !amount || !paymentMethodId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // ✅ Step 1: Create Stripe Payment Intent
    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // Convert to cents
        currency: 'usd',
        payment_method: paymentMethodId,
        confirm: true, // Auto-confirm payment
        return_url: `${process.env.CLIENT_URL}/payment-success`,
      });
      console.log('✅ Stripe PaymentIntent created:', paymentIntent.id);
    } catch (stripeError) {
      console.error('❌ Stripe Payment Error:', stripeError.message);
      return res.status(500).json({ message: 'Stripe Payment Error', error: stripeError.message });
    }

    // ✅ Step 2: Save Payment to Database
    const payment = new Payment({
      bookingId,
      userId,
      amount,
      paymentStatus: paymentIntent.status, // 'succeeded' or 'requires_action'
      paymentMethod: paymentMethodId,
      stripePaymentId: paymentIntent.id,
    });
    await payment.save();
    console.log('✅ Payment saved to database:', payment.id);

    // ✅ Step 3: Return Payment Confirmation
    res.status(201).json({
      message: 'Payment successful',
      paymentId: payment.id,
      status: paymentIntent.status,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('❌ Payment Processing Error:', error.message);
    res.status(500).json({ message: 'Payment Error', error: error.message });
  }
};
