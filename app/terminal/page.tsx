'use client';

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Link from 'next/link';
import LetterGlitch from '@/components/LetterGlitch';
import { SmoothCursor } from '@/components/ui/smooth-cursor';

type CommandOutput = {
  text: string;
  isCommand: boolean;
  isError?: boolean;
  isPath?: boolean;
  isTyping?: boolean;
};

// Typewriter animation component
const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;
    
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(prev => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, 15); // Typing speed

    return () => clearInterval(interval);
  }, [text, onComplete, isComplete]);

  return <span>{displayedText}</span>;
};

const TerminalPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [command, setCommand] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [output, setOutput] = useState<CommandOutput[]>([
    { text: 'Welcome to Ashish&apos;s Portfolio Terminal!', isCommand: false, isTyping: true },
    { text: 'Type &apos;help&apos; to see available commands.', isCommand: false, isTyping: true },
  ]);
  const [glitchSpeed, setGlitchSpeed] = useState<number>(50);
  const [currentTheme, setCurrentTheme] = useState<'default' | 'retro' | 'hacker'>('default');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isTypingOutput, setIsTypingOutput] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>('');
  const [showContextMenu, setShowContextMenu] = useState<boolean>(false);
  const [contextMenuPos, setContextMenuPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Available commands for autocomplete
  const availableCommands = [
    'help', 'about', 'skills', 'projects', 'contact', 'clear', 'home', 'exit',
    'joke', 'fact', 'quote', 'echo', 'date', 'whoami', 'ls', 'matrix', 'theme',
    'sound', 'ask', 'sudo', 'cat', 'rm', 'history'
  ];

  // Website content data
  const websiteData = {
    about: `Hello! I&apos;m Ashish Panda, a second-year engineering student at VIT Pune with a strong interest in core programming and problem solving. Most of my work so far has been in C++ and Python—using them to explore everything from pattern printing and recursion to data structures, dynamic programming, and matrix manipulation.

I&apos;ve written code that handles real input, stores data in efficient formats like sparse matrix triplets using structs, and solves optimization problems with clean logic. I&apos;ve worked on CLI-level applications and debugged everything from simple formatting bugs to scope errors in standard libraries.

Python is where I experiment with logic fast. C++ is where I go when I want control and precision. I&apos;m also getting into areas like AI, API integration, and front-end dev (React, mostly), and I like writing clean, readable code that does something useful—not just academically, but practically. Every time I code, I try to improve the way I think—not just the output on screen.`,

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
      "Why don&apos;t programmers like nature? It has too many bugs.",
      "How many programmers does it take to change a light bulb? None, that&apos;s a hardware problem!",
      "Why do Java developers wear glasses? Because they don&apos;t C#!",
      "What&apos;s a programmer&apos;s favorite place? Foo Bar.",
      "Why was the JavaScript developer sad? Because he didn&apos;t Node how to Express himself."
    ],
    
    funFacts: [
      "The first computer bug was an actual bug - a moth found in the Harvard Mark II computer in 1947.",
      "The Firefox logo isn&apos;t a fox, it&apos;s a red panda.",
      "The first website is still online: http://info.cern.ch",
      "The first computer programmer was a woman - Ada Lovelace.",
      "The programming language Python is named after Monty Python, not the snake."
    ],
    
    quotes: [
      "The best error message is the one that never shows up. — Thomas Fuchs",
      "First, solve the problem. Then, write the code. — John Johnson",
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
      "Talk is cheap. Show me the code. — Linus Torvalds",
      "Programming isn&apos;t about what you know; it&apos;s about what you can figure out. — Chris Pine"
    ]
  };

  useEffect(() => {
    setIsMounted(true);
    
    // Load saved terminal session
    const savedOutput = localStorage.getItem('terminalOutput');
    const savedHistory = localStorage.getItem('terminalHistory');
    const savedTheme = localStorage.getItem('terminalTheme');
    const savedSound = localStorage.getItem('terminalSound');
    
    if (savedOutput) {
      try {
        setOutput(JSON.parse(savedOutput));
      } catch (e) {
        console.error('Error loading saved output:', e);
      }
    }
    
    if (savedHistory) {
      try {
        setCommandHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Error loading saved history:', e);
      }
    }
    
    if (savedTheme) {
      setCurrentTheme(savedTheme as 'default' | 'retro' | 'hacker');
    }
    
    if (savedSound !== null) {
      setSoundEnabled(savedSound === 'true');
    }
  }, []);

  // Save to localStorage when output or history changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('terminalOutput', JSON.stringify(output));
    }
  }, [output, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('terminalHistory', JSON.stringify(commandHistory));
    }
  }, [commandHistory, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('terminalTheme', currentTheme);
    }
  }, [currentTheme, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('terminalSound', soundEnabled.toString());
    }
  }, [soundEnabled, isMounted]);

  // Play sound effect
  const playSound = (type: 'keystroke' | 'enter' | 'error') => {
    if (!soundEnabled) return;
    
    // Create audio context for sound effects
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      switch (type) {
        case 'keystroke':
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          break;
        case 'enter':
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          break;
        case 'error':
          oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          break;
      }
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Fallback: silent operation if audio context fails
    }
  };

  // Copy text to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Show temporary feedback
      const newOutput = [...output];
      newOutput.push({ text: 'Text copied to clipboard!', isCommand: false });
      setOutput(newOutput);
      
      // Remove feedback after 2 seconds
      setTimeout(() => {
        setOutput(prev => prev.slice(0, -1));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Paste text from clipboard
  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCommand(prev => prev + text);
    } catch (err) {
      console.error('Failed to paste text: ', err);
    }
  };

  // Handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection) {
      setSelectedText(selection.toString());
    }
  };

  // Handle right-click context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPos({ x: e.clientX, y: e.clientY });
    setShowContextMenu(true);
  };

  // Close context menu
  const closeContextMenu = () => {
    setShowContextMenu(false);
  };

  // Handle context menu actions
  const handleCopy = () => {
    if (selectedText) {
      copyToClipboard(selectedText);
    } else {
      // Copy current command if no text selected
      if (command) {
        copyToClipboard(command);
      }
    }
    closeContextMenu();
  };

  const handlePaste = async () => {
    await pasteFromClipboard();
    closeContextMenu();
  };

  const handleSelectAll = () => {
    // Select all terminal output
    const allText = output.map(line => 
      line.isCommand ? `user@portfolio:~$ ${line.text}` : line.text
    ).join('\n');
    copyToClipboard(allText);
    closeContextMenu();
  };

  // Close context menu when clicking elsewhere
  useEffect(() => {
    const handleClick = () => {
      if (showContextMenu) {
        closeContextMenu();
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showContextMenu]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  const handleCommand = () => {
    if (!command.trim()) return;
    
    playSound('enter');
    
    const newOutput = [...output, { text: command, isCommand: true }];
    const newHistory = [...commandHistory, command];
    
    // Handle chained commands with &&
    const commands = command.split('&&').map(cmd => cmd.trim());
    
    setCommandHistory(newHistory);
    setHistoryIndex(-1);
    
    // Process each command in chain
    commands.forEach((cmd, index) => {
      const args = cmd.toLowerCase().split(' ');
      const mainCommand = args[0];
      
      // Add delay between chained commands
      setTimeout(() => {
        processCommand(cmd, mainCommand, args, newOutput);
      }, index * 500);
    });
    
    setCommand('');
  };

  const processCommand = (fullCmd: string, mainCommand: string, args: string[], currentOutput: CommandOutput[]) => {
    setIsTypingOutput(true);
    
    // Process commands
    if (mainCommand === 'help') {
      currentOutput.push({ text: 'Available commands:', isCommand: false });
      currentOutput.push({ text: '  help       - Show this help message', isCommand: false });
      currentOutput.push({ text: '  about      - Learn about Ashish Panda', isCommand: false });
      currentOutput.push({ text: '  skills     - View technical skills', isCommand: false });
      currentOutput.push({ text: '  projects   - List of projects', isCommand: false });
      currentOutput.push({ text: '  contact    - Get contact information', isCommand: false });
      currentOutput.push({ text: '  clear      - Clear the terminal', isCommand: false });
      currentOutput.push({ text: '  home       - Return to main website', isCommand: false });
      currentOutput.push({ text: '  exit       - Return to main website', isCommand: false });
      currentOutput.push({ text: 'Fun commands:', isCommand: false });
      currentOutput.push({ text: '  joke       - Get a programming joke', isCommand: false });
      currentOutput.push({ text: '  fact       - Learn a fun programming fact', isCommand: false });
      currentOutput.push({ text: '  quote      - Read a programming quote', isCommand: false });
      currentOutput.push({ text: '  echo       - Print text (e.g., echo Hello World)', isCommand: false });
      currentOutput.push({ text: '  date       - Display current date and time', isCommand: false });
      currentOutput.push({ text: '  whoami     - Display user information', isCommand: false });
      currentOutput.push({ text: '  ls         - List available sections', isCommand: false });
      currentOutput.push({ text: '  matrix     - Toggle Matrix effect speed', isCommand: false });
      currentOutput.push({ text: '  theme      - Change terminal theme (default/retro/hacker)', isCommand: false });
      currentOutput.push({ text: '  sound      - Toggle sound effects', isCommand: false });
      currentOutput.push({ text: '  ask        - Ask a question (e.g., ask What is React?)', isCommand: false });
      currentOutput.push({ text: '  history    - Show command history', isCommand: false });
      currentOutput.push({ text: 'Keyboard shortcuts:', isCommand: false });
      currentOutput.push({ text: '  Ctrl+C     - Copy selected text or current command', isCommand: false });
      currentOutput.push({ text: '  Ctrl+V     - Paste from clipboard', isCommand: false });
      currentOutput.push({ text: '  Ctrl+A     - Copy all terminal output', isCommand: false });
      currentOutput.push({ text: '  Ctrl+L     - Clear terminal', isCommand: false });
      currentOutput.push({ text: '  Tab        - Autocomplete commands', isCommand: false });
      currentOutput.push({ text: '  Right-click - Context menu for copy/paste', isCommand: false });
      currentOutput.push({ text: 'Easter eggs:', isCommand: false });
      currentOutput.push({ text: '  sudo       - Try to get root access', isCommand: false });
      currentOutput.push({ text: '  cat        - Try to read files', isCommand: false });
      currentOutput.push({ text: '  rm         - Try to delete files', isCommand: false });
    }
    // Easter eggs
    else if (mainCommand === 'sudo') {
      currentOutput.push({ text: 'You are not root. Nice try! 😏', isCommand: false, isError: true });
      currentOutput.push({ text: 'This incident has been reported to the administrator.', isCommand: false, isError: true });
      playSound('error');
    }
    else if (mainCommand === 'rm') {
      if (args.includes('-rf') && args.includes('/')) {
        currentOutput.push({ text: '💥 System meltdown in 3... 2... just kidding! 😄', isCommand: false, isError: true });
        currentOutput.push({ text: 'Did you really think I&apos;d let you delete everything?', isCommand: false });
      } else {
        currentOutput.push({ text: 'rm: cannot remove: Permission denied', isCommand: false, isError: true });
      }
    }
    else if (mainCommand === 'cat') {
      if (args[1] === 'secrets.txt') {
        currentOutput.push({ text: '🔐 SECRET FILE ACCESSED 🔐', isCommand: false });
        currentOutput.push({ text: 'The secret to great code: Coffee + Sleep + More Coffee', isCommand: false });
        currentOutput.push({ text: 'Also: Always comment your code, future you will thank you!', isCommand: false });
      } else {
        currentOutput.push({ text: `cat: ${args[1] || 'file'}: No such file or directory`, isCommand: false, isError: true });
      }
    }
    // New commands
    else if (mainCommand === 'theme') {
      const theme = args[1] as 'default' | 'retro' | 'hacker';
      if (['default', 'retro', 'hacker'].includes(theme)) {
        setCurrentTheme(theme);
        currentOutput.push({ text: `Theme changed to: ${theme}`, isCommand: false });
      } else {
        currentOutput.push({ text: 'Available themes: default, retro, hacker', isCommand: false });
      }
    }
    else if (mainCommand === 'sound') {
      setSoundEnabled(!soundEnabled);
      currentOutput.push({ text: `Sound effects: ${!soundEnabled ? 'enabled' : 'disabled'}`, isCommand: false });
    }
    else if (mainCommand === 'ask') {
      const question = args.slice(1).join(' ');
      if (question) {
        currentOutput.push({ text: `Question: ${question}`, isCommand: false });
        // Simple hardcoded responses for common questions
        const responses: { [key: string]: string } = {
          'what is react': 'React is a JavaScript library for building user interfaces, developed by Facebook.',
          'what is javascript': 'JavaScript is a high-level programming language that enables interactive web pages.',
          'what is programming': 'Programming is the process of creating instructions for computers to execute.',
          'who are you': 'I&apos;m Ashish Panda, a passionate developer and engineering student.',
          'what is your favorite language': 'I love both C++ for its power and Python for its simplicity!',
        };
        
        const lowerQuestion = question.toLowerCase();
        const response = responses[lowerQuestion] || 
          'That&apos;s an interesting question! I&apos;m still learning, but feel free to check my projects and skills.';
        
        currentOutput.push({ text: response, isCommand: false });
      } else {
        currentOutput.push({ text: 'Usage: ask <your question>', isCommand: false });
      }
    }
    else if (mainCommand === 'history') {
      currentOutput.push({ text: 'Command History:', isCommand: false });
      commandHistory.slice(-10).forEach((cmd, index) => {
        currentOutput.push({ text: `  ${commandHistory.length - 10 + index + 1}. ${cmd}`, isCommand: false });
      });
    }
    // Existing commands (keeping original logic)...
    else if (mainCommand === 'about') {
      websiteData.about.split('\n\n').forEach(paragraph => {
        currentOutput.push({ text: paragraph, isCommand: false, isTyping: true });
      });
    } 
    else if (mainCommand === 'skills') {
      currentOutput.push({ text: 'Technical Skills:', isCommand: false });
      websiteData.skills.forEach(skill => {
        currentOutput.push({ text: `  • ${skill}`, isCommand: false });
      });
    } 
    else if (mainCommand === 'projects') {
      currentOutput.push({ text: 'Projects:', isCommand: false });
      websiteData.projects.forEach((project, index) => {
        currentOutput.push({ text: `  ${index + 1}. ${project}`, isCommand: false, isPath: true });
      });
    } 
    else if (mainCommand === 'contact') {
      currentOutput.push({ text: 'Contact Information:', isCommand: false });
      currentOutput.push({ text: `  Email:    ${websiteData.contact.email}`, isCommand: false });
      currentOutput.push({ text: `  GitHub:   ${websiteData.contact.github}`, isCommand: false });
      currentOutput.push({ text: `  LinkedIn: ${websiteData.contact.linkedin}`, isCommand: false });
    } 
    else if (mainCommand === 'joke') {
      const randomJoke = websiteData.jokes[Math.floor(Math.random() * websiteData.jokes.length)];
      currentOutput.push({ text: randomJoke, isCommand: false });
    }
    else if (mainCommand === 'fact') {
      const randomFact = websiteData.funFacts[Math.floor(Math.random() * websiteData.funFacts.length)];
      currentOutput.push({ text: randomFact, isCommand: false });
    }
    else if (mainCommand === 'quote') {
      const randomQuote = websiteData.quotes[Math.floor(Math.random() * websiteData.quotes.length)];
      currentOutput.push({ text: randomQuote, isCommand: false });
    }
    else if (mainCommand === 'echo') {
      const text = args.slice(1).join(' ') || '';
      currentOutput.push({ text: text, isCommand: false });
    }
    else if (mainCommand === 'date') {
      const now = new Date();
      currentOutput.push({ text: now.toString(), isCommand: false });
    }
    else if (mainCommand === 'whoami') {
      currentOutput.push({ text: 'visitor@portfolio', isCommand: false });
    }
    else if (mainCommand === 'ls') {
      currentOutput.push({ text: 'Available sections:', isCommand: false });
      currentOutput.push({ text: '  about', isCommand: false });
      currentOutput.push({ text: '  skills', isCommand: false });
      currentOutput.push({ text: '  projects', isCommand: false });
      currentOutput.push({ text: '  contact', isCommand: false });
    }
    else if (mainCommand === 'matrix') {
      const speed = args[1];
      if (speed && !isNaN(Number(speed))) {
        setGlitchSpeed(Number(speed));
        currentOutput.push({ text: `Matrix animation speed set to ${speed}`, isCommand: false });
      } else {
        currentOutput.push({ text: 'Usage: matrix <speed> (number between 10-200)', isCommand: false });
      }
    }
    else if (mainCommand === 'clear') {
      setOutput([]);
      return;
    } 
    else if (mainCommand === 'home' || mainCommand === 'exit') {
      currentOutput.push({ text: 'Returning to main website...', isCommand: false });
      setOutput([...currentOutput]);
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      }, 1000);
      return;
    } 
    else {
      currentOutput.push({ text: `Command not found: ${fullCmd}. Type 'help' for available commands.`, isCommand: false, isError: true });
      playSound('error');
    }
    
    setOutput([...currentOutput]);
    setIsTypingOutput(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Play keystroke sound
    if (e.key.length === 1) {
      playSound('keystroke');
    }
    
    // Handle copy/paste shortcuts
    if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
      if (selectedText) {
        e.preventDefault();
        copyToClipboard(selectedText);
        return;
      } else if (command) {
        e.preventDefault();
        copyToClipboard(command);
        return;
      }
    }
    
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      pasteFromClipboard();
      return;
    }
    
    // Select all with Ctrl+A
    if (e.key === 'a' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSelectAll();
      return;
    }
    
    if (e.key === 'Enter') {
      handleCommand();
    }
    else if (e.key === 'Tab') {
      e.preventDefault();
      // Tab autocomplete
      const currentCmd = command.toLowerCase();
      const matches = availableCommands.filter(cmd => cmd.startsWith(currentCmd));
      
      if (matches.length === 1) {
        setCommand(matches[0]);
      } else if (matches.length > 1) {
        // Show available completions
        const newOutput = [...output];
        newOutput.push({ text: `user@portfolio:~$ ${command}`, isCommand: true });
        newOutput.push({ text: `Completions: ${matches.join(' ')}`, isCommand: false });
        setOutput(newOutput);
      }
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
    // Clear terminal with Ctrl+L
    else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setOutput([]);
    }
  };

  // Get theme classes
  const getThemeClasses = () => {
    switch (currentTheme) {
      case 'retro':
        return {
          container: 'bg-black/90 text-green-400 font-mono',
          terminal: 'bg-black/95 border-green-500',
          input: 'text-green-400',
          command: 'text-green-300',
          output: 'text-green-400',
          error: 'text-red-400',
          path: 'text-yellow-400'
        };
      case 'hacker':
        return {
          container: 'bg-gray-900/90 text-cyan-400 font-mono',
          terminal: 'bg-gray-900/95 border-cyan-500',
          input: 'text-cyan-400',
          command: 'text-cyan-300',
          output: 'text-cyan-400',
          error: 'text-red-400',
          path: 'text-green-400'
        };
      default:
        return {
          container: 'bg-black/80 text-green-400 font-mono',
          terminal: 'bg-black/80 border-gray-600',
          input: 'text-blue-400',
          command: 'text-blue-400',
          output: 'text-green-400',
          error: 'text-red-400',
          path: 'text-yellow-400'
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-10">
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
      
      {/* Retro CRT effect for retro theme */}
      {currentTheme === 'retro' && (
        <div className="absolute inset-0 z-5 pointer-events-none">
          <div className="scanlines absolute inset-0 opacity-20"></div>
          <div className="crt-glow absolute inset-0 opacity-30"></div>
        </div>
      )}
      
      {/* Terminal content overlay */}
      <div className="relative z-10 h-full flex items-center justify-center p-4">
        <div className={`terminal-container ${themeClasses.container} backdrop-blur-sm ${themeClasses.terminal} rounded-lg shadow-2xl max-w-4xl w-full h-[80vh] flex flex-col`}>
          <div className="terminal-header bg-gray-800 flex items-center px-4 py-2 rounded-t-lg">
            <Link 
              href="/" 
              className="terminal-button close bg-red-500 w-3 h-3 rounded-full mr-2 block hover:bg-red-600 transition-colors cursor-pointer"
              prefetch={true}
              title="Return to home page"
            ></Link>
            <div className="terminal-button minimize bg-yellow-500 w-3 h-3 rounded-full mr-2"></div>
            <div className="terminal-button maximize bg-green-500 w-3 h-3 rounded-full"></div>
            <div className="flex-1 text-center text-gray-300 text-sm">
              Ashish&apos;s Portfolio Terminal - {currentTheme} theme {soundEnabled ? '🔊' : '🔇'}
            </div>
          </div>
          <div 
            ref={terminalBodyRef} 
            className="terminal-body p-6 font-mono flex-1 overflow-y-auto select-text"
            onMouseUp={handleTextSelection}
            onContextMenu={handleContextMenu}
          >
            {output.map((line, i) => (
              <div key={i} className={`mb-2 ${
                line.isCommand 
                  ? themeClasses.command 
                  : line.isError 
                    ? themeClasses.error 
                    : line.isPath
                      ? themeClasses.path
                      : themeClasses.output
              }`}>
                {line.isCommand ? (
                  `user@portfolio:~$ ${line.text}`
                ) : line.isTyping ? (
                  <TypewriterText text={line.text} />
                ) : (
                  line.text
                )}
              </div>
            ))}
            <div className="flex items-center">
              <span className={themeClasses.command}>user@portfolio:~$</span>
              <div className="relative flex-1 ml-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onContextMenu={handleContextMenu}
                  className={`bg-transparent border-none outline-none ${themeClasses.input} w-full caret-transparent`}
                  autoFocus
                  disabled={isTypingOutput}
                />
                <span 
                  className={`absolute top-0 left-0 ${themeClasses.input}`}
                  style={{ 
                    paddingLeft: `${command.length}ch`, 
                    animation: 'blink 1s step-end infinite' 
                  }}
                >█</span>
              </div>
            </div>
            
            {/* Context Menu */}
            {showContextMenu && (
              <div 
                className="fixed bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 py-2 min-w-[120px]"
                style={{ 
                  left: `${contextMenuPos.x}px`, 
                  top: `${contextMenuPos.y}px` 
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  onClick={handleCopy}
                  disabled={!selectedText && !command}
                >
                  Copy {selectedText ? 'Selection' : command ? 'Command' : ''}
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  onClick={handlePaste}
                >
                  Paste
                </button>
                <hr className="border-gray-600 my-1" />
                <button
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  onClick={handleSelectAll}
                >
                  Copy All Output
                </button>
              </div>
            )}
            
            {/* Add cursor animation and CRT effects */}
            <style jsx>{`
              @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
              }
              
              .scanlines {
                background: repeating-linear-gradient(
                  to bottom,
                  transparent 0px,
                  transparent 2px,
                  rgba(0, 255, 0, 0.1) 3px
                );
              }
              
              .crt-glow {
                background: radial-gradient(
                  ellipse at center,
                  rgba(0, 255, 0, 0.1) 0%,
                  transparent 70%
                );
                filter: blur(1px);
              }
              
              .terminal-container {
                text-shadow: ${currentTheme === 'retro' ? '0 0 5px currentColor' : 'none'};
              }
              
              .select-text {
                user-select: text;
                -webkit-user-select: text;
                -moz-user-select: text;
                -ms-user-select: text;
              }
              
              /* Selection highlighting */
              .terminal-body ::selection {
                background-color: rgba(0, 123, 255, 0.3);
                color: inherit;
              }
              
              .terminal-body ::-moz-selection {
                background-color: rgba(0, 123, 255, 0.3);
                color: inherit;
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalPage;
