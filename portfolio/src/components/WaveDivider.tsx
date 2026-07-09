const WaveDivider = ({ flip = false }: { flip?: boolean }) => {
  return (
    <div className={`relative w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="relative w-full h-12 md:h-20"
        style={{ display: 'block' }}
      >
        <path
          d="M0,60 C180,110 360,10 540,60 C720,110 900,10 1080,60 C1260,110 1440,10 1440,60 L1440,120 L0,120 Z"
          fill="#0a1628"
        />
        <path
          d="M0,80 C200,40 400,100 600,70 C800,40 1000,100 1200,70 C1350,50 1440,80 1440,80 L1440,120 L0,120 Z"
          fill="#0a1628"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default WaveDivider;