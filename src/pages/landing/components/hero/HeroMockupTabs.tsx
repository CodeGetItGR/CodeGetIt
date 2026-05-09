import type { HeroCopy, HeroMockupIndex } from './hero.types';

interface HeroMockupTabsProps {
  copy: HeroCopy['mockups']['tabs'];
  activeIndex: HeroMockupIndex;
  onChange: (index: HeroMockupIndex) => void;
}

export function HeroMockupTabs({ copy, activeIndex, onChange }: HeroMockupTabsProps) {
  return (
    <div className="mb-6 flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-800/30 p-1 sm:mb-8 sm:gap-2">
      {copy.map((label, index) => (
        <button
          key={label}
          type="button"
          onClick={() => onChange(index as HeroMockupIndex)}
          className={[
            'flex-1 rounded-lg px-2 py-2 text-[10px] font-medium transition-all sm:px-4 sm:py-2.5 sm:text-xs',
            activeIndex === index
              ? 'bg-slate-800 text-cyan-400 shadow-lg'
              : 'text-slate-400 hover:text-slate-300',
          ].join(' ')}
        >
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">{label.split(' ')[0]}</span>
        </button>
      ))}
    </div>
  );
}
