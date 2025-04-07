const { verifyPayment } = require('../services/paymentService');

function verifyPaymentMiddleware(req, res, next) {
  const paymentInfo = req.body.paymentInfo;

  verifyPayment(paymentInfo)
    .then(paymentStatus => {
      if (paymentStatus.isValid) {
        next();
      } else {
        next(boom.unauthorized('Payment verification failed'));
      }
    })
    .catch(error => {
      next(boom.internal('Payment service error'));
    });
}

module.exports = verifyPaymentMiddleware;
