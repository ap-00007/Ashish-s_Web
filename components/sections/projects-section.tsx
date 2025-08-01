'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink } from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Citizen Weave',
    description: 'Citizen Weave is a modern platform that helps Indians engage with the government, report issues, and take part in democratic processes.',
    image: '',
    githubLink: 'https://github.com/ap-00007/CitizenWeave.git',
    liveLink: '#',
  },
  {
    title: 'Finopidea',
    description: 'An intuitive task management application with drag-and-drop functionality, due dates, and collaboration features.',
    image: '/Finopidea.png',
    githubLink: 'https://github.com/ap-00007/Finopedia.git',
    liveLink: '#',
  },
  {
    title: 'Personal Portfolio Site',
    description: 'A personal portfolio showcasing my skills, projects, and experience in web development, Python, and tech, with a Terminal.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fcd61f20283?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    githubLink: '#',
    liveLink: '#',
  },
  
];

export function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="projects" className="py-24" ref={ref}>
      <div className="centered-container">
        <motion.h2
        className="text-4xl font-extrabold text-center mb-16"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={itemVariants}
        transition={{ duration: 0.6 }}
      >
        My Projects
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={itemVariants}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" /> GitHub
                  </Link>
                </Button>
                {/* <Button asChild size="sm">
                  <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" /> Live Demo
                  </Link>
                </Button> */}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </section>
  );
}
