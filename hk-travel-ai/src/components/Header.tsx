import React, { useEffect } from 'react';

const Header = () => {
  const [isNarrow, setIsNarrow] = React.useState(false);
  useEffect(() => {
    const checkWidth = () => setIsNarrow(window.innerWidth < 410);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <header className="bg-white shadow-md py-4 sm:py-6 px-8">

      <div className="hidden sm:flex items-center justify-between w-full">
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <h1 className="text-lg md:text-lg lg:text-xl xl:text-2xl font-bold text-blue-900 truncate">
            Hong Kong Travel AI Guide
          </h1>
          <h2 className="text-sm md:text-sm lg:text-base xl:text-lg text-blue-600 font-semibold truncate">
            Your Intelligent Companion for Exploring Hong Kong
          </h2>
        </div>

        <div className="flex items-center gap-10 flex-shrink-0">
          <img
            src="/hk-travel-logo.svg"
            alt="HK Travel Guide"
            className="h-7 md:h-8 lg:h-10 xl:h-12 flex-shrink-0"
          />
        </div>
      </div>

      {/* Narrow screen layout (mobile) */}
      <div className="sm:hidden flex flex-col items-center gap-4">
        <div className="flex flex-col gap-0.5 items-center">
            <h1 className="text-base lg:text-xl font-bold text-blue-900">
            Hong Kong Travel {isNarrow? "":"AI "} Guide
            </h1>
            <h2 className="text-xs text-blue-600 font-semibold py-2">
            {isNarrow? "Smart":"Your Intelligent"} Travel Companion
            </h2>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="/hk-travel-logo.svg"
            alt="HK Travel Guide"
            className="h-8 flex-shrink-0"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;