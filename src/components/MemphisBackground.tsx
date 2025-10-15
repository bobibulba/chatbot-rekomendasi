import React from 'react';

export const MemphisBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F7CAC9] via-[#88B04B] to-[#6B5B95] opacity-20" />
      
      {/* Geometric shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 border-8 border-[#FF6F61] rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-24 h-24 bg-[#88B04B] rotate-45 border-4 border-black opacity-70" />
      <div className="absolute bottom-20 left-1/4 w-40 h-40 border-8 border-[#6B5B95] rounded-full opacity-50" />
      <div className="absolute top-1/3 right-10 w-20 h-20 bg-[#F7CAC9] border-4 border-black opacity-80" />
      <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-[#FF6F61] rounded-full border-4 border-black" />
      
      {/* Zigzag patterns */}
      <svg className="absolute top-0 left-1/2 w-64 h-32 opacity-30" viewBox="0 0 200 100">
        <path d="M0,50 L25,25 L50,50 L75,25 L100,50 L125,25 L150,50 L175,25 L200,50" 
              stroke="#FF6F61" strokeWidth="8" fill="none" strokeLinecap="round"/>
      </svg>
      
      <svg className="absolute bottom-0 right-1/4 w-48 h-24 opacity-30" viewBox="0 0 200 100">
        <path d="M0,50 L25,75 L50,50 L75,75 L100,50 L125,75 L150,50 L175,75 L200,50" 
              stroke="#6B5B95" strokeWidth="8" fill="none" strokeLinecap="round"/>
      </svg>

      {/* Dots pattern */}
      <div className="absolute top-1/2 left-10 grid grid-cols-4 gap-4 opacity-40">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="w-3 h-3 bg-[#88B04B] rounded-full border-2 border-black" />
        ))}
      </div>

      {/* Lines */}
      <div className="absolute top-20 right-1/3 w-1 h-40 bg-[#FF6F61] border-2 border-black opacity-60 rotate-12" />
      <div className="absolute bottom-32 left-1/3 w-1 h-32 bg-[#6B5B95] border-2 border-black opacity-60 -rotate-12" />
    </div>
  );
};
