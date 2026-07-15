import React, { useLayoutEffect, useEffect, useRef } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  useLocation,
  useNavigationType,
  Link,
} from 'react-router-dom';
import { motion } from 'motion/react';
import Header from './components/Header';
import ModuleMap from './components/ModuleMap';
import NotesView from './components/NotesView';
import BinaryBackground from './components/BinaryBackground';
import ErrorBoundary from './components/ErrorBoundary';
import { COURSES_DATA } from './data';
import { Topic, Course } from './types';
import {
  Shield,
  Layers,
  ArrowRight,
  Heart,
  Compass,
} from 'lucide-react';

/* ----------------------------- routing helpers ---------------------------- */

const findCourseBySlug = (slug?: string): Course | undefined =>
  COURSES_DATA.find((c) => c.slug === slug);

const findTopicInCourse = (course: Course, topicId?: string): Topic | null => {
  for (const module of course.modules) {
    const topic = module.topics.find((t) => t.id === topicId);
    if (topic) return topic;
  }
  return null;
};

// Scroll management scoped to REAL navigations only (keyed on the history
// entry's location.key — NOT on every render). This guarantees:
//   * New page (PUSH/REPLACE)         -> start at the top
//   * Back / forward (POP)            -> restore the previous scroll position
//   * Interacting within a page        -> location.key is unchanged, so this
//     effect never runs and the scroll position never moves
// It also disables the browser's native scroll restoration so it can't fight us.
function ScrollManager() {
  const location = useLocation();
  const navigationType = useNavigationType(); // 'PUSH' | 'POP' | 'REPLACE'
  const positions = useRef<Map<string, number>>(new Map());
  const isRestoring = useRef(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Continuously record the scroll position for the CURRENT history entry.
  // Skip while a restore is in progress so our own scrollTo calls don't
  // overwrite the saved target with an intermediate (clamped) value.
  useEffect(() => {
    const key = location.key;
    const handleScroll = () => {
      if (isRestoring.current) return;
      positions.current.set(key, window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.key]);

  // On each real navigation:
  //   * POP (back/forward, or in-app Back which uses navigate(-1)) -> restore
  //   * PUSH/REPLACE (genuinely new page)                          -> top
  // List/map pages render tall, async/dynamic content, so a single scrollTo
  // fires before layout is ready and silently clamps to the top. We re-apply
  // the target across several frames until the document is tall enough to honor
  // it, then stop (so we never fight the user's own scrolling).
  useLayoutEffect(() => {
    let cancelled = false;
    let reached = false;
    const timers: number[] = [];

    if (navigationType === 'POP') {
      const target = positions.current.get(location.key) ?? 0;
      if (target <= 0) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        return;
      }
      isRestoring.current = true;
      const attempt = () => {
        if (cancelled || reached) return;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: target, behavior: 'auto' });
        // Once the page is tall enough to actually reach the target, we're done.
        if (maxScroll >= target - 2) reached = true;
      };
      attempt();
      [0, 30, 60, 120, 200, 300, 450].forEach((d) => {
        timers.push(window.setTimeout(attempt, d));
      });
      timers.push(
        window.setTimeout(() => {
          isRestoring.current = false;
        }, 500)
      );
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      isRestoring.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key, navigationType]);

  return null;
}

/* ------------------------------ shared layout ----------------------------- */

function HubLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      key="core-notes-hub"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-1 flex flex-col"
      id="notes-core-workspace"
    >
      <Header userName="Surya Pratap Singh" />

      <main
        className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col relative z-10"
        id="hub-main-frame"
      >
        {children}
      </main>

      <footer
        className="bg-[#1c2538]/60 backdrop-blur-md border-t border-[#2d3a54] py-6 px-4 text-center mt-12 text-xs text-gray-500 font-mono relative z-10"
        id="app-footer"
      >
        <p>
          &copy; 2026 Surya Pratap Singh | Cybersecurity Study Notes
        </p>
        <p className="mt-1 text-gray-400 flex items-center justify-center space-x-1">
          <span>TryHackMe &middot; Google Cybersecurity &mdash; refining cyber notes with</span>
          <Heart className="w-3 h-3 text-red-500 fill-red-500" />
        </p>
      </footer>
    </motion.div>
  );
}

/* ----------------------------- document title ----------------------------- */

const BASE_TITLE = "Surya's Cyber Notes";
function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

/* ------------------------------- landing page ----------------------------- */

function LandingPage() {
  useDocumentTitle(BASE_TITLE);
  const navigate = useNavigate();
  return (
    <motion.div
      key="entry-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex flex-col justify-between items-center px-6 py-12 overflow-hidden"
      id="cinematic-entry-gate"
    >
      {/* Top decorative accent */}
      <div className="w-full flex justify-center z-10 opacity-30 select-none">
        <span className="font-mono text-xs tracking-[0.4em] text-[#9fef00] uppercase">
          // SECURE TERMINAL ESTABLISHED
        </span>
      </div>

      {/* Center Content: Centered Quote and Description */}
      <div className="max-w-3xl w-full text-center space-y-10 z-10 my-auto" id="entry-hero-section">
        {/* Cinematic Centered Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
          className="space-y-4"
        >
          <span className="text-[#9fef00]/30 font-serif text-8xl leading-none select-none pointer-events-none block -mb-8">“</span>
          <blockquote className="relative">
            <p className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-tight leading-relaxed italic font-sans px-4">
              "I will not quit because it's hard.
              <br />
              I will continue because my future is worth it."
            </p>
            <cite className="block text-[#9fef00] font-mono font-bold text-sm mt-5 uppercase tracking-[0.25em] not-italic">
              — Surya Pratap Singh
            </cite>
          </blockquote>
        </motion.div>

        {/* Minimal Description lines */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="space-y-2 border-t border-[#2d3a54]/40 pt-8 max-w-xl mx-auto"
        >
          <p className="text-gray-300 text-sm md:text-base leading-relaxed tracking-wide">
            My personal cybersecurity notes — concepts, mindmaps,
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed tracking-wide">
            and real-world examples from my learning journey.
          </p>
        </motion.div>

        {/* Dramatic Enter button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="pt-4"
        >
          <button
            onClick={() => navigate('/home')}
            className="group relative bg-[#9fef00] hover:bg-[#8fd500] text-[#161c2c] font-mono font-extrabold text-sm tracking-widest uppercase px-8 py-4 rounded-lg shadow-lg shadow-[#9fef00]/20 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer inline-flex items-center space-x-2"
            id="btn-enter-terminal"
          >
            <span>Enter Terminal</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </button>
        </motion.div>
      </div>

    </motion.div>
  );
}

/* -------------------------------- home view ------------------------------- */

function HomeView() {
  useDocumentTitle(BASE_TITLE);
  const navigate = useNavigate();
  return (
    <motion.div
      key="home-tab"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-8 text-left"
      id="tab-home-content"
    >
      {/* Welcome Banner */}
      <div
        className="bg-[#1c2538]/60 backdrop-blur-md rounded-xl border border-[#2d3a54] p-6 md:p-8 shadow-xl relative overflow-hidden"
        id="home-welcome-card"
      >
        {/* Decorative mini terminal — fills the right side (desktop only) */}
        <div
          className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-[300px] pointer-events-none select-none"
          aria-hidden="true"
        >
          <div className="rounded-lg border border-[#2d3a54] bg-[#0b0f19]/90 shadow-[0_0_25px_rgba(159,239,0,0.08)] overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-[#111827] border-b border-[#2d3a54]/80">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              <span className="ml-2 text-[10px] text-gray-500 font-mono tracking-wide">bash — workspace</span>
            </div>
            <div className="p-4 font-mono text-xs leading-relaxed min-h-[104px]">
              <span className="mm-line mm-l1 text-[#9fef00]">$ whoami</span>
              <span className="mm-line mm-l2 text-gray-300">surya_pratap_singh</span>
              <span className="mm-line mm-l3 text-[#9fef00]">$ cat mission.txt</span>
              <span className="mm-line mm-l4 text-[#38bdf8]">&gt; Learning. Building. Securing.<span className="mm-cursor text-[#9fef00]">▋</span></span>
            </div>
          </div>
        </div>
        <div className="max-w-2xl">
          <span className="text-[#9fef00] font-mono text-xs uppercase tracking-widest font-bold">
            Personal Workspace
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1.5">
            Welcome, Surya Pratap Singh
          </h1>
          <p className="text-gray-300 text-sm md:text-base mt-3 leading-relaxed">
            This is your private, premium cybersecurity study platform. Here, we systematically compile modular findings, analyze computer communication flowcharts, and solve recall task exercises to build durable security skills.
          </p>
        </div>

        {/* Small compact quote display */}
        <div className="mt-6 border-l-2 border-[#9fef00] pl-4 italic text-xs text-gray-400 max-w-xl">
          "I will not quit because it's hard. I will continue because my future is worth it."
        </div>
      </div>

      {/* Course Selector Grid */}
      <div className="pt-8 space-y-6">
        <h2 className="text-xl font-bold text-white tracking-wide font-mono flex items-center space-x-2">
          <Layers className="w-5 h-5 text-[#9fef00]" />
          <span>Choose Your Course</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES_DATA.map((course) => (
            <div
              key={course.id}
              onClick={() => {
                if (course.active && !course.comingSoon) {
                  navigate(`/course/${course.slug}`, { state: { fromList: true } });
                }
              }}
              className={`relative rounded-xl border p-6 flex flex-col justify-between h-full transition-all duration-300 ${
                course.active && !course.comingSoon
                  ? 'bg-[#1c2538]/60 backdrop-blur-md border-[#2d3a54] hover:border-[#9fef00] cursor-pointer hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(159,239,0,0.15)] group'
                  : 'bg-[#161c2c]/40 backdrop-blur-md border-[#2d3a54]/50 opacity-60 cursor-not-allowed'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      course.active ? 'bg-[#9fef00]/10 text-[#9fef00]' : 'bg-gray-800 text-gray-500'
                    }`}
                  >
                    <Shield className="w-5 h-5" />
                  </div>
                  {course.comingSoon && (
                    <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase border border-gray-700 px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3
                  className={`text-lg font-bold mb-2 ${
                    course.active ? 'text-white group-hover:text-[#9fef00] transition-colors' : 'text-gray-400'
                  }`}
                >
                  {course.name}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-6">{course.description}</p>
              </div>

              <div className="mt-auto">
                {course.modules.length > 0 ? (
                  <div className="inline-block bg-[#161c2c] border border-[#2d3a54] px-3 py-1 rounded-md">
                    <span className="text-xs font-mono text-gray-400">
                      {course.modules.length} Modules &middot;{' '}
                      {course.modules.reduce((acc, m) => acc + m.topics.length, 0)} Rooms
                    </span>
                  </div>
                ) : (
                  <div className="inline-block bg-[#161c2c]/50 border border-[#2d3a54]/30 px-3 py-1 rounded-md">
                    <span className="text-xs font-mono text-gray-500">In Development</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------ modules route ----------------------------- */

function ModulesRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseSlug } = useParams();
  const course = findCourseBySlug(courseSlug);

  useDocumentTitle(course ? `${course.name} — ${BASE_TITLE}` : BASE_TITLE);

  if (!course || !course.active || course.comingSoon || course.modules.length === 0) {
    return <NotFound />;
  }

  const cameFromList = !!(location.state && (location.state as any).fromList);

  return (
    <motion.div
      key="modules-tab"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <ModuleMap
        modules={course.modules}
        courseName={course.name}
        onBack={() => {
          // Real back navigation (POP) restores the home list scroll position.
          if (cameFromList) navigate(-1);
          else navigate('/home');
        }}
        onTopicClick={(topic) =>
          navigate(`/course/${course.slug}/${topic.id}`, { state: { fromList: true } })
        }
      />
    </motion.div>
  );
}

/* ------------------------------- notes route ------------------------------ */

function NotesRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { courseSlug, topicId } = useParams();
  const course = findCourseBySlug(courseSlug);
  const topic = course ? findTopicInCourse(course, topicId) : null;

  useDocumentTitle(topic ? `${topic.title} — ${BASE_TITLE}` : BASE_TITLE);

  if (!course || !topic) {
    return <NotFound />;
  }

  const cameFromList = !!(location.state && (location.state as any).fromList);

  return (
    <motion.div
      key={`notes-${topic.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ErrorBoundary>
        <NotesView
          key={topic.id}
          topic={topic}
          pathwayLabel={`${course.name.replace(/^.*?—\s*/, '')} Pathway`}
          onBack={() => {
            // "Back to Learning Path": use real back nav so the course/map
            // scroll position is restored (POP). Fall back to a fresh push
            // when the room was opened directly (deep link / refresh).
            if (cameFromList) navigate(-1);
            else navigate(`/course/${course.slug}`);
          }}
          userPoints={0}
        />
      </ErrorBoundary>
    </motion.div>
  );
}

/* -------------------------------- 404 page -------------------------------- */

function NotFound() {
  useDocumentTitle(`Page Not Found — ${BASE_TITLE}`);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex items-center justify-center py-20"
      id="not-found-view"
    >
      <div className="bg-[#1c2538]/60 backdrop-blur-md rounded-xl border border-[#2d3a54] p-10 md:p-14 shadow-xl text-center max-w-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none select-none">
          <Compass className="w-40 h-40 text-white" />
        </div>
        <span className="text-[#9fef00] font-mono text-xs uppercase tracking-widest font-bold">
          Error 404
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 font-mono">404</h1>
        <p className="text-gray-300 text-sm md:text-base mt-4 leading-relaxed">
          This route doesn't exist on the terminal. The page you're looking for may have been moved or never existed.
        </p>
        <Link
          to="/home"
          className="group mt-8 inline-flex items-center space-x-2 bg-[#9fef00] hover:bg-[#8fd500] text-[#161c2c] font-mono font-extrabold text-sm tracking-widest uppercase px-6 py-3 rounded-lg shadow-lg shadow-[#9fef00]/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        >
          <span>Back to Home</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
        </Link>
      </div>
    </motion.div>
  );
}

/* --------------------------------- shell ---------------------------------- */

function AppShell() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div
      className="min-h-screen bg-[#161c2c] text-gray-200 flex flex-col font-sans selection:bg-[#9fef00] selection:text-[#161c2c] overflow-x-hidden relative"
      id="app-container"
    >
      {/* Global Binary Rain Background */}
      <BinaryBackground opacity={isLanding ? 1 : 0.15} />

      <ScrollManager />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HubLayout><HomeView /></HubLayout>} />
        <Route path="/course/:courseSlug" element={<HubLayout><ModulesRoute /></HubLayout>} />
        <Route path="/course/:courseSlug/:topicId" element={<HubLayout><NotesRoute /></HubLayout>} />
        <Route path="*" element={<HubLayout><NotFound /></HubLayout>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
