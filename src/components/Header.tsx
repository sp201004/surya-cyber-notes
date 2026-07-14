import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotebookPen } from 'lucide-react';

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <header className="bg-[#161c2c]/90 backdrop-blur-md border-b border-[#2d3a54] sticky top-0 z-50 px-6 py-4" id="minimal-header">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Brand Text Logo */}
        <div 
          onClick={() => navigate('/home')}
          className="flex items-center space-x-2.5 cursor-pointer select-none group"
          id="brand-logo"
        >
          <div className="bg-[#9fef00]/10 border border-[#9fef00]/30 p-1.5 rounded-lg text-[#9fef00] group-hover:bg-[#9fef00]/20 transition-all shadow-[0_0_10px_rgba(159,239,0,0.25)]">
            <NotebookPen className="w-5 h-5" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-white font-extrabold tracking-tight text-lg group-hover:text-[#9fef00] transition-colors duration-200">
              Surya's <span className="text-[#9fef00]">Cyber Notes</span>
            </span>
            <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">SP Notes</span>
          </div>
        </div>
      </div>
    </header>
  );
}
