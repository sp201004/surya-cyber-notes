export interface QuizQuestion {
  id: string;
  question: string;
  type: 'text' | 'choice';
  options?: string[];
  correctAnswer: string;
  hint?: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface MindmapNode {
  id: string;
  label: string;
  description: string;
  x: number; // Percentage X
  y: number; // Percentage Y
  connections?: string[]; // Array of Node IDs it connects to
}

export interface RealWorldCallout {
  title: string;
  concept: string;
  scenario: string;
  relevance: string;
}

export interface Topic {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  status: 'locked' | 'unlocked' | 'completed';
  iconType: 'sword' | 'shield' | 'clipboard' | 'chest' | 'network' | 'lan' | 'osi' | 'packet' | 'web' | 'linux' | 'windows' | 'question' | 'cia-prism' | 'warning-shield-skull' | 'scales-of-justice' | 'open-book-magnifier' | 'mystery-chest' | 'os-intro' | 'win-basics' | 'linux-cli' | 'win-cli' | 'os-sec' | 'data-repr' | 'data-encode' | 'python-demo' | 'js-demo' | 'sql-basics' | 'mystery-chest-software' | 'crypto-laptop' | 'hacker-terminal' | 'defender-shield';
  content: string; // Markdown or rich text representation
  realWorldCallout?: RealWorldCallout;
  mindmap: MindmapNode[];
  keyTakeaways: string[];
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  isFuture?: boolean;
  topics: Topic[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  slug: string;
  active: boolean;
  comingSoon?: boolean;
  modules: Module[];
}

export interface UserProgress {
  completedTopics: string[]; // List of topic IDs
  completedQuestions: { [questionId: string]: boolean }; // Map of question ID to completion status
  userName: string;
}
