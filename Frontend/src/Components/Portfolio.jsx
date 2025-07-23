// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useEffect, useState, useRef } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SiTailwindcss } from "react-icons/si";
import { Link } from 'react-router-dom';

import { ExternalLink, Github } from "lucide-react";
import axios from "axios";
import logo from '../assets/logo.png'; // adjust path as needed
import bgImage from '../assets/home.jpg'; 
import * as echarts from "echarts";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const particlesRef = useRef(null);
  const skillChartRef = useRef(null);
  const [projects, setProjects] = useState([]);
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);
  const projectsRef = useRef(null);
 const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [text, setText] = useState("");
  const fullText = "Building stellar web experiences";
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showForm, setShowForm] = useState(false);


const visibleProjects = showAllProjects ? projects : projects.slice(0, 6);


const handlemailSubmit = async (e) => {
  e.preventDefault(); // prevent form reload
  setLoading(true);
  setSuccess(null);

  try {
 await axios.post("https://portfolio-backend-xnzh.onrender.com/api/email/contac", {
  name: form.name,
  email: form.email,
  message: form.message,
});



    setSuccess("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
 } catch (error) {
  console.error("Error sending message:", error);
  console.log("Full error response:", error?.response?.data || error.message);
  setSuccess(false);
}
finally {
    setLoading(false);
  }
};


  
 useEffect(() => {
  console.log("Loader started...");
  const timer = setTimeout(() => {
    setProjects(yourProjectsData);  // Replace with your actual data
    setLoading(false);
    console.log("Loader finished.");
  }, 2500);

  return () => clearTimeout(timer);
}, []);


  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prevText) => prevText + fullText[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);

  const initParticles = () => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        particle.y -= particle.speed;
        if (particle.y < 0) {
          particle.y = canvas.height;
          particle.x = Math.random() * canvas.width;
        }
      });
    }

    animate();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  };

  const handleSectionVisibility = (id) => {
    const section = document.getElementById(id);
    if (!section) return false;
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    return (
      rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.25
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills","experience", "projects", "contact"];
      for (const section of sections) {
        if (handleSectionVisibility(section)) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);





  const fetchProjects = async () => {
  setLoading(true);  // ✅ Start loader
  try {
    const res = await axios.get("https://portfolio-backend-xnzh.onrender.com/projects");
    setProjects(res.data);
  } catch (error) {
    console.error("Failed to fetch projects", error);
  } finally {
    setLoading(false);  // ✅ Stop loader whether success or fail
  }
};

useEffect(() => {
  fetchProjects();
}, []);

const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
     await axios.post('https://portfolio-backend-xnzh.onrender.com/contact/create', form);
      setSuccess("Message sent successfully!");
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setSuccess("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };




 const experienceData = [
  {
    role: "MERN Stack Developer",
    company: "Camerinfolks Pvt Ltd, Kochi",
    duration: "August 2024 – February 2025",
    description: "Developed and maintained web applications using JavaScript, React.js, and Node.js. Designed and implemented RESTful APIs for seamless data communication. Worked closely with cross-functional teams to contribute to the development of high-quality software solutions, ensuring timely delivery and meeting project requirements.",
    technologies: ["HTML", "CSS", "JavaScript", "React.js", "Node.js","Express.js", "MongoDB"]
  }
];


  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Particles Background */}
      <canvas
        ref={particlesRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      ></canvas>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-60 backdrop-blur-lg border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="flex justify-between items-center h-16">
      {/* Logo */}
 <a href="#home" className="text-2xl font-bold text-indigo-500 tracking-wide whitespace-nowrap">
    L<span className="text-white">B</span>
  </a>


      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 items-center">
        {["home", "about", "skills", "experience", "projects", "contact"].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className={`relative group text-sm font-medium px-3 py-2 transition-all duration-300 ${
              activeSection === item
                ? "text-indigo-400"
                : "text-gray-300 hover:text-indigo-400"
            }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
            <span
              className={`absolute left-0 -bottom-1 w-0 h-0.5 bg-indigo-400 transition-all group-hover:w-full ${
                activeSection === item ? "w-full" : ""
              }`}
            ></span>
          </a>
        ))}
      </div>

      {/* Mobile Toggle Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md text-gray-400 hover:text-indigo-400 hover:bg-gray-800 focus:outline-none transition-all"
        >
          <i
            className={`fas ${
              isMenuOpen ? "fa-times" : "fa-bars"
            } text-2xl transition-transform duration-300`}
          ></i>
        </button>
       </div>
     </div>
     </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-md">
      <div className="px-4 py-4 space-y-2">
        {["home", "about", "skills", "experience","projects", "contact"].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            onClick={() => setIsMenuOpen(false)}
            className={`block rounded-md px-3 py-2 text-base font-medium transition-all duration-300 ${
              activeSection === item
                ? "text-indigo-400 bg-gray-900"
                : "text-gray-300 hover:text-indigo-400 hover:bg-gray-800"
            }`}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </a>
        ))}
      </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
    <section
  id="home"
  className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"  // <-- added pt-16
  style={{
       backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }}
>

 <div
  className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/95 to-black/100"
  style={{ transform: `translateY(${offsetY * 0.5}px)` }}
></div>


  <div
    className="w-full max-w-screen-xl px-6 relative z-10 flex flex-col items-center text-center md:text-left md:flex-row md:items-center md:justify-between lg:ml-24"
    style={{ transform: `translateY(${offsetY * -0.2}px)` }}
  >
    {/* TEXT */}
    <div className="max-w-3xl text-center md:text-left md:w-1/2">
      <h2 className="text-2xl md:text-3xl font-light mb-2 text-indigo-300">
         I'm
      </h2>
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-white whitespace-nowrap">
  Lissabeth Babu
</h1>

      <div className="flex items-center justify-center md:justify-start mb-6">
        {/* <div className="h-1 w-16 bg-indigo-500 mr-4"></div> */}
        <h3 className="text-xl md:text-2xl font-medium text-gray-300">
          MERN Stack Developer
        </h3>
      </div>
      {/* <p className="text-xl md:text-2xl text-gray-300 mb-8 h-8">
        {text}
        <span className="animate-pulse">|</span>
      </p> */}
      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
        <a
          href="#projects"
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 !rounded-button cursor-pointer whitespace-nowrap"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-8 py-3 bg-transparent border border-indigo-400 text-indigo-400 hover:bg-indigo-400/10 rounded-md transition-all duration-300 !rounded-button cursor-pointer whitespace-nowrap"
        >
          Contact Me
        </a>
      </div>
    </div>

    {/* IMAGE */}
   <div className="relative w-52 h-52 md:w-64 md:h-64 mt-10 md:mt-0 mx-auto rounded-full overflow-hidden border-4 border-indigo-400 shadow-lg">
  <img
    src="liss.jpg"
    alt="Profile"
    className="w-full h-full object-cover"
  />
</div>



    {/* SCROLL DOWN ICON */}
    {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <a
        href="#about"
        className="text-white opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
      >
        <i className="fas fa-chevron-down text-2xl"></i>
      </a>
    </div> */}
  </div>
</section>

            <section id="about" className="py-20 relative overflow-hidden bg-black/90">
  {/* Glowing blobs background */}
  <div className="absolute inset-0 opacity-20 pointer-events-none">
    <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-indigo-600 filter blur-3xl"></div>
    <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-indigo-800 filter blur-3xl"></div>
  </div>

  <div className="container mx-auto px-4 sm:px-6 relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-white mb-2">About Me</h2>
      <div className="h-1 w-20 bg-indigo-500 mx-auto"></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* LEFT SIDE */}
      <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md p-6 sm:p-8 rounded-lg border border-gray-800 shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-indigo-300">Who I Am</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
          I’m a dedicated <span className="text-indigo-400 font-semibold">MERN Stack Developer</span> with practical experience in building dynamic, responsive, and user-friendly web applications. My passion for technology has grown into a career focused on delivering scalable and efficient solutions.
        </p>
        <p className="text-gray-300 leading-relaxed">
          I specialize in full-stack development using <span className="text-indigo-400">MongoDB, Express.js, React.js, and Node.js</span>, building modern, high-performance applications that enhance user experiences.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md p-6 sm:p-8 rounded-lg border border-gray-800 shadow-lg flex flex-col justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <i className="fas fa-map-marker-alt text-indigo-400 text-base sm:mt-1"></i>
            <div>
              <h4 className="text-lg font-semibold text-white mb-1 sm:mb-0">Location</h4>
              <p className="text-gray-400 break-words text-sm sm:text-base">Kerala, Kannur</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-2">
            <i className="fas fa-envelope text-indigo-400 text-base sm:mt-1"></i>
            <div>
              <h4 className="text-lg font-semibold text-white mb-1 sm:mb-0">Email</h4>
<p
  onClick={() => setShowForm(true)}
  className="text-gray-400 break-all sm:whitespace-nowrap cursor-pointer hover:underline text-sm sm:text-base"
  style={{ paddingLeft: '2px' }} // inline CSS option
>
  lissabethbabu29@gmail.com
</p>


            </div>
          </div>

          {/* Message Form Below Email & Location */}
          {showForm && (
            <div className="col-span-2 mt-4">
              <div className="bg-gray-900 p-4 rounded-lg w-full max-w-xs mx-auto shadow-md border border-gray-700">
                <h2 className="text-base font-medium text-white mb-2 text-center">Send a Message</h2>
                <form onSubmit={handlemailSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-2 py-1 text-sm rounded bg-black border border-gray-700 text-white"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 text-sm rounded bg-black border border-gray-700 text-white"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-2 py-1.5 text-sm rounded bg-black border border-gray-700 text-white"
                    rows="2"
                    required
                  ></textarea>

                  <div className="flex justify-between items-center">
                    <button
  type="submit"
  className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-2.5 py-1 rounded"
  disabled={loading}
>
  {loading ? "Sending..." : "Send"}
</button>

                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-[10px] text-gray-400 hover:text-red-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

                {success && (
                  <p className="mt-2 text-xs text-green-400 text-center">{success}</p>
                )}
                {success === false && (
                  <p className="mt-2 text-xs text-red-400 text-center">Something went wrong.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 !rounded-button text-center"
          >
            <i className="fas fa-paper-plane mr-2"></i> Get In Touch
          </a>
          <a
            href="/(Lissabeth Babu(Resume).pdf"
            download
            className="inline-block px-6 py-3 bg-transparent border border-indigo-400 text-indigo-400 hover:bg-indigo-400/10 rounded-md transition-all duration-300 !rounded-button text-center"
          >
            <i className="fas fa-download mr-2"></i> Download Resume
          </a>
        </div>
      </div>
    </div>
  </div>
</section>


<section id="skills" className="py-20">
  <div className="container mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-white">My Skills</h2>
      <div className="h-1 w-20 bg-indigo-500 mx-auto mt-3"></div>
      <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">
        Skilled in building modern, responsive, and scalable web applications using the MERN stack and related technologies.
      </p>
    </div>

   <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
  {[
    { name: "HTML5", icon: "fab fa-html5", type: "fa" },
    { name: "CSS3", icon: "fab fa-css3-alt", type: "fa" },
    { name: "JavaScript", icon: "fab fa-js-square", type: "fa" },
    { name: "MongoDB", icon: "fas fa-database", type: "fa" },
    { name: "Express.js", icon: "fas fa-server", type: "fa" },
    { name: "React.js", icon: "fab fa-react", type: "fa" },
    { name: "Node.js", icon: "fab fa-node-js", type: "fa" },
    { name: "Bootstrap", icon: "fab fa-bootstrap", type: "fa" },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={24} color="#818CF8" />, type: "react" },
    { name: "Git", icon: "fab fa-git-alt", type: "fa" },
    { name: "Figma", icon: "fab fa-figma", type: "fa" },
  ].map((skill, i) => (
    <div
      key={i}
      className="bg-gray-900 p-4 rounded-md text-center border border-gray-800 hover:border-indigo-500 transition duration-300 flex flex-col items-center justify-center"
    >
      <div className="text-indigo-400 text-2xl mb-2">
        {skill.type === "fa" ? (
          <i className={skill.icon}></i>
        ) : (
          skill.icon
        )}
      </div>
      <h4 className="text-sm font-medium text-white">{skill.name}</h4>
    </div>
  ))}
</div>

  </div>
</section>



<section
  id="experience"
  className="py-20 px-4 md:px-20 min-h-screen transition-opacity duration-100"
>
  <h2 className="text-4xl font-bold text-white text-center mb-12"> Experience <div className="h-1 w-16 bg-indigo-500 mx-auto my-2"></div></h2>

  <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-2">
    {experienceData.map((exp, index) => (
      <div
        key={index}
        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:scale-105 transform transition-all duration-300 shadow-lg shadow-indigo-500/20"
      >
        <h3 className="text-xl font-semibold text-indigo-400 mb-2">{exp.role}</h3>
        <p className="text-gray-300 text-sm mb-1">{exp.company}</p>
        <p className="text-gray-400 text-xs mb-4">{exp.duration}</p>
        <p className="text-gray-300 text-sm mb-4">{exp.description}</p>

        {/* Simple Tech Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          {exp.technologies.map((tech, techIndex) => (
            <button
              key={techIndex}
              className="border border-gray-500 text-gray-300 text-xs px-3 py-1 rounded hover:bg-indigo-500 hover:text-white transition"
            >
              {tech}
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>








<section
  id="projects"
  ref={projectsRef}
  className="py-16 px-4 md:px-16 min-h-screen"
>
  <h2 className="text-4xl font-bold text-white text-center mb-10">
    Projects
    <div className="h-1 w-16 bg-indigo-500 mx-auto mt-2"></div>
  </h2>
{loading ? (
  <div className="flex flex-col items-center justify-center text-white mt-16">
    <div className="loader mb-4"></div>
    <p className="text-indigo-400 text-lg animate-pulse">Loading Projects...</p>
  </div>
) : (
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {(showAllProjects ? projects : projects.slice(0, 3)).map((project, index) => (
      <div
        key={index}
        className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:scale-105 transform transition duration-300 shadow-md flex flex-col justify-between"
      >
        <div>
          <h3 className="text-xl font-semibold text-indigo-400 mb-2">{project.title}</h3>
          <p className="text-gray-300 text-sm mb-4">{project.desc}</p>
          <span className="text-xs text-gray-400">{project.tech}</span>
        </div>

        <div className="flex gap-4 mt-6">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-white border border-indigo-500 hover:bg-indigo-600/30 px-4 py-2 rounded-lg transition"
          >
            <ExternalLink size={16} />
            View
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-white border border-gray-500 hover:bg-gray-700/30 px-4 py-2 rounded-lg transition"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </div>
    ))}
  </div>
)}

  <div className="mt-8 text-center">
    <button
      onClick={() => setShowAllProjects(!showAllProjects)}
      className="px-4 py-2 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 rounded transition"
    >
      {showAllProjects ? "Show Less" : "Show More Projects"}
    </button>
  </div>
</section>



              {/* Contact Section */}
              <section id="contact" className="py-14 px-4 bg-gray-950 relative">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-10 z-0">
            <img
              src="https://public.readdy.ai/ai/img_res/afdd35bc093a25111b13b8b71c0f447b.jpg"
              alt="Contact Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto text-white">
            {/* Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold">Get In Touch</h2>
              <div className="h-1 w-16 bg-indigo-500 mx-auto my-2"></div>
              <p className="text-gray-400 text-sm">Let’s chat. I’d love to work together!</p>
            </div>

            {/* Form & Info */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Form */}
             <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow backdrop-blur-sm">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Your Name"
        className="w-full mb-4 px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-indigo-500"
        required
      />
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-indigo-500"
        required
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        rows="4"
        placeholder="Message"
        className="w-full mb-4 px-4 py-2 bg-gray-800 text-white rounded focus:ring-2 focus:ring-indigo-500"
        required
      ></textarea>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-white transition"
      >
        {loading ? "Sending..." : <><i className="fas fa-paper-plane mr-2"></i> Send</>}
      </button>

      {success && <p className="text-sm mt-3 text-center text-green-400">{success}</p>}
    </form>

              {/* Info */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow backdrop-blur-sm text-sm space-y-5 w-full max-w-md">
  <div className="flex items-start gap-3">
    <i className="fas fa-map-marker-alt text-indigo-400 mt-1 shrink-0"></i>
    <p className="text-white">Kerala, Kannur</p>
  </div>

  <div className="flex items-start gap-3">
    <i className="fas fa-envelope text-indigo-400 mt-1 shrink-0"></i>
    <p className="text-white break-words break-all leading-snug text-[13px] w-full">
      lissabethbabu29@gmail.com
    </p>
  </div>

  <div className="flex items-start gap-3">
    <i className="fas fa-phone-alt text-indigo-400 mt-1 shrink-0"></i>
    <p className="text-white">7909106903</p>
  </div>

  {/* Social Icons */}
  <div className="flex space-x-3 pt-4">
  {[
    { icon: "fab fa-github", url: "https://github.com/Liss-abeth" },
    { icon: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/lissabeth-babu-5877062b2" },
    { icon: "fab fa-instagram", url: "https://www.instagram.com" },
  ].map((s, i) => (
    <a
      key={i}
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-indigo-600 text-white rounded-md transition"
    >
      <span className="sr-only">{s.icon}</span>  {/* Optional: for accessibility */}
      <i className={`${s.icon} text-lg`}></i>     {/* ✅ Add text size here */}
    </a>
  ))}
</div>

</div>

            </div>
          </div>
        </section>

              {/* Footer */}
            <footer className="bg-gradient-to-t from-gray-950 to-black py-10 px-6 border-t border-gray-800 relative">
  <div classNameName="max-w-7xl mx-auto text-center md:text-left">

    <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-6 gap-6">
      
      {/* Logo & Tagline */}
      <div>
        <a
          href="#home"
          className="text-2xl font-bold text-indigo-500 tracking-wide"
        >
          L<span className="text-white">issabeth Babu</span>
        </a>
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          Designing and developing seamless digital experiences with creativity and precision.
        </p>
      </div>

      {/* Quick Links */}
      <div className="flex flex-nowrap justify-center md:justify-end gap-4 overflow-x-auto">
  {["Home", "About", "Skills", "Experience", "Projects", "Contact"].map((item, i) => (
    <a
      key={i}
      href={`#${item.toLowerCase()}`}
      className="text-gray-400 hover:text-indigo-400 hover:underline transition-colors duration-300 text-xs md:text-sm whitespace-nowrap"
    >
      {item}
    </a>
  ))}
</div>

    </div>

    {/* Divider */}
    <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
      <p>
        © {new Date().getFullYear()} Lissabeth Babu. All rights reserved.
        <Link to="/admin-login" className="text-transparent ml-1">.</Link>
      </p>
      <div className="flex items-center gap-4">
        {/* <span>Last updated: Apr 7, 2025</span> */}
        {/* <a
          href="#"
          className="hover:text-indigo-400 hover:underline transition"
        >
          <i className="fas fa-shield-alt mr-1"></i> Privacy Policy
        </a> */}
      </div>
    </div>
  </div>

  {/* Back to top */}
  <a
    href="#home"
    className="fixed bottom-5 right-5 w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-md transition-all duration-300 z-50"
  >
    <i className="fas fa-arrow-up"></i>
  </a>
</footer>


      <style>{`
/* Animation styles removed */
`}</style>
    </div>
  );
};
export default Portfolio;
