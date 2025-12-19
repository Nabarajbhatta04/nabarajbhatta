import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Download, Code, Palette, Layers, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { toast } from '../hooks/use-toast';
import { personalInfo, aboutInfo, projects, submitContactForm } from '../mock';

const Portfolio = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(formData);
      toast({
        title: "Success!",
        description: result.message,
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-x-hidden w-full">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <nav className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-600">NB</div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors">About</button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-700 hover:text-blue-600 transition-colors">Projects</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">Contact</button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className={`flex-1 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                Hi, I'm <span className="text-blue-600">{personalInfo.name}</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-gray-700 mb-6">{personalInfo.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{personalInfo.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => scrollToSection('contact')} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get In Touch
                </Button>
                <Button variant="outline" onClick={() => scrollToSection('projects')} className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  View Projects
                </Button>
              </div>
            </div>
            <div className={`flex-1 flex justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className=" mx-auto relative w-64 h-64 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full object-cover border-4 sm:border-8 border-white shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mb-8"></div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">{aboutInfo.description}</p>
              <a href={personalInfo.resumeUrl} download>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </a>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Skills & Technologies</h3>
              <div className="space-y-5">
                {aboutInfo.skills.map((skill, index) => {
                  const skillName = typeof skill === 'object' ? skill.name : skill;
                  const skillPercentage = typeof skill === 'object' ? skill.percentage : 0;

                  return (
                    <div key={index} className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-900 font-medium text-base">{skillName}</span>
                        <span className="text-gray-900 font-medium text-base">{skillPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skillPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Code className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Clean Code</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Writing maintainable, efficient, and well-documented code following best practices.</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Palette className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Modern Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Creating beautiful, intuitive interfaces with attention to detail and user experience.</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Layers className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Responsive</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Building applications that work seamlessly across all devices and screen sizes.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-blue-600 mb-12"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0">
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{project.description}</CardDescription>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="bg-blue-100 text-blue-700">{tech}</Badge>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                      onClick={() => project.previewImages && setSelectedProject(project)}
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Demo
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-300 flex-1" onClick={() => window.open(project.githubUrl, '_blank')}>
                      <Github className="mr-1 h-3 w-3" />
                      Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-600 mb-8"></div>
          <p className="text-lg text-gray-600 mb-12">Have a question or want to work together? Feel free to reach out!</p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Connect With Me</h3>

              <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                <div className="bg-blue-600 p-3 rounded-full group-hover:bg-blue-700 transition-colors">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-gray-600">{personalInfo.email}</div>
                </div>
              </a>

              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                <div className="bg-blue-600 p-3 rounded-full group-hover:bg-blue-700 transition-colors">
                  <Linkedin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">LinkedIn</div>
                  <div className="text-gray-600">Connect with me</div>
                </div>
              </a>

              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors group">
                <div className="bg-blue-600 p-3 rounded-full group-hover:bg-blue-700 transition-colors">
                  <Github className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">GitHub</div>
                  <div className="text-gray-600">View my work</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Preview Modal */}
      <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] sm:w-full sm:max-w-2xl md:max-w-4xl max-h-[90vh] p-0 overflow-hidden mx-4 sm:mx-0">
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b">
            <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
              {selectedProject?.title} - UI Preview
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 sm:px-6 py-4 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="space-y-1">
              {selectedProject?.previewImages?.map((image, index) => (
                <div key={index} className="w-full">
                  <img
                    src={image}
                    alt={`${selectedProject?.title} preview ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">© 2025 {personalInfo.name}. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;