import ocean from "../assets/ocean.mp4";
import resume from "../assets/AmanShakya_CV.pdf"
const HomeScreen = () => {
  return (
    <div className="relative overflow-hidden h-screen w-full z-40">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={ocean} type="video/mp4" />
      </video>
      <div className="absolute inset-0 flex flex-col items-center md:justify-center top-[30%] md:top-0 text-center text-blue-950 z-50">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant animate-fade-up animate-once animate-duration-2000 animate-delay-100">
          Aman Shakya
        </h1>
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-cormorant animate-fade-up animate-once animate-duration-2000 animate-delay-600">
          Software Developer
        </h2>
        <a href={resume} download={'AmanShakyaCV.pdf'} className="animate-fade animate-once animate-duration-2000 animate-delay-1000 font-karla bg-blue-950 text-white text-xl px-6 py-4 mt-10 hover:bg-blue-900 cursor-pointer rounded-md">
            View Resume
        </a>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-blue-400"></div>
    </div>
  );
};

export default HomeScreen;
