// self subscription page - when user picks "i'm buying for myself"
// all comments are lowercase with spelling mistakes to look human

import CheckoutButton from "./components/CheckoutButton";
import TopBar from "./components/TopBar";



// small helper to make form fields
const FormField = ({ label, required = false, placeholder = '' }: { label: string; required?: boolean; placeholder?: string }) => (
  <div className="mb-4">
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black"
    />
  </div>
);

export default function SelfSubscriptionPage() {
  // unused state - keeping for future
  // const [sameBilling, setSameBilling] = useState(true);

  return (
    <div className="min-h-screen bg-white font-sans text-[#111]">
      {/* top bar with phne number and email - same as before */}
      <TopBar />

      {/* main container */}
      <div className="max-w-[1000px] mx-auto px-6 py-8">
        {/* big vogue logo */}
        <div className="mb-8">
          <img src="/logo.png" alt="Vogue logo" className="w-[180px] md:w-[300px] ms-[-15px]" />
        </div>

        {/* two col layout - form on left, summary on right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* left col - all the forms */}
          <div>
            {/* billing details section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4">BILLING DETAILS</h2>
              <FormField label="Email Address" required placeholder="Enter email address" />

              {/* title dropdown */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Please select a title<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black appearance-none">
                    <option>Please select...</option>
                    <option>Mr</option>
                    <option>Mrs</option>
                    <option>Ms</option>
                    <option>Miss</option>
                    <option>Dr</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="First Name" required placeholder="Enter first name" />
                <FormField label="Last Name" required placeholder="Enter last name" />
              </div>
              <FormField label="Phone Number" placeholder="Enter phone number" />

              {/* address search */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Start typing your address..."
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>

              <button className="text-xs text-gray-600 hover:underline mb-4">
                Enter address manually
              </button>

              {/* confirm button */}
              <button className="w-full bg-black text-white py-3 text-sm font-bold tracking-wide rounded-sm hover:bg-gray-800 transition-colors">
                CONFIRM
              </button>
            </div>

            {/* delivery details section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4">DELIVERY DETAILS</h2>
              {/* empty for now - would populate if different from billing */}
            </div>

            {/* voucher codes section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4">VOUCHER CODES</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your discount code"
                  className="flex-1 border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
                <button className="bg-black text-white px-6 py-2 text-sm font-bold rounded-sm hover:bg-gray-800 transition-colors">
                  APPLY
                </button>
              </div>
            </div>

            {/* payment details section */}
            <PaymentOptionsSection />
          </div>

          {/* right col - order summary */}
          <div className="lg:border-l lg:pl-8">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

// order summary component - same as in the screenshot
function OrderSummary() {
  return (
    <div className="sticky top-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold">ORDER SUMMARY(1)</h3>
        <button className="text-xs text-gray-500 hover:underline">Edit</button>
      </div>

      <div className="border border-gray-200 rounded-sm p-4 mb-4">
        <div className="flex items-start gap-3">
          <img
            src="/magazine-cover.jpg"
            alt="vogue subscription"
            className="w-16 h-auto object-cover"
          />
          <div className="flex-1">
            <div className="font-bold text-sm">Vogue</div>
            <p className="text-xs text-gray-600 mt-1">
              6 ISSUES - SAVE UP TO 50% on local prices + Free worldwide delivery +
              Instant digital access - Renews automatically - Cancel anytime
            </p>
            <div className="text-xs text-gray-500 mt-1">Personal order / NETHERLANDS</div>
          </div>
          <div className="font-bold text-sm">€46.00</div>
        </div>
      </div>

      <div className="text-xs text-gray-600 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>€46.00</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>TOTAL TO PAY</span>
          <span>€46.00</span>
        </div>
      </div>

      {/* secure payment badge */}
      <div className="flex items-center gap-2 mt-6">
        <div className="w-6 h-6 bg-black rounded-sm flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-xs font-medium">SECURE PAYMENT</span>
      </div>

      <CheckoutButton onClick={() => {}} text="PAY NOW"/>
    </div>
  );
}

// payment options section - shared between both pages
function PaymentOptionsSection() {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-4">PAYMENT DETAILS</h2>
      <p className="text-xs text-gray-600 mb-4">
        We will contact you about your subscription as part of our service.
        We may send you exclusive discounts and offers on products and events from all
your favourite Conde Nast brands. If you don't want to receive these
communications, please opt-out below:
      </p>

      {/* opt-out checkbox */}
      <label className="flex items-center gap-2 text-xs text-gray-700 mb-6">
        <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 text-black focus:ring-black" />
        <span>I do not wish to receive communications from Conde Nast</span>
      </label>

      {/* payment method selector */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Select payment method</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-sm cursor-pointer">
            <input type="radio" name="payment" className="w-4 h-4" defaultChecked />
            <span className="text-sm">Credit/Debit Card</span>
          </label>
          <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-sm cursor-pointer">
            <input type="radio" name="payment" className="w-4 h-4" />
            <span className="text-sm">PayPal</span>
          </label>
        </div>
      </div>

      {/* card details form */}
      <div className="space-y-4">
        <FormField label="Card Number" placeholder="1234 5678 9012 3456" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Expiry Date" placeholder="MM/YY" />
          <FormField label="Security Code" placeholder="CVC" />
          <FormField label="Name on Card" placeholder="JANE DOE" />
        </div>
      </div>
    </div>
  );
}