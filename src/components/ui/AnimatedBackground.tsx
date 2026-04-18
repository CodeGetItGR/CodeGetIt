export const AnimatedBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <div className="premium-backdrop absolute inset-0" />
      <div className="premium-grid absolute inset-0 opacity-60" />
      <div className="premium-noise absolute inset-0" />

      <div className="premium-orb premium-orb-left" />
      <div className="premium-orb premium-orb-right" />
      <div className="premium-orb premium-orb-bottom" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/75 to-transparent" />
    </div>
  );
};
