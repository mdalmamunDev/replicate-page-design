const CheckoutButton = ({ onClick, text = "CONTINUE TO CHECKOUT", formId, loading = false }: { onClick: () => void; text?: string; formId?: string; loading?: boolean }) => {
    const handleClick = () => {
        if (loading) return;

        if (formId) {
            const form = document.getElementById(formId) as HTMLFormElement;
            if (form) {
                if (form.checkValidity()) {
                    onClick();
                } else {
                    form.reportValidity();
                }
                return;
            }
        }
        onClick();
    };

    return (
        <div className="flex justify-center mt-10">
            <button
                onClick={handleClick}
                disabled={loading}
                className={`bg-[#2ca01c] hover:bg-[#248a15] text-white w-full sm:w-auto sm:px-16 py-4 text-[12px] sm:text-sm font-bold tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
                {loading ? (
                    <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        PROCESSING...
                    </>
                ) : (
                    <>
                        {text} <i className="fa-solid fa-angle-right"></i>
                    </>
                )}
            </button>
        </div>
    )
}

export default CheckoutButton;
