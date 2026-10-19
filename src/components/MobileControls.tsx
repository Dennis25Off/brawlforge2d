import React, { useRef, useState, useEffect } from 'react';
import { Shield, Zap, Sword, Flame, ArrowUpCircle } from 'lucide-react';

interface MobileControlsProps {
  onInputUpdate: (inputs: {
    left: boolean;
    right: boolean;
    up: boolean;
    down: boolean;
    jump: boolean;
    light: boolean;
    heavy: boolean;
    special: boolean;
    dodge: boolean;
  }) => void;
  onEmote: (emoji: string) => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ onInputUpdate, onEmote }) => {
  const joystickContainerRef = useRef<HTMLDivElement>(null);
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const [showEmotePicker, setShowEmotePicker] = useState(false);

  // Current inputs state ref
  const inputsRef = useRef({
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    light: false,
    heavy: false,
    special: false,
    dodge: false,
  });

  const updateInputs = (partial: Partial<typeof inputsRef.current>) => {
    inputsRef.current = { ...inputsRef.current, ...partial };
    onInputUpdate({ ...inputsRef.current });
  };

  // Joystick touch handlers
  const handleJoystickStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setJoystickActive(true);
    handleJoystickMove(e);
  };

  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!joystickContainerRef.current) return;
    const rect = joystickContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const touch = e.touches[0];
    const dx = touch.clientX - centerX;
    const dy = touch.clientY - centerY;
    const distance = Math.hypot(dx, dy);
    const maxRadius = 45;

    const clampedDist = Math.min(distance, maxRadius);
    const angle = Math.atan2(dy, dx);

    const nx = Math.cos(angle) * clampedDist;
    const ny = Math.sin(angle) * clampedDist;

    setJoystickPos({ x: nx, y: ny });

    // Thresholds
    const threshold = 14;
    updateInputs({
      left: dx < -threshold,
      right: dx > threshold,
      up: dy < -threshold,
      down: dy > threshold,
    });
  };

  const handleJoystickEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    setJoystickActive(false);
    setJoystickPos({ x: 0, y: 0 });
    updateInputs({
      left: false,
      right: false,
      up: false,
      down: false,
    });
  };

  // Button touch helpers
  const bindButton = (key: 'jump' | 'light' | 'heavy' | 'special' | 'dodge') => {
    return {
      onTouchStart: (e: React.TouchEvent) => {
        e.preventDefault();
        if (navigator.vibrate) navigator.vibrate(10);
        updateInputs({ [key]: true });
      },
      onTouchEnd: (e: React.TouchEvent) => {
        e.preventDefault();
        updateInputs({ [key]: false });
      },
      onMouseDown: (e: React.MouseEvent) => {
        e.preventDefault();
        updateInputs({ [key]: true });
      },
      onMouseUp: (e: React.MouseEvent) => {
        e.preventDefault();
        updateInputs({ [key]: false });
      },
    };
  };

  const emotes = ['🔥', '👑', '💀', '⚡', '😎', '⚔️'];

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-30 flex justify-between items-end p-4 pb-6 md:p-8">
      {/* LEFT: Virtual Joystick */}
      <div className="pointer-events-auto flex flex-col items-center">
        <div
          ref={joystickContainerRef}
          onTouchStart={handleJoystickStart}
          onTouchMove={handleJoystickMove}
          onTouchEnd={handleJoystickEnd}
          className={`relative w-36 h-36 rounded-full border-2 border-zinc-700/60 bg-zinc-900/60 backdrop-blur-md flex items-center justify-center transition-colors ${
            joystickActive ? 'border-cyan-500/80 bg-zinc-900/80 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : ''
          }`}
        >
          {/* Outer direction indicators */}
          <div className="absolute top-1 text-[10px] font-bold text-zinc-500">▲</div>
          <div className="absolute bottom-1 text-[10px] font-bold text-zinc-500">▼</div>
          <div className="absolute left-1 text-[10px] font-bold text-zinc-500">◀</div>
          <div className="absolute right-1 text-[10px] font-bold text-zinc-500">▶</div>

          {/* Stick thumb */}
          <div
            style={{
              transform: `translate(${joystickPos.x}px, ${joystickPos.y}px)`,
              transition: joystickActive ? 'none' : 'transform 0.15s ease-out',
            }}
            className={`w-14 h-14 rounded-full border border-cyan-400/80 bg-gradient-to-tr from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.6)] flex items-center justify-center`}
          >
            <div className="w-5 h-5 rounded-full bg-cyan-200/60" />
          </div>
        </div>

        {/* Emote trigger */}
        <div className="relative mt-2">
          <button
            onClick={() => setShowEmotePicker(!showEmotePicker)}
            className="px-3 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700 text-xs font-bold text-zinc-300 backdrop-blur-sm active:scale-95"
          >
            💬 Emote
          </button>

          {showEmotePicker && (
            <div className="absolute bottom-10 left-0 bg-zinc-900/95 border border-zinc-700 p-2 rounded-xl flex gap-1 shadow-2xl backdrop-blur-md">
              {emotes.map((em) => (
                <button
                  key={em}
                  onClick={() => {
                    onEmote(em);
                    setShowEmotePicker(false);
                  }}
                  className="w-8 h-8 flex items-center justify-center text-lg hover:bg-zinc-800 rounded-lg active:scale-90"
                >
                  {em}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Action Buttons Cluster */}
      <div className="pointer-events-auto relative w-56 h-56">
        {/* JUMP BUTTON (Bottom Center) */}
        <button
          {...bindButton('jump')}
          className="absolute bottom-0 left-12 w-18 h-18 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 border-2 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)] active:scale-90 flex flex-col items-center justify-center text-white"
        >
          <ArrowUpCircle className="w-6 h-6" />
          <span className="text-[10px] font-black tracking-wider uppercase">SALTA</span>
        </button>

        {/* LIGHT ATTACK (Right Center) */}
        <button
          {...bindButton('light')}
          className="absolute bottom-14 right-0 w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 border-2 border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-90 flex flex-col items-center justify-center text-white"
        >
          <Sword className="w-5 h-5" />
          <span className="text-[9px] font-black tracking-wider uppercase">LEGGERO</span>
        </button>

        {/* HEAVY SMASH (Top Center) */}
        <button
          {...bindButton('heavy')}
          className="absolute top-2 left-14 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 border-2 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-90 flex flex-col items-center justify-center text-white"
        >
          <Flame className="w-5 h-5" />
          <span className="text-[9px] font-black tracking-wider uppercase">PESANTE</span>
        </button>

        {/* SPECIAL / RECOVERY (Top Left) */}
        <button
          {...bindButton('special')}
          className="absolute top-10 left-0 w-14 h-14 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 border-2 border-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.5)] active:scale-90 flex flex-col items-center justify-center text-white"
        >
          <Zap className="w-5 h-5" />
          <span className="text-[8px] font-black tracking-wider uppercase">SPECIAL</span>
        </button>

        {/* DODGE (Center Left) */}
        <button
          {...bindButton('dodge')}
          className="absolute bottom-20 left-10 w-13 h-13 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-500 border-2 border-zinc-300 shadow-md active:scale-90 flex flex-col items-center justify-center text-white"
        >
          <Shield className="w-4 h-4" />
          <span className="text-[8px] font-black tracking-wider uppercase">SCHIVA</span>
        </button>
      </div>
    </div>
  );
};
