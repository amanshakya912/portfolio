import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMapMarkedAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Contact Section */}
      <div id="Contact" className="relative">
        <section className="py-16 bg-blue-950 text-white font-karla bg-cover md:aspect-[16/9] aspect-[9/16] bg-[url('../src/assets/bg5mob.png')] md:bg-[url('../src/assets/bg5.png')]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-cormorant text-center mb-12">
              Contact Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-blue-900 p-5 rounded-lg shadow-md z-50"
              >
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-white">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter Your Name"
                      className="w-full p-2 mt-1 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-white">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter Your Email"
                      className="w-full p-2 mt-1 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-white">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Send a Message"
                      className="w-full p-2 mt-1 h-28 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder:text-gray-400"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 cursor-pointer transition-all rounded-lg font-semibold"
                  >
                    Send Message
                  </button>
                  {success && (
                    <p className="text-green-400 text-sm mt-2">
                        Message sent successfully!
                    </p>
                    )}
                </form>
              </motion.div>

              {/* Contact Info & Links */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 z-50 md:text-start text-center"
              >
                <h3 className="text-xl font-semibold">Contact Information</h3>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <a
                    title="Mail to: amanshakya9912@gmail.com"
                    className="cursor-pointer hover:text-blue-400"
                    href="mailto: amanshakya9912@gmail.com"
                  >
                    amanshakya9912@gmail.com
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <FontAwesomeIcon icon={faPhone} />
                  <a
                    title="Call at +977-9818313576"
                    className="cursor-pointer hover:text-blue-400"
                    href="tel:+977-9818313576"
                  >
                    +977-9818313576
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <FontAwesomeIcon icon={faMapMarkedAlt} />

                  <span>Lalitpur, Nepal</span>
                </div>

                <h3 className="text-xl font-semibold mt-6">Find Me Online</h3>
                <div className="flex space-x-4 justify-center md:justify-start">
                  <a
                    href="https://github.comamanshakya912"
                    title="Github"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-white hover:text-blue-400"
                  >
                    <FontAwesomeIcon className="text-xl" icon={faGithub} />
                  </a>
                  <a
                    href="https://linkedin.com/in/amanshakya912"
                    title="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-white hover:text-blue-400"
                  >
                    <FontAwesomeIcon className="text-xl" icon={faLinkedin} />
                  </a>
                </div>
              </motion.div>
            </div>
            
          </div>
        </section>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
        <div className="absolute bottom-4 text-white w-full">
            <p className="text-center">
              © {new Date().getFullYear()} Aman Shakya. All rights reserved.
            </p>
            </div>
      </div>
    </>
  );
};

export default Contact;
