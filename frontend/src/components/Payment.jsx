import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const PaymentComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bike = location.state?.bike;

  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [amounts, setAmounts] = useState({
    bikePrice: 0,
    gst: 1000,
    testDrive: 1000,
    total: 0,
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (bike) {
      const bikePrice = parseFloat(bike.price);
      setAmounts({
        bikePrice,
        gst: 1000,
        testDrive: 1000,
        total: bikePrice + 1000 + 1000,
      });
    }
  }, [bike]);

  const handlePayment = () => {
    // Payment simulation
    setShowSuccess(true);

    // Auto redirect after 2.5s
    setTimeout(() => {
      setShowSuccess(false);
      navigate("/"); // Redirect to home or orders page
    }, 2500);
  };

  if (!bike) {
    return (
      <div className="text-center mt-20 text-red-500">
        No bike selected! Go back to{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/buy-bike")}
        >
          Buy Bike
        </span>
        .
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Payment Layout */}
      <div className="flex flex-col md:flex-row p-10 space-y-6 md:space-y-0 md:space-x-10">
        {/* Left side: Payment methods */}
        <div className="md:w-1/2 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-[#07435C]">
            Select Payment Method
          </h2>
          <form className="space-y-4">
            {[
              { id: "credit_card", label: "Credit/Debit Card" },
              { id: "net_banking", label: "Net Banking" },
              { id: "gpay", label: "Gpay" },
              { id: "paytm", label: "Paytm" },
              { id: "phonepe", label: "PhonePe" },
              { id: "amazon_pay", label: "Amazon Pay" },
            ].map((method) => (
              <div key={method.id} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4 text-[#07435C] focus:ring-[#07435C]"
                />
                <label className="text-gray-700 font-medium">{method.label}</label>
              </div>
            ))}
          </form>
        </div>

        {/* Right side: Amount details */}
        <div className="md:w-1/2 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-[#07435C]">
            Amount Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Bike Price</span>
              <span>₹ {amounts.bikePrice.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>GST Tax</span>
              <span>₹ {amounts.gst.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Test Drive Amount</span>
              <span>₹ {amounts.testDrive.toLocaleString("en-IN")}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span>₹ {amounts.total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-[#07435C] text-white py-3 rounded-xl font-semibold hover:bg-[#05506f] transition"
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              className="bg-white rounded-2xl p-10 flex flex-col items-center shadow-lg"
            >
              <motion.div
                className="bg-green-500 text-white rounded-full p-4 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                ✔
              </motion.div>
              <h2 className="text-xl font-semibold text-[#07435C] mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600 text-center">
                Your payment of ₹{amounts.total.toLocaleString("en-IN")} via{" "}
                {paymentMethod} has been processed.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentComponent;
