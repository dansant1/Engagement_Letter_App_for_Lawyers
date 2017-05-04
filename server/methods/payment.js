let Stripe = StripeAPI( Meteor.settings.private.stripe );

Meteor.methods({
  processPayment( charge ) {
    check( charge, {
      amount: Number,
      currency: String,
      source: String,
      description: String,
      receipt_email: String
    });

    let handleCharge = Meteor.wrapAsync( Stripe.charges.create, Stripe.charges ),
        payment      = handleCharge( charge );

    return payment;
  }
});

Meteor.methods({
  'chargeCard': function(charge) {
    Stripe.charges.create(charge, function(err, charge) {
      console.log(err, charge);
    });

  }
});