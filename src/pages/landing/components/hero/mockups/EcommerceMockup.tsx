import { Menu, Search, ShoppingCart } from 'lucide-react';

interface EcommerceMockupProps {
  statusTime: string;
  storeTitle: string;
  searchPlaceholder: string;
  featuredLabel: string;
  featuredProduct: string;
  price: string;
  addToCart: string;
  productCountLabel: string;
}

export function EcommerceMockup({
  statusTime,
  storeTitle,
  searchPlaceholder,
  featuredLabel,
  featuredProduct,
  price,
  addToCart,
  productCountLabel,
}: EcommerceMockupProps) {
  return (
    <div className="relative mx-auto max-w-[280px] sm:max-w-sm">
      <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="relative rounded-[2rem] border border-slate-800 bg-slate-900 p-2 shadow-2xl sm:rounded-[2.5rem] sm:p-3">
        <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-slate-900 sm:h-6 sm:w-32" />
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.5rem] bg-[#1a1f37] sm:rounded-[2rem]">
          <div className="absolute left-0 right-0 top-0 z-10 flex h-11 items-center justify-between px-8 text-xs text-white/90">
            <span>{statusTime}</span>
            <div className="h-3 w-4 rounded-sm border border-white/90" />
          </div>

          <div className="h-full pt-11">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <Menu className="h-5 w-5 text-white" />
              <span className="font-semibold text-white">{storeTitle}</span>
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>

            <div className="px-5 py-4">
              <div className="flex items-center gap-3 rounded-xl bg-slate-800/50 px-4 py-3">
                <Search className="h-4 w-4 text-slate-500" />
                <div className="flex-1 text-sm text-slate-500">{searchPlaceholder}</div>
              </div>
            </div>

            <div className="px-5 pb-4">
              <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 p-5">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="mb-1 text-xs text-cyan-400">{featuredLabel}</div>
                    <div className="mb-1 font-semibold text-white">{featuredProduct}</div>
                    <div className="text-2xl font-bold text-white">{price}</div>
                  </div>
                  <div className="h-16 w-16 rounded-xl bg-slate-800/50" />
                </div>

                <button type="button" className="w-full rounded-xl bg-cyan-400 py-3 text-sm font-semibold text-[#0f1729]">
                  {addToCart}
                </button>
              </div>
            </div>

            <div className="px-5 text-[10px] text-slate-500">{productCountLabel}</div>
            <div className="px-5 pt-3 grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="rounded-xl border border-slate-800 bg-slate-800/30 p-3">
                  <div className="mb-3 h-20 w-full rounded-lg bg-slate-700/50" />
                  <div className="mb-2 h-3 rounded bg-slate-700" />
                  <div className="h-3 w-1/2 rounded bg-slate-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

