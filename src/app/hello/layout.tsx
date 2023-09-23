import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return <div className="bg-slate-400 h-full">{children}</div>;
}

export default layout;
