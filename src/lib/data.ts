// src/lib/data.ts
import type { Project } from '@/types/project';
import * as LucideIcons from 'lucide-react'; // Import all icons for dynamic rendering

// Helper function to get Lucide icon component by name (copied from projects-section)
// Consider moving this to a utils file if used elsewhere
const getIconComponent = (iconName: string | React.ElementType): React.ElementType => {
  if (typeof iconName === 'function') {
    return iconName; // Already a component
  }
  // Fallback icon if the requested one doesn't exist
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Code;
  return IconComponent;
};


// Centralized project data
export const projectsData: Project[] = [
    {
      id: 'face-liveness',
      title: 'Face Liveness Detection System',
      icon: 'ScanFace', // Store icon name as string
      description: "An AI-powered system that detects whether a face is real or spoofed using webcam input. Enhances biometric authentication using live detection algorithms.",
      longDescription: "This project involved developing a sophisticated AI model capable of analyzing subtle facial cues from a webcam feed to determine if the subject is a live person or a static image/video spoof attempt. It integrates seamlessly with authentication flows, adding a crucial layer of security against presentation attacks. Key challenges included optimizing the model for real-time performance in web browsers using TensorFlow.js and ensuring robustness across various lighting conditions and camera qualities.",
      image: 'https://picsum.photos/seed/facedetect/800/600', // Larger image for detail page
      aiHint: 'face liveness detection interface secure',
      tech: ['Python', 'TensorFlow.js', 'ONNX', 'OpenCV', 'React'],
      demoLink: '#', // Placeholder - update with actual link if available
      learnMoreLink: `/projects/face-liveness`, // Links to the detail page
      button1Text: '▶️ Try Live Demo',
      button2Text: '📄 Learn More',
      category: ['AI', 'Security', 'Web'],
    },
    {
      id: 'ai-ecommerce-chatbot',
      title: 'AI Chatbot with E-Commerce Support',
      icon: 'MessageCircle',
      description: "Built a smart chatbot using Dialogflow that handles orders, responds to user queries, and tracks deliveries with contextual understanding.",
      longDescription: "Developed an intelligent conversational agent for e-commerce platforms using Google Dialogflow. The chatbot can understand natural language queries related to products, order status, shipping information, and FAQs. It integrates with backend systems via Firebase Functions to process orders, retrieve tracking details, and provide personalized responses, significantly improving customer support efficiency and user experience.",
      image: 'https://picsum.photos/seed/ecommercebot/800/600',
      aiHint: 'chatbot interface gradient conversation',
      tech: ['Dialogflow', 'JavaScript', 'Firebase Functions', 'Node.js'],
      demoLink: '#',
      learnMoreLink: `/projects/ai-ecommerce-chatbot`,
      button1Text: '💬 Chat Demo',
      button2Text: '📄 Learn More',
      category: ['AI', 'Web', 'E-commerce'],
    },
    {
      id: 'voice-vocational-game',
      title: 'Voice-Controlled Vocational Game',
      icon: 'Headset',
      description: "Designed a gamified simulation where learners perform skill tasks using only their voice — ideal for inclusive vocational education.",
      longDescription: "This innovative project explores accessibility in education through a voice-controlled game designed for vocational training. Using the Web Speech API, learners interact with simulated work environments (e.g., assembling components, following instructions) using voice commands. The Canvas API renders the visual simulation. This approach provides an alternative learning method for individuals with motor impairments and enhances engagement for all learners.",
      image: 'https://picsum.photos/seed/voicegame/800/600',
      aiHint: 'vocational game interface accessibility',
      tech: ['JavaScript', 'Web Speech API', 'HTML5 Canvas', 'Game Design'],
      demoLink: '#',
      learnMoreLink: `/projects/voice-vocational-game`,
      button1Text: '🎮 Play Preview',
      button2Text: '📄 Learn More',
      category: ['Games', 'Education', 'Accessibility'],
    },
    {
      id: 'yumaris-lms',
      title: 'Yumaris Skill Learning LMS',
      icon: 'Lightbulb',
      description: "A custom learning platform offering recorded skill courses, auto quizzes, and downloadable certification — powered by Firebase.",
      longDescription: "Developed a bespoke Learning Management System (LMS) tailored for skill-based online courses. Features include video hosting and streaming, automated quiz generation and grading, progress tracking, and dynamically generated PDF certificates upon course completion. The platform leverages Firebase for authentication, database (Firestore), storage, and hosting, providing a scalable and cost-effective solution.",
      image: 'https://picsum.photos/seed/yumarislms/800/600',
      aiHint: 'lms dashboard interface online course',
      tech: ['HTML', 'CSS', 'JavaScript', 'Firebase (Auth, Firestore, Storage, Hosting)', 'PDF Generation'],
      demoLink: '#',
      learnMoreLink: `/projects/yumaris-lms`,
      button1Text: '📘 Try Sample Course',
      button2Text: '📄 Learn More',
      category: ['Web', 'Education'],
    },
    {
      id: 'iot-green-campus',
      title: 'IoT Green Campus Automation',
      icon: 'Leaf',
      description: "An IoT solution to monitor campus energy and environment using real-time sensors (water, CO₂, light) and control appliances wirelessly.",
      longDescription: "This project implemented an Internet of Things (IoT) system for environmental monitoring and energy management on a campus. ESP32 microcontrollers collect data from various sensors (water flow, CO2 levels, ambient light, temperature) and transmit it wirelessly via Wi-Fi to a central Firebase database. A web dashboard displays real-time data visualizations and allows remote control of connected appliances (e.g., lights, fans) for optimized energy consumption.",
      image: 'https://picsum.photos/seed/iotcampus/800/600',
      aiHint: 'iot campus dashboard sensor data',
      tech: ['ESP32', 'Arduino (C++)', 'Firebase Realtime DB', 'React', 'Node.js', 'MQTT'],
      demoLink: '#',
      learnMoreLink: `/projects/iot-green-campus`,
      button1Text: '🌱 View Sensor Demo',
      button2Text: '📄 Learn More',
      category: ['IoT', 'Hardware', 'Web'],
    },
    {
      id: 'multimedia-portfolio',
      title: 'Multimedia Editing Portfolio',
      icon: 'Video',
      description: "A showcase of YouTube intros, reels, event edits, and logo animations done for brands and influencers under Yumaris Media Services.",
      longDescription: "Curated a portfolio demonstrating proficiency in video editing and motion graphics. This includes creating engaging YouTube intros/outros, dynamic social media reels, professional event highlight videos, and custom logo animations. Utilized industry-standard software like Adobe Premiere Pro and After Effects, alongside tools like Canva for quick graphic design tasks, delivering high-quality visual content for various clients.",
      image: 'https://picsum.photos/seed/multimediaportfolio/800/600',
      aiHint: 'video editing timeline interface creative',
      tech: ['Adobe Premiere Pro', 'Adobe After Effects', 'Canva', 'Motion Graphics', 'Video Production'],
      demoLink: '#', // Link to a portfolio page or video reel
      learnMoreLink: `/projects/multimedia-portfolio`,
      button1Text: '🎥 Watch Reels',
      button2Text: '📄 Learn More',
      category: ['Media', 'Design'],
    },
    {
      id: 'client-websites',
      title: 'Client Websites by Yumaris',
      icon: 'Laptop2',
      description: "Modern, fast-loading websites built for businesses with mobile-friendly designs and SEO optimization — using Firebase & React.",
      longDescription: "Designed and developed multiple websites for small businesses and individual clients. Focused on creating modern, visually appealing, and highly performant sites using React and Tailwind CSS. Ensured full responsiveness across all devices and implemented basic SEO best practices. Leveraged Firebase for reliable and scalable hosting and backend services.",
      image: 'https://picsum.photos/seed/clientwebsites/800/600',
      aiHint: 'website design showcase professional',
      tech: ['React', 'Tailwind CSS', 'Firebase (Hosting, Firestore)', 'Next.js', 'SEO'],
      demoLink: '#', // Link to a client showcase or specific site
      learnMoreLink: `/projects/client-websites`,
      button1Text: '🌐 Visit Site Example',
      button2Text: '📄 Learn More',
      category: ['Web', 'Design'],
    },
  ];


// Function to get all projects
export const getAllProjects = (): Project[] => {
    // Enhance projects with resolved icon components before returning
    return projectsData.map(project => ({
      ...project,
      iconComponent: getIconComponent(project.icon)
    }));
  };

// Function to get a single project by its ID
export const getProjectById = (id: string): Project | undefined => {
  const project = projectsData.find(p => p.id === id);
  if (project) {
      return {
          ...project,
          iconComponent: getIconComponent(project.icon)
      }
  }
  return undefined;
};
