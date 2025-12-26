// Mock data for portfolio
export const personalInfo = {
  name: "Nabaraj Bhatta",
  title: "Frontend Developer",
  subtitle: "I build modern, responsive, and user friendly websites.",
  email: "nabarajbhatta04@gmail.com",
  linkedin: "https://www.linkedin.com/in/nabaraj-bhatta-73912325a",
  github: "https://github.com/Nabarajbhatta04",
  profileImage: "/images/my-profile2.jpg",
  resumeUrl: "/images/resume.pdf",
};

export const aboutInfo = {
  description:
    "I am a dedicated Frontend Developer who loves building modern, user-friendly websites. I focus on creating responsive interfaces and enjoy using the latest tools and technologies to make web applications look great and work smoothly.",
  skills: [
    { name: "React", percentage: 75 },
    { name: "HTML & CSS", percentage: 85 },
    { name: "Tailwind CSS", percentage: 79 },
    { name: "Responsive Design", percentage: 75 },
    { name: "Git & GitHub", percentage: 70 },
    { name: "JavaScript", percentage: 80 },
  ],
};

export const projects = [
  {
    id: 1,
    title: "Star Hair Saloon Website",
    description:
      "A modern, responsive website for a hair salon featuring booking system, gallery, and service information. Built with React and modern UI components.",
    image: "/images/salonn.PNG",
    demoUrl: "#",
    githubUrl: "https://github.com/Nerrybhatt",
    technologies: ["HTML", "CSS", "JavaScript"],
    previewImages: [
      "/images/salon1.PNG",
      "/images/salon2.PNG",
      "/images/salon3.PNG",
      "/images/salon4.PNG",
      "/images/salon5.PNG",
      "/images/salon6.PNG",
      "/images/salon7.PNG",
      "/images/salon8.PNG",
    ],
  },
  {
    id: 2,
    title: "Meme Sharing Website",
    description:
      "A social platform for sharing and discovering memes. Features include user uploads, voting system, and real-time feed updates with smooth animations.",
    image: "/images/fungi_meme.JPG",
    demoUrl: "#",
    githubUrl: "https://github.com/Nerrybhatt",
    technologies: ["Html & CSS", "PHP", "Javascript"],
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "A sleek, modern portfolio website showcasing projects and skills. Features smooth animations, responsive design, and an intuitive user interface.",
    image: "/images/portfolio1.png",
    demoUrl: "#",
    githubUrl: "https://github.com/Nabarajbhatta04",
    technologies: ["React", "Tailwind CSS", "Modern UI"],
  },
];

// Mock contact form submission
export const submitContactForm = (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock form submission:", formData);
      resolve({ success: true, message: "Message sent successfully!" });
    }, 1000);
  });
};
