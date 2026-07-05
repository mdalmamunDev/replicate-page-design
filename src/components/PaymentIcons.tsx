function PaymentIcons() {
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <div className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded-sm flex items-center gap-1 font-bold">
        <span></span>Pay
      </div>
      <div className="bg-[#003087] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold italic">
        PayPal
      </div>
      <div className="bg-[#2E77BC] text-white text-[10px] px-1.5 py-0.5 rounded-sm font-bold">
        AE
      </div>
      <div className="flex">
        <div className="w-4 h-4 bg-[#EB001B] rounded-full"></div>
        <div className="w-4 h-4 bg-[#F79E1B] rounded-full -ml-2"></div>
      </div>
      <div className="text-[#1A1F71] font-bold text-sm italic tracking-tight">VISA</div>
    </div>
  );
}

export default PaymentIcons;