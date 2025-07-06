// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from "react";

import axios from 'axios';

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showHomeForm, setShowHomeForm] = useState(false);
const [contacts, setContacts] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [contactError, setContactError] = useState(null);
   const [skill, setSkill] = useState({ name: "", icon: "", level: 50 });
  const [message, setMessage] = useState("");
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [skills, setSkills] = useState([
    { id: 1, name: "React", proficiency: 90, category: "Frontend" },
    { id: 2, name: "Node.js", proficiency: 85, category: "Backend" },
    { id: 3, name: "TypeScript", proficiency: 80, category: "Language" },
    { id: 4, name: "GraphQL", proficiency: 75, category: "API" },
    { id: 5, name: "AWS", proficiency: 70, category: "DevOps" },
    { id: 6, name: "Docker", proficiency: 65, category: "DevOps" },
  ]);


  const navItems = [
  { id: "dashboard", icon: "fa-tachometer-alt", label: "Dashboard" },
  { id: "skills", icon: "fa-code", label: "Skills Management" },
  { id: "projects", icon: "fa-project-diagram", label: "Projects" },
  { id: "about", icon: "fa-user-astronaut", label: "About Section" },
  { id: "contact", icon: "fa-address-book", label: "Contact Messages" },
];


  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Space Portfolio",
      category: "Web Development",
      status: "Completed",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/a81f506e6a77287918bbc64d3109d5b9.jpg",
    },
    {
      id: 2,
      name: "Cosmic Chat App",
      category: "Mobile App",
      status: "In Progress",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/5a15ba4ffb0fa99b25d79b06e8075b67.jpg",
    },
    {
      id: 3,
      name: "Nebula Analytics",
      category: "Data Visualization",
      status: "Planning",
      thumbnail:
        "https://public.readdy.ai/ai/img_res/4a060fcbf1d6ca84b05c2590512e1d55.jpg",
    },
  ]);

  const [newSkill, setNewSkill] = useState({
    name: "",
    proficiency: 50,
    category: "Frontend",
  });

  const [searchSkill, setSearchSkill] = useState("");
  const [skillFilter, setSkillFilter] = useState("All");

  const handleAddSkill = () => {
    if (newSkill.name.trim() === "") return;

    setSkills([
      ...skills,
      {
        id: skills.length + 1,
        name: newSkill.name,
        proficiency: newSkill.proficiency,
        category: newSkill.category,
      },
    ]);
    setNewSkill({ name: "", proficiency: 50, category: "Frontend" });
    setShowAddSkillModal(false);
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name
      .toLowerCase()
      .includes(searchSkill.toLowerCase());
    const matchesFilter =
      skillFilter === "All" || skill.category === skillFilter;
    return matchesSearch && matchesFilter;
  });


  const handleUpdateHome = async (e) => {
    e.preventDefault();
    const form = e.target;
  
    const homeData = {
      greeting: form.greeting.value,
      name: form.name.value,
      role: form.role.value,
      typingText: form.typingText.value,
      
      profileImage: form.profileImage.value,
      
    };
  
    try {
      const res = await fetch(`http://localhost:1000/home/update/${homeId}`, {
        method: "PUT", // Use PUT to match the backend route
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(homeData),
      });
  
      if (!res.ok) throw new Error("Failed to update home section");
  
      const updated = await res.json();
      console.log("✅ Updated home section:", updated);
      setShowHomeForm(false); // hide the modal/form
    } catch (err) {
      console.error("❌ Backend error:", err.message);
    }
  };
  


  



  const handleAddProject = async (e) => {
    e.preventDefault();
    const form = e.target;
  
    const projectData = {
      title: form.title.value,
      desc: form.desc.value,
      tech: form.tech.value,
      live: form.live.value,
      github: form.github.value,
    };
  
    try {
      const res = await fetch("http://localhost:1000/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
  
      if (!res.ok) throw new Error("Failed to save project");
  
      const saved = await res.json();
      console.log("✅ Saved project:", saved);
      setShowProjectForm(false);
    } catch (err) {
      console.error("❌ Backend error:", err.message); // ✅ use `err`, not `res`
    }
  };
  
  
  useEffect(() => {
    console.log("Fetching contacts...");
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
  setLoadingContacts(true);
  setContactError(null);

  try {
    const response = await axios.get("http://localhost:1000/contact"); // ✅ correct endpoint
    console.log("✅ Contacts fetched:", response.data); // helpful log
    setContacts(response.data); // store in state
  } catch (error) {
    console.error("❌ Fetch error:", error.message);
    setContactError("Failed to load contacts.");
  } finally {
    setLoadingContacts(false);
  }
};

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:1000/api/skills/create", skill);
//       setMessage("✅ Skill added successfully!");
//       setSkill({ name: "", icon: "", level: 50 });
//     } catch (err) {
//       setMessage("❌ Failed to add skill.");
//     }
//   };


useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:1000/projects");
        setProjects(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
  <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">

      {/* Sidebar */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white bg-gray-800 p-2 rounded-md focus:outline-none"
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 border-r border-gray-700 z-40 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Branding */}
        <div className="p-5 border-b border-gray-700 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
            <i className="fas fa-rocket text-white"></i>
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Cosmic Admin
          </h1>
        </div>

        {/* Navigation */}
        <nav className="mt-5">
          <ul className="space-y-2 px-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsOpen(false); // close on mobile after click
                  }}
                  className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer
                    ${
                      activeSection === item.id
                        ? "bg-indigo-900 text-indigo-300 shadow-lg shadow-indigo-900/50"
                        : "hover:bg-gray-700"
                    }`}
                >
                  <i
                    className={`fas ${item.icon} w-5 text-center mr-3 ${
                      activeSection === item.id
                        ? "text-indigo-400"
                        : "text-gray-400"
                    }`}
                  ></i>
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 w-full p-5 border-t border-gray-700">
          <button className="w-full flex items-center p-3 rounded-lg hover:bg-gray-700 transition-all duration-200 whitespace-nowrap cursor-pointer">
            <i className="fas fa-sign-out-alt w-5 text-center mr-3 text-gray-400"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Backdrop on Mobile when menu is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden"
        ></div>
      )}

      {/* Main Content */}
      <div className="md:ml-64 flex-1 flex flex-col min-h-screen">

        {/* Top Header */}
       <header className="bg-gray-800 border-b border-gray-700 p-4 w-full">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    {/* Left: Welcome message */}
    <div>
      <h2 className="text-lg font-semibold text-white">Welcome back, Admin</h2>
      <p className="text-sm text-gray-400">Monday, April 7, 2025</p>
    </div>

    {/* Right: Notification + Avatar */}
    <div className="flex items-center justify-between sm:justify-end space-x-4 w-full sm:w-auto">
      {/* Notification Icon */}
      <button className="relative p-2 rounded-full hover:bg-gray-700 transition duration-200 focus:outline-none">
        <i className="fas fa-bell text-gray-300 text-lg"></i>
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {/* Avatar */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center shadow-md">
          <span className="text-sm font-medium text-white">AD</span>
        </div>
      </div>
    </div>
  </div>
</header>


      
      {activeSection === "home" && (
  <div className="p-4 space-y-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
      <div>
        <h1 className="text-2xl font-bold text-white">Home Page Details</h1>
        <p className="text-gray-400">Edit your home page content</p>
      </div>
    </div>

    {/* Form Container */}
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          const updatedDetails = {
            name: form.name.value,
            title: form.title.value,
            description: form.description.value,
          };
          console.log("Updated Details:", updatedDetails);
        }}
        className="space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            defaultValue="Lissabeth Babu"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Your Title"
            defaultValue="MERN Stack Developer"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Short description about yourself"
            defaultValue="I am a passionate developer specializing in MERN stack."
            rows={4}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
)}



{activeSection === "dashboard" && (
  <div className="p-4 space-y-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Home Section Editor</h1>
        <p className="text-gray-400">Customize your portfolio landing section</p>
      </div>
      <div>
        <button
          onClick={() => setShowHomeForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200"
        >
          <i className="fas fa-edit"></i>
          <span>Edit Hero Content</span>
        </button>
      </div>
    </div>

    {/* Modal Form */}
    {showHomeForm && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
        <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Edit Home Section</h2>
          <form onSubmit={handleUpdateHome} className="flex flex-col gap-4">
            <input
              type="text"
              name="greeting"
              placeholder="Greeting (e.g., Hello, I'm)"
              defaultValue="Hello, I'm"
              required
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="name"
              placeholder="Name (e.g., Lissabeth Babu)"
              defaultValue="Lissabeth Babu"
              required
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="role"
              placeholder="Role (e.g., MERN Stack Developer)"
              defaultValue="MERN Stack Developer"
              required
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="typingText"
              placeholder="Typing Text (e.g., Full-stack Web Wizard ✨)"
              required
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="profileImage"
              placeholder="Profile Image URL"
              required
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowHomeForm(false)}
                className="text-gray-300 hover:text-white transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
)}

{activeSection === "projects" && (
  <div className="p-4 space-y-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Projects Management</h1>
        <p className="text-gray-400">Manage your portfolio projects</p>
      </div>
      <div>
        <button
          onClick={() => setShowProjectForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition duration-200"
        >
          <i className="fas fa-plus"></i>
          <span>Add New Project</span>
        </button>
      </div>
    </div>

    {/* Project Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.length === 0 ? (
        <p className="text-gray-400 col-span-full">No projects found.</p>
      ) : (
        projects.map((proj) => (
          <div
            key={proj._id}
            className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow transition hover:shadow-lg"
          >
            <h3 className="text-white font-semibold text-lg truncate">{proj.title}</h3>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{proj.desc}</p>
            <p className="text-indigo-400 text-xs mt-2">{proj.tech}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              {proj.live && (
                <a
                  href={proj.live}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-300 hover:underline"
                >
                  Live
                </a>
              )}
              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))
      )}
    </div>

    {/* Modal Form */}
    {showProjectForm && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-4">
        <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-white">Add New Project</h2>
          <form onSubmit={handleAddProject} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="Project Title"
              required
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="desc"
              placeholder="Description"
              required
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
            <input
              type="text"
              name="tech"
              placeholder="Technologies (e.g., React, Node)"
              required
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="live"
              placeholder="Live URL (optional)"
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="github"
              placeholder="GitHub URL (optional)"
              className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowProjectForm(false)}
                className="text-gray-300 hover:text-white transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
)}

{activeSection === "about" && (
  <div>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold">About Section</h1>
        <p className="text-gray-400">Edit your personal information</p>
      </div>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 whitespace-nowrap">
        <i className="fas fa-eye mr-2"></i>
        <span>Preview</span>
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile & Social Section */}
      <div className="lg:col-span-1">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-indigo-600">
              <img
                src="https://public.readdy.ai/ai/img_res/17c425715a3966c169120ab62e22c324.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg mb-4 w-full">
              <i className="fas fa-upload mr-2"></i>
              <span>Change Photo</span>
            </button>

            <div className="w-full space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Social Links</label>
                <div className="space-y-2">
                  {[
                    { icon: "fa-github", placeholder: "GitHub URL" },
                    { icon: "fa-linkedin", placeholder: "LinkedIn URL" },
                    { icon: "fa-twitter", placeholder: "Twitter URL" },
                  ].map((social, index) => (
                    <div key={index} className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className={`fab ${social.icon} text-gray-400`}></i>
                      </div>
                      <input
                        type="text"
                        placeholder={social.placeholder}
                        className="w-full bg-gray-700 border-none rounded-lg py-2 pl-10 pr-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Info Section */}
      <div className="lg:col-span-2">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                defaultValue="Alex Mitchell"
                className="w-full bg-gray-700 border-none rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Professional Title</label>
              <input
                type="text"
                placeholder="Full Stack Developer"
                defaultValue="Senior Full Stack Developer"
                className="w-full bg-gray-700 border-none rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
              <input
                type="text"
                placeholder="City, Country"
                defaultValue="San Francisco, USA"
                className="w-full bg-gray-700 border-none rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">About Me</label>
              <textarea
                rows={6}
                placeholder="Write something about yourself..."
                defaultValue="I am a passionate full stack developer with over 8 years of experience building web and mobile applications. I specialize in React, Node.js, and cloud technologies. I love creating elegant solutions to complex problems and continuously learning new technologies."
                className="w-full bg-gray-700 border-none rounded-lg py-2 px-4 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}






{activeSection === "contact" && (
  <div className="p-6">
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">Contact Messages</h1>
        <p className="text-gray-400">Messages received from the portfolio</p>
      </div>
    </div>

    {loadingContacts && (
      <p className="text-white">Loading contacts...</p>
    )}

    {!loadingContacts && contactError && (
      <p className="text-red-500">{contactError}</p>
    )}

    {!loadingContacts && !contactError && contacts.length === 0 && (
      <p className="text-white">No contacts found.</p>
    )}

    {!loadingContacts && !contactError && contacts.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map(({ _id, name, email, message, createdAt }) => (
          <div
            key={_id}
            className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700"
          >
            <h3 className="text-lg font-semibold text-indigo-300 mb-2">{name}</h3>
            <p className="text-gray-400 text-sm mb-1">
              <span className="font-medium text-gray-300">Email:</span> {email}
            </p>
            <p className="text-gray-400 text-sm mb-2">
              <span className="font-medium text-gray-300">Message:</span> {message}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Received: {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
)}


        
      </div>


    
      {/* Add Skill Modal */}
      {/* {activeSection ==='skills'&& (
     <div className="fixed inset-0 z-50 bg-black bg-opacity-0 overflow-y-auto">
     <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-gray-800 text-white p-6 rounded-lg max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
     
        <div>
          <h2 className="text-xl font-bold mb-4">Add New Skill</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Skill Name"
              value={skill.name}
              onChange={(e) => setSkill({ ...skill, name: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded"
              required
            />
            <input
              type="text"
              placeholder="FontAwesome Icon (e.g., fab fa-react)"
              value={skill.icon}
              onChange={(e) => setSkill({ ...skill, icon: e.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded"
              required
            />
            <input
              type="number"
              placeholder="Skill Level (0-100)"
              value={skill.level}
              onChange={(e) => setSkill({ ...skill, level: Number(e.target.value) })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded"
              min="0"
              max="100"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded w-full"
            >
              Add Skill
            </button>
            {message && <p className="text-sm mt-2">{message}</p>}
          </form>
        </div>
      </div>
      </div>
     </div>
          )} */}


    </div>
  );
};

export default Admin;
