import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// types for the main state variables
type OrderType = 'self' | 'gift';
type OfferKey = 
// '6' | 
'12';

// country data with flags, currency and prices
const countries = [
  {
    code: 'GB',
    name: 'UNITED KINGDOM',
    currency: '£',
    flag: ['#C8102E', '#FFFFFF', '#012169'],
    prices: { self: { '6': 46.0, '12': 119.0 }, gift: { '6': 65.0, '12': 119.0 } },
  },
  {
    code: 'NL',
    name: 'NETHERLANDS',
    currency: '€',
    flag: ['#AE1C28', '#FFFFFF', '#21468B'],
    prices: { self: { '6': 53.0, '12': 11.95 }, gift: { '6': 72.0, '12': 11.95 } },
  },
  {
    code: 'US',
    name: 'UNITED STATES',
    currency: '$',
    flag: ['#B22234', '#FFFFFF', '#3C3B6E'],
    prices: { self: { '6': 59.0, '12': 149.0 }, gift: { '6': 79.0, '12': 149.0 } },
  },
  {
    code: 'AU',
    name: 'AUSTRALIA',
    currency: 'A$',
    flag: ['#00008B', '#FFFFFF', '#FF0000'],
    prices: { self: { '6': 79.0, '12': 199.0 }, gift: { '6': 99.0, '12': 199.0 } },
  },
  {
    code: 'CA',
    name: 'CANADA',
    currency: 'C$',
    flag: ['#FF0000', '#FFFFFF', '#FF0000'],
    prices: { self: { '6': 62.0, '12': 159.0 }, gift: { '6': 82.0, '12': 159.0 } },
  },
  {
    code: 'FR',
    name: 'FRANCE',
    currency: '€',
    flag: ['#0055A4', '#FFFFFF', '#EF4135'],
    prices: { self: { '6': 53.0, '12': 11.95 }, gift: { '6': 72.0, '12': 11.95 } },
  },
  {
    code: 'DE',
    name: 'GERMANY',
    currency: '€',
    flag: ['#000000', '#DD0000', '#FFCE00'],
    prices: { self: { '6': 53.0, '12': 11.95 }, gift: { '6': 72.0, '12': 11.95 } },
  },
] as const;

// offers config - self and gift have different titles and desc
const offerConfigs: Record<OrderType, Record<OfferKey, { title: string; desc: string }>> = {
  self: {
    // '6': {
    //   title: '6 ISSUES - SAVE UP TO 50%',
    //   desc: 'on local prices + Free worldwide delivery + Instant digital access - Renews automatically - Cancel anytime',
    // },
    '12': {
      title: 'One year only',
      desc: '+ Free worldwide delivery + Instant digital access',
    },
  },
  gift: {
    // '6': {
    //   title: '6 MONTHS GIFT SUBSCRIPTION',
    //   desc: 'A perfect present for fashion lovers + Free worldwide delivery + Instant digital access for them',
    // },
    '12': {
      title: '12 MONTHS GIFT SUBSCRIPTION',
      desc: '+ Free worldwide delivery + A special gift pack included + Instant digital access',
    },
  },
};

// main app component that handles the selection form
function SubscriptionForm() {
  // main states for the page
  const [orderType, setOrderType] = useState<OrderType>('self');
  const [selectedOffer, setSelectedOffer] = useState<OfferKey>('12');
  const [countryCode, setCountryCode] = useState('NL');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sameCountry, setSameCountry] = useState(true);
  const [imageKey, setImageKey] = useState(0);
  const navigate = useNavigate();

  // current country object based on selected code
  const currentCountry = countries.find((c) => c.code === countryCode) || countries[1];
  // pick which cover image to show based on order type
  const coverImage = orderType === 'self' ? '/magazine-cover.jpg' : '/magazine-cover-2.jpg';

  // when order type changes, bump the imageKey to trigger fade anim
  useEffect(() => {
    setImageKey((k) => k + 1);
    // reset selection to first offer when type changes
    setSelectedOffer('12');
  }, [orderType]);

  // close dropdown when clicking outside
  useEffect(() => {
    const close = () => setDropdownOpen(false);
    if (dropdownOpen) {
      document.addEventListener('click', close);
      return () => document.removeEventListener('click', close);
    }
  }, [dropdownOpen]);

  // format price with two decimals
  const formatPrice = (p: number) => p.toFixed(2).replace('.', ',');

  // handle continue to checkout click
  const handleContinue = () => {
    if (orderType === 'self') {
      navigate('/self-checkout');
    } else {
      navigate('/gift-checkout');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#111]">
      {/* top bar with phne number and email */}
      <TopBar />

      {/* main container for the whole form */}
      <div className="max-w-[1000px] mx-auto px-6 pb-20">
        {/* big vogue logo in middle */}
        <div className="pt-6 pb-4">
          <img src="/logo.png" alt="Vogue logo" className="w-[180px] md:w-[300px] ms-[-15px]" />
        </div>

        {/* two colum layout - form on left, cover on right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 mt-6">
          {/* left col - the subscription form */}
          <div>
            {/* section title "Vogue" with line under */}
            <div className="flex items-end gap-4 border-b border-gray-200 pb-2 mb-6">
              <h2 className="text-2xl font-bold">Vogue</h2>
            </div>

            {/* picking ordertype - myself or gift */}
            <div className="mb-8">
              <h3 className="text-base font-medium mb-3">Choose your order type</h3>
              <div className="flex flex-col gap-3">
                {/* myself button - black if selected */}
                <button
                  onClick={() => setOrderType('self')}
                  className={`flex items-center justify-between px-5 py-4 text-sm font-semibold tracking-wide rounded-sm transition-all ${
                    orderType === 'self'
                      ? 'bg-black text-white'
                      : 'bg-white text-black border border-gray-300'
                  }`}
                >
                  <span>I'M BUYING FOR MYSELF</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </button>
                {/* gift button - black if selected */}
                <button
                  onClick={() => setOrderType('gift')}
                  className={`flex items-center justify-between px-5 py-4 text-sm font-semibold tracking-wide rounded-sm transition-all ${
                    orderType === 'gift'
                      ? 'bg-black text-white'
                      : 'bg-white text-black border border-gray-300'
                  }`}
                >
                  <span>I'M BUYING A GIFT</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* divider line */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* billing country selector */}
            <div className="mb-8">
              <h3 className="text-base font-medium mb-3">Choose your billing country</h3>
              <div className="relative">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                  className={`flex items-center border rounded-sm px-3 py-3 bg-white cursor-pointer select-none ${
                    dropdownOpen ? 'border-black' : 'border-gray-300'
                  }`}
                >
                  {/* country flag */}
                  <div className="flex flex-col mr-3 w-7 h-5 overflow-hidden rounded-sm border border-gray-200">
                    {currentCountry.flag.map((stripe, i) => (
                      <div
                        key={i}
                        className="flex-1"
                        style={{ backgroundColor: stripe }}
                      ></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-700 tracking-wide">
                    {currentCountry.name}
                  </span>
                </div>
                {/* dropdown arrow */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* dropdown list with countries */}
                {dropdownOpen && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-sm shadow-lg max-h-64 overflow-y-auto">
                    {countries.map((c) => (
                      <div
                        key={c.code}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCountryCode(c.code);
                          setDropdownOpen(false);
                        }}
                        className={`flex items-center px-3 py-2.5 cursor-pointer hover:bg-gray-50 ${
                          c.code === countryCode ? 'bg-gray-100' : ''
                        }`}
                      >
                        <div className="flex flex-col mr-3 w-7 h-5 overflow-hidden rounded-sm border border-gray-200">
                          {c.flag.map((stripe, i) => (
                            <div
                              key={i}
                              className="flex-1"
                              style={{ backgroundColor: stripe }}
                            ></div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-700 tracking-wide">{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* checkbox for same delivery contry */}
              <label className="flex items-center gap-2 mt-3 text-sm text-gray-700 cursor-pointer">
                <div
                  onClick={() => setSameCountry(!sameCountry)}
                  className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                    sameCountry ? 'bg-black' : 'bg-white border border-gray-300'
                  }`}
                >
                  {sameCountry && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span>Use same country for delivery</span>
              </label>
            </div>

            {/* another divider */}
            <div className="border-t border-gray-200 my-6"></div>

            {/* choose your offer section */}
            <div className="mb-8">
              {/* <h3 className="text-base font-medium mb-3">Choose your offer</h3> */}

              {/* six issue offer card */}
              {/* <div
                onClick={() => setSelectedOffer('6')}
                className={`relative rounded-md p-2 sm:p-5 mb-4 bg-white cursor-pointer transition-all ${
                  selectedOffer === '6'
                    ? 'border-2 border-black'
                    : 'border border-gray-300 hover:border-gray-500'
                }`}
              >
                {selectedOffer === '6' && (
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                <div className="flex items-start gap-1 sm:gap-4">
                  <div className="text-lg sm:text-2xl font-bold shrink-0 w-20 sm:w-26 m-auto text-center">
                    {currentCountry.currency}
                    {formatPrice(currentCountry.prices[orderType]['6'])}
                  </div>

                  <div className="flex-1">
                    <PaymentIcons />
                    <p className="text-[11px] sm:text-xs text-gray-700 leading-relaxed mt-2">
                      <span className="font-semibold">
                        {offerConfigs[orderType]['6'].title}
                      </span>{' '}
                      {offerConfigs[orderType]['6'].desc}
                    </p>
                  </div>
                </div>
              </div> */}

              {/* one year offer card */}
              <div
                onClick={() => setSelectedOffer('12')}
                className={`relative rounded-md p-2 sm:p-5 bg-white cursor-pointer transition-all ${
                  selectedOffer === '12'
                    ? 'border-2 border-black'
                    : 'border border-gray-300 hover:border-gray-500'
                }`}
              >
                {selectedOffer === '12' && (
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                  <div className="text-lg sm:text-2xl font-bold shrink-0 w-20 sm:w-26 sm:m-auto sm:text-center">
                    {currentCountry.currency}
                    {formatPrice(currentCountry.prices[orderType]['12'])}
                  </div>

                  <div className="flex-1">
                    <PaymentIcons />
                    <p className="text-[11px] sm:text-xs text-gray-700 leading-relaxed mt-2">
                      <span className="font-semibold">
                        {offerConfigs[orderType]['12'].title}
                      </span>{' '}
                      {offerConfigs[orderType]['12'].desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* green checkout button at the bottom */}
            <CheckoutButton onClick={handleContinue} />
          </div>

          {/* right col - magazine cover and extra info */}
          <div className="flex flex-col items-center">
            {/* magazine cover picture - fades when order type changes */}
            <div className="w-full max-w-[320px] mb-8 shadow-lg">
              <img
                key={imageKey}
                src={coverImage}
                alt={orderType === 'self' ? 'vogue magazine cover' : 'vogue gift issue cover'}
                className="w-full h-auto block vogue-fade-in"
              />
            </div>

            {/* small nav links under the cover */}
            <div className="flex gap-6 text-[10px] sm:text-[11px] font-bold tracking-wider mb-4">
              <a href="#" className="hover:underline">DELIVERY</a>
              <a href="#" className="hover:underline">ABOUT US</a>
              <a href="#" className="hover:underline">WHY SUBSCRIBE?</a>
            </div>

            {/* order today text */}
            <p className="text-xs text-gray-600 text-center mt-2 px-4">
              Order today and enjoy instant digital access
            </p>
          </div>
        </div>
      </div>

      {/* inline style for the fade in animation */}
      <style>{`
        .vogue-fade-in {
          animation: vogueFadeIn 0.6s ease-in-out both;
        }
        @keyframes vogueFadeIn {
          0% { opacity: 0; transform: scale(0.97); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// small component for the payment icons row


// import the checkout pages
import SelfSubscriptionPage from './SelfSubscriptionPage';
import GiftSubscriptionPage from './GiftSubscriptionPage';
import PaymentConfirmationPage from './PaymentConfirmationPage';
import TopBar from './components/TopBar';
import PaymentIcons from './components/PaymentIcons';
import CheckoutButton from './components/CheckoutButton';

// main app with router
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubscriptionForm />} />
        <Route path="/self-checkout" element={<SelfSubscriptionPage />} />
        <Route path="/gift-checkout" element={<GiftSubscriptionPage />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmationPage />} />
      </Routes>
    </Router>
  );
}
