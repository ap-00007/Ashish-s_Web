'use client';

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LetterGlitch from '@/components/LetterGlitch';
import { SmoothCursor } from '@/components/ui/smooth-cursor';

type CommandOutput = {
  text: string;
  isCommand: boolean;
};

const TerminalPage = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [command, setCommand] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [output, setOutput] = useState<CommandOutput[]>([
    { text: 'Welcome to Ashish\'s Portfolio Terminal!', isCommand: false },
    { text: 'Type \'help\' to see available commands.', isCommand: false },
  ]);
  const [glitchSpeed, setGlitchSpeed] = useState<number>(50);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Website content data
  const websiteData = {
    about: `Hello! I'm Ashish Panda, a second-year engineering student at VIT Pune with a strong interest in core programming and problem solving. Most of my work so far has been in C++ and Python—using them to explore everything from pattern printing and recursion to data structures, dynamic programming, and matrix manipulation.

I've written code that handles real input, stores data in efficient formats like sparse matrix triplets using structs, and solves optimization problems with clean logic. I've worked on CLI-level applications and debugged everything from simple formatting bugs to scope errors in standard libraries.

Python is where I experiment with logic fast. C++ is where I go when I want control and precision. I'm also getting into areas like AI, API integration, and front-end dev (React, mostly), and I like writing clean, readable code that does something useful—not just academically, but practically. Every time I code, I try to improve the way I think—not just the output on screen.`,

    skills: [
      'Languages: C++, Python, JavaScript, TypeScript',
      'Frontend: React, Next.js, Tailwind CSS',
      'Tools: Git, VS Code, Linux',
      'Concepts: Data Structures, Algorithms, OOP'
    ],
    
    projects: [
      'Personal Portfolio Website - Modern portfolio built with Next.js and Tailwind',
      'Citizen Weave - Citizen Weave is a modern platform that helps Indians engage with the government, report issues, and take part in democratic processes.',
      'Finopidea - An intuitive task management application with drag-and-drop functionality, due dates, and collaboration features.',
      'Algorithm Visualizer - Interactive tool to visualize sorting and pathfinding algorithms'
    ],
    
    contact: {
      email: 'ashishpanda736@gmail.com',
      github: 'github.com/ap-00007',
      linkedin: 'linkedin.com/in/ashishpanda'
    },
    
    // Fun interactive elements
    
    jokes: [
      "Why don't programmers like nature? It has too many bugs.",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
      "Why do Java developers wear glasses? Because they don't C#!",
      "What's a programmer's favorite place? Foo Bar.",
      "Why was the JavaScript developer sad? Because he didn't Node how to Express himself."
    ],
    
    funFacts: [
      "The first computer bug was an actual bug - a moth found in the Harvard Mark II computer in 1947.",
      "The Firefox logo isn't a fox, it's a red panda.",
      "The first website is still online: http://info.cern.ch",
      "The first computer programmer was a woman - Ada Lovelace.",
      "The programming language Python is named after Monty Python, not the snake."
    ],
    
    quotes: [
      "The best error message is the one that never shows up. — Thomas Fuchs",
      "First, solve the problem. Then, write the code. — John Johnson",
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
      "Talk is cheap. Show me the code. — Linus Torvalds",
      "Programming isn't about what you know; it's about what you can figure out. — Chris Pine"
    ]
  };

  useEffect(() => {
    setIsMounted(true);
    // Prefetch the home page for faster navigation
    if (typeof window !== 'undefined') {
      router.prefetch('/');
      // Hide the body overflow to prevent scrolling conflicts
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      // Restore body overflow when leaving terminal
      if (typeof window !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [router]);

  useEffect(() => {
    // Focus input when terminal loads
    if (isMounted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMounted]);

  // Scroll to bottom when output changes
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [output]);

  const handleNavigation = () => {
    if (typeof window !== 'undefined') {
      // Direct navigation to ensure we bypass any routing issues
      window.location.replace('/');
    }
  };

  const handleCommand = () => {
    if (!command.trim()) return;
    
    const newOutput = [...output, { text: command, isCommand: true }];
    const newHistory = [...commandHistory, command];
    
    const cmd = command.trim().toLowerCase();
    const args = cmd.split(' ');
    const mainCommand = args[0];
    
    setCommandHistory(newHistory);
    setHistoryIndex(-1);
    
    // Process commands
    if (mainCommand === 'help') {
      newOutput.push({ text: 'Available commands:', isCommand: false });
      newOutput.push({ text: '  help       - Show this help message', isCommand: false });
      newOutput.push({ text: '  about      - Learn about Ashish Panda', isCommand: false });
      newOutput.push({ text: '  skills     - View technical skills', isCommand: false });
      newOutput.push({ text: '  projects   - List of projects', isCommand: false });
      newOutput.push({ text: '  contact    - Get contact information', isCommand: false });
      newOutput.push({ text: '  clear      - Clear the terminal', isCommand: false });
      newOutput.push({ text: '  home       - Return to main website', isCommand: false });
      newOutput.push({ text: '  exit       - Return to main website', isCommand: false });
      newOutput.push({ text: 'Fun commands:', isCommand: false });
      newOutput.push({ text: '  joke       - Get a programming joke', isCommand: false });
      newOutput.push({ text: '  fact       - Learn a fun programming fact', isCommand: false });
      newOutput.push({ text: '  quote      - Read a programming quote', isCommand: false });
      newOutput.push({ text: '  echo       - Print text (e.g., echo Hello World)', isCommand: false });
      newOutput.push({ text: '  date       - Display current date and time', isCommand: false });
      newOutput.push({ text: '  whoami     - Display user information', isCommand: false });
      newOutput.push({ text: '  ls         - List available sections', isCommand: false });
      newOutput.push({ text: '  matrix     - Toggle Matrix effect speed', isCommand: false });
    } 
    else if (mainCommand === 'about') {
      websiteData.about.split('\n\n').forEach(paragraph => {
        newOutput.push({ text: paragraph, isCommand: false });
      });
    } 
    else if (mainCommand === 'skills') {
      newOutput.push({ text: 'Technical Skills:', isCommand: false });
      websiteData.skills.forEach(skill => {
        newOutput.push({ text: `  • ${skill}`, isCommand: false });
      });
    } 
    else if (mainCommand === 'projects') {
      newOutput.push({ text: 'Projects:', isCommand: false });
      websiteData.projects.forEach((project, index) => {
        newOutput.push({ text: `  ${index + 1}. ${project}`, isCommand: false });
      });
    } 
    else if (mainCommand === 'contact') {
      newOutput.push({ text: 'Contact Information:', isCommand: false });
      newOutput.push({ text: `  Email:    ${websiteData.contact.email}`, isCommand: false });
      newOutput.push({ text: `  GitHub:   ${websiteData.contact.github}`, isCommand: false });
      newOutput.push({ text: `  LinkedIn: ${websiteData.contact.linkedin}`, isCommand: false });
    } 
    else if (mainCommand === 'joke') {
      const randomJoke = websiteData.jokes[Math.floor(Math.random() * websiteData.jokes.length)];
      newOutput.push({ text: randomJoke, isCommand: false });
    }
    else if (mainCommand === 'fact') {
      const randomFact = websiteData.funFacts[Math.floor(Math.random() * websiteData.funFacts.length)];
      newOutput.push({ text: randomFact, isCommand: false });
    }
    else if (mainCommand === 'quote') {
      const randomQuote = websiteData.quotes[Math.floor(Math.random() * websiteData.quotes.length)];
      newOutput.push({ text: randomQuote, isCommand: false });
    }
    else if (mainCommand === 'echo') {
      const text = args.slice(1).join(' ') || '';
      newOutput.push({ text: text, isCommand: false });
    }
    else if (mainCommand === 'date') {
      const now = new Date();
      newOutput.push({ text: now.toString(), isCommand: false });
    }
    else if (mainCommand === 'whoami') {
      newOutput.push({ text: 'visitor@portfolio', isCommand: false });
    }
    else if (mainCommand === 'ls') {
      newOutput.push({ text: 'Available sections:', isCommand: false });
      newOutput.push({ text: '  about', isCommand: false });
      newOutput.push({ text: '  skills', isCommand: false });
      newOutput.push({ text: '  projects', isCommand: false });
      newOutput.push({ text: '  contact', isCommand: false });
    }
    else if (mainCommand === 'matrix') {
      const speed = args[1];
      if (speed && !isNaN(Number(speed))) {
        setGlitchSpeed(Number(speed));
        newOutput.push({ text: `Matrix animation speed set to ${speed}`, isCommand: false });
      } else {
        newOutput.push({ text: 'Usage: matrix <speed> (number between 10-200)', isCommand: false });
      }
    }
    else if (mainCommand === 'clear') {
      setOutput([]);
      setCommand('');
      return;
    } 
    else if (mainCommand === 'home' || mainCommand === 'exit') {
      newOutput.push({ text: 'Returning to main website...', isCommand: false });
      setOutput(newOutput);
      setCommand('');
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.replace('/');
        }
      }, 1000);
      return;
    } 
    else {
      newOutput.push({ text: `Command not found: ${command}. Type 'help' for available commands.`, isCommand: false });
    }
    
    setOutput(newOutput);
    setCommand('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand();
    } 
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } 
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  return (
    <>
      {/* Override the main layout styling */}
      <style jsx global>{`
        body {
          overflow: hidden !important;
        }
        .min-h-screen {
          display: none !important;
        }
      `}</style>
      
      <div className="fixed inset-0 w-full h-full overflow-hidden z-50 bg-black">
        <SmoothCursor />
        {/* Full viewport LetterGlitch background */}
        <div className="absolute inset-0 z-0">
          {isMounted && (
            <LetterGlitch
              glitchSpeed={glitchSpeed}
              centerVignette={true}
              outerVignette={false}
              smooth={true}
            />
          )}
        </div>
      
      {/* Terminal content overlay */}
      <div className="relative z-10 h-full flex items-center justify-center p-4">
        <div className="terminal-container bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg shadow-2xl max-w-4xl w-full h-[80vh] flex flex-col">
          <div className="terminal-header bg-gray-800 flex items-center px-4 py-2 rounded-t-lg">
            <button
              onClick={handleNavigation}
              className="terminal-button close bg-red-500 w-3 h-3 rounded-full mr-2 hover:bg-red-600 transition-colors cursor-pointer border-none outline-none"
              title="Return to home page"
              aria-label="Close terminal and return to home page"
            ></button>
            <div className="terminal-button minimize bg-yellow-500 w-3 h-3 rounded-full mr-2"></div>
            <div className="terminal-button maximize bg-green-500 w-3 h-3 rounded-full"></div>
            <div className="flex-1 text-center text-gray-300 text-sm">Ashish's Portfolio Terminal</div>
          </div>
          <div ref={terminalBodyRef} className="terminal-body p-6 text-green-400 font-mono flex-1 overflow-y-auto">
            {output.map((line, i) => (
              <div key={i} className={`mb-2 ${line.isCommand ? 'text-blue-400' : 'text-green-400'}`}>
                {line.isCommand ? `user@portfolio:~$ ${line.text}` : line.text}
              </div>
            ))}
            <div className="flex items-center">
              <span className="text-blue-400">user@portfolio:~$</span>
              <div className="relative flex-1 ml-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none text-blue-400 w-full caret-transparent"
                  autoFocus
                />
                <span 
                  className="absolute top-0 left-0 text-blue-400"
                  style={{ 
                    paddingLeft: `${command.length}ch`, 
                    animation: 'blink 1s step-end infinite' 
                  }}
                >█</span>
              </div>
            </div>
            
            {/* Add cursor animation */}
            <style jsx>{`
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TerminalPage;
