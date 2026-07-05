const CheckoutButton = ({ onClick, text = "CONTINUE TO CHECKOUT" }: { onClick: () => void; text?: string }) => {
    return (
        <div className="flex justify-center mt-10">
            <button
                onClick={onClick}
                className="bg-[#2ca01c] hover:bg-[#248a15] text-white w-full sm:w-auto sm:px-16 py-4 text-[12px] sm:text-sm font-bold tracking-wider rounded-sm transition-colors"
            >
                {text} <i className="fa-solid fa-angle-right"></i>
            </button>
        </div>
    )
}

export default CheckoutButton;