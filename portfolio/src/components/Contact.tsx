import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkedAlt,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { useForm } from "@formspree/react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [state, handleSubmit] = useForm("xwvvelrr");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="Contact"
      className="relative bg-blue-950 text-white pt-30 pb-5 
        bg-cover bg-no-repeat
        bg-[url('../src/assets/bg5mob.png')]
        md:bg-[url('../src/assets/bg5.png')]"
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-blue-950/70" />

      <div className="relative max-w-6xl mx-auto px-6 font-karla">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl text-center font-cormorant mb-4">
          Contact Me
        </h2>

        <div className="mx-auto mb-12 h-0.5 w-28 bg-linear-to-r from-transparent via-cyan-400 to-transparent" />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl p-px
              bg-linear-to-br from-blue-400/30 via-cyan-300/10 to-transparent"
          >
            <div
              className="rounded-2xl bg-blue-950/85 backdrop-blur-xl
              border border-blue-800/50 p-6"
            >
              <h3 className="text-xl font-semibold mb-6 text-blue-100">
                Get in Touch
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {["name", "email"].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 capitalize">{field}</label>
                    <input type="text" name="_gotcha" className="hidden" />

                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      value={(formData as any)[field]}
                      onChange={handleChange}
                      required
                      placeholder={`Enter your ${field}`}
                      className="w-full rounded-lg px-3 py-2
                        bg-blue-900/60 border border-blue-800/60
                        focus:outline-none focus:ring-2 focus:ring-cyan-400
                        text-white placeholder:text-blue-300"
                    />
                  </div>
                ))}

                <div>
                  <label className="block mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Write your message..."
                    className="w-full h-28 rounded-lg px-3 py-2
                      bg-blue-900/60 border border-blue-800/60
                      focus:outline-none focus:ring-2 focus:ring-cyan-400
                      text-white placeholder:text-blue-300"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-lg cursor-pointer
                    bg-linear-to-r from-cyan-500 to-blue-600
                    hover:opacity-90 transition font-semibold"
                >
                  Send Message
                </button>

                {state.succeeded && (
                  <p className="text-cyan-400 text-sm">
                    Message sent successfully!
                  </p>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 text-center md:text-left"
          >
            <h3 className="text-xl font-semibold text-blue-100">
              Contact Information
            </h3>

            <InfoRow icon={faEnvelope}>
              <a
                href="mailto:amanshakya9912@gmail.com"
                className="hover:text-cyan-300 transition"
              >
                amanshakya9912@gmail.com
              </a>
            </InfoRow>

            <InfoRow icon={faPhone}>
              <a
                href="tel:+9779818313576"
                className="hover:text-cyan-300 transition"
              >
                +977-9818313576
              </a>
            </InfoRow>

            <InfoRow icon={faMapMarkedAlt}>Lalitpur, Nepal</InfoRow>

            <h3 className="text-xl font-semibold mt-8 text-blue-100">
              Find Me Online
            </h3>

            <div className="flex justify-center md:justify-start gap-6 text-xl">
              <SocialLink
                href="https://github.com/amanshakya912"
                icon={faGithub}
              />
              <SocialLink
                href="https://linkedin.com/in/amanshakya912"
                icon={faLinkedin}
              />
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-sm text-blue-300">
          © {new Date().getFullYear()} Aman Shakya. All rights reserved.
        </div>
      </div>
    </section>
  );
};

/* Small helpers for cleanliness */
const InfoRow = ({ icon, children }: any) => (
  <div className="flex items-center justify-center md:justify-start gap-4">
    <FontAwesomeIcon icon={icon} className="text-cyan-400" />
    <span>{children}</span>
  </div>
);

const SocialLink = ({ href, icon }: any) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-cyan-300 transition"
  >
    <FontAwesomeIcon icon={icon} />
  </a>
);

export default Contact;
