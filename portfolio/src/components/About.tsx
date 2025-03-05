import bg1 from "../assets/bg1_2.png";
import bg1mob from "../assets/bg1mob.png";

const About = () => {
  return (
    <>
      <div
        className={`relative bg-cover flex items-center justify-center bg-blue-950 w-full md:aspect-[16/9] aspect-[9/16] bg-[url('../src/assets/bg1mob.png')] md:bg-[url('../src/assets/bg1_2.png')]`}
      >
        <div className="z-50 grid md:grid-cols-6 grid-cols-1 px-5 w-full gap-10">
          <div className="md:col-span-3 lg:col-span-4">
            <h2 className="text-white font-cormorant text-3xl mb-4">
              About Me
            </h2>
            <p className="text-white font-karla text-justify">
              <b>Hi there, I am Aman Shakya</b>, an enthusiastic, ambitious, and
              diligent B.Sc. CSIT student with a strong passion for learning and
              skill development. My journey into the tech world began with web
              development, where I gained hands-on experience working with
              React. Currently, I am expanding my expertise in mobile app
              development by learning and building applications with React
              Native. I am always eager to take on new challenges, committed to
              delivering my best while continuously learning and growing through
              every opportunity that comes my way.
            </p>
          </div>
          <div className="md:col-span-3 lg:col-span-2 bg-blue-400 opacity-80 h-[200px] p-5 border-8 border-blue-950">
            hello
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-transparent to-transparent"></div>
      </div>
    </>
  );
};

export default About;
