const TopBar = () => {
    return (
        <div className="bg-[#1c1c1c] text-white text-[10px] sm:text-xs">
            <div className="max-w-[1000px] mx-auto flex items-center justify-between px-6 py-2.5">

                <div className="flex items-center tracking-wide">
                    <span className="mr-1 sm:hidden">
                        <i className="fa-solid fa-phone mr-1"></i>
                    </span>
                    <span className="mr-1 hidden sm:inline">PHONE:</span>
                    <span className="font-medium">01858 438 819</span>
                </div>

                <div className="flex items-center tracking-wide">
                    <span className="mr-1 sm:hidden">
                        <i className="fa-solid fa-envelope mr-1"></i>
                    </span>
                    <span className="mr-1 hidden sm:inline">EMAIL:</span>
                    <span className="font-medium">
                        CONDENAST@SUBSCRIPTION.CO.UK
                    </span>
                </div>

            </div>
        </div>
    );
};

export default TopBar;