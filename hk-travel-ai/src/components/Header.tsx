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
            AI Agentic Chatbot with Integrated Security
          </h1>
          <h2 className="text-sm md:text-sm lg:text-base xl:text-lg text-blue-600 font-semibold truncate">
            Complete WealthTech Solution for Financial Institutions
          </h2>
        </div>

        <div className="flex items-center gap-10 flex-shrink-0">
          <a href="https://www.aosummit.com/" target="_blank" rel="noopener noreferrer">
            <img
              src="/Finbot-logo.png"
              alt="Finbot"
              className="h-7 md:h-8 lg:h-10 xl:h-12 flex-shrink-0"
            />
          </a>
          <a href="https://www.dell.com/zh-hk" target="_blank" rel="noopener noreferrer">
            <img
              src="/Dell_Technologies_logo.png"
              alt="Dell Technologies"
              className="h-3 mt-2 md:h-4 lg:h-6 xl:h-8 flex-shrink-0"
            />
          </a>
        </div>
      </div>

      {/* Narrow screen layout (mobile) */}
      <div className="sm:hidden flex flex-col items-center gap-4">
        <div className="flex flex-col gap-0.5 items-center">
            <h1 className="text-base lg:text-xl font-bold text-blue-900">
            AI Agentic Chatbot with {isNarrow? "":" Integrated "} Security
            </h1>
            <h2 className="text-xs text-blue-600 font-semibold py-2">
            {isNarrow? "":"Complete"} WealthTech Solution for Financial Institutions
            </h2>
        </div>

        <div className="flex items-center justify-between gap-10 flex-shrink-0">
          <a href="https://apihub.algobot-sgx.ai/" target="_blank" rel="noopener noreferrer">
            <img
              src="/AlgoBot_logo.svg"
              alt="AlgoBot"
              className="h-8 flex-shrink-0"
            />
          </a>
          <a href="https://www.dell.com/zh-hk" target="_blank" rel="noopener noreferrer">
            <img
              src="/Dell_Technologies_logo.png"
              alt="Dell Technologies"
              className="h-4 flex-shrink-0"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;