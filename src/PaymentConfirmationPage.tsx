// payment confirmation page - shown after successful payment
import { useLocation } from 'react-router-dom';
import TopBar from './components/TopBar';

interface PurchaseDetails {
  orderType: 'self' | 'gift';
  country: string;
  currency: string;
  price: string;
  planTitle: string;
}

export default function PaymentConfirmationPage() {
  const location = useLocation();
  const details = location.state as PurchaseDetails | null;

  // fallback if someone navigates here directly without state
  if (!details) {
    return (
      <div className="min-h-screen bg-white font-sans text-[#111]">
        <TopBar />
        <div className="max-w-[600px] mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Payment Confirmed</h1>
          <p className="text-gray-600">Thank you for your subscription!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#111]">
      <TopBar />

      <div className="max-w-[600px] mx-auto px-6 py-16">
        {/* animated success animation - lottie-like circle + checkmark */}
        <div className="flex justify-center mb-8">
          <div className="success-animation">
            <svg className="success-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              {/* background circle that scales in */}
              <circle
                className="success-circle-bg"
                cx="50" cy="50" r="45"
                fill="#ecfdf5"
              />
              {/* animated circle stroke */}
              <circle
                className="success-circle"
                cx="50" cy="50" r="45"
                fill="none"
                stroke="#22c55e"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="283"
                strokeDashoffset="283"
              />
              {/* animated checkmark */}
              <polyline
                className="success-check"
                points="30,50 44,65 70,38"
                fill="none"
                stroke="#22c55e"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="60"
                strokeDashoffset="60"
              />
              {/* sparkle dots */}
              <circle className="sparkle sparkle-1" cx="25" cy="25" r="2.5" fill="#22c55e" />
              <circle className="sparkle sparkle-2" cx="75" cy="25" r="2.5" fill="#22c55e" />
              <circle className="sparkle sparkle-3" cx="80" cy="65" r="2" fill="#22c55e" />
              <circle className="sparkle sparkle-4" cx="20" cy="70" r="2" fill="#22c55e" />
            </svg>
          </div>
        </div>

        {/* confirmation heading with fade in */}
        <div className="text-center mb-10 fade-in-up">
          <h1 className="text-3xl font-bold mb-3 text-gray-900">Payment Successful!</h1>
          <p className="text-gray-500 text-sm">Thank you for your purchase. Your subscription is confirmed.</p>
        </div>

        {/* purchase details card with slide up */}
        <div className="border border-gray-200 rounded-lg p-6 mb-8 card-slide-up">
          <h2 className="text-sm font-bold mb-4 pb-3 border-b border-gray-100">PURCHASE DETAILS</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Order Type</span>
              <span className="font-medium">{details.orderType === 'self' ? "For Myself" : "Gift Subscription"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Country</span>
              <span className="font-medium">{details.country}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Plan</span>
              <span className="font-medium">{details.planTitle}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="font-bold text-gray-800">Total Paid</span>
              <span className="font-bold text-xl text-[#22c55e]">{details.currency}{details.price}</span>
            </div>
          </div>
        </div>

        {/* what happens next */}
        <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-lg p-5 mb-8 card-slide-up delay-2">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold mb-1 text-gray-800">What happens next?</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                You will receive a confirmation email shortly with your subscription details and
                instructions for accessing your digital content. Your first issue will be delivered
                according to the publication schedule.
              </p>
            </div>
          </div>
        </div>

        {/* back to home button */}
        <div className="text-center fade-in-up delay-3">
          <a
            href="/"
            className="inline-block bg-black text-white px-12 py-3.5 text-sm font-bold tracking-wide rounded-lg hover:bg-gray-800 transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
          >
            BACK TO HOME
          </a>
        </div>
      </div>

      {/* animations */}
      <style>{`
        .success-animation {
          width: 120px;
          height: 120px;
        }
        .success-svg {
          width: 100%;
          height: 100%;
        }

        /* circle background scale in */
        .success-circle-bg {
          animation: scaleIn 0.4s ease-out 0.1s both;
          transform-origin: center;
        }

        /* circle stroke draw */
        .success-circle {
          animation: drawCircle 0.6s ease-out 0.1s forwards;
        }

        /* checkmark draw */
        .success-check {
          animation: drawCheck 0.4s ease-out 0.65s forwards;
        }

        /* sparkle animations */
        .sparkle {
          opacity: 0;
          animation: sparklePop 0.4s ease-out forwards;
        }
        .sparkle-1 { animation-delay: 0.3s; }
        .sparkle-2 { animation-delay: 0.4s; }
        .sparkle-3 { animation-delay: 0.5s; }
        .sparkle-4 { animation-delay: 0.35s; }

        /* fade in + slide up for text elements */
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.5s ease-out 0.3s forwards;
        }

        .card-slide-up {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.5s ease-out 0.5s forwards;
        }

        .delay-2 {
          animation-delay: 0.7s;
        }

        .delay-3 {
          animation-delay: 0.9s;
        }

        @keyframes scaleIn {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes drawCircle {
          to { stroke-dashoffset: 0; }
        }

        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }

        @keyframes sparklePop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}