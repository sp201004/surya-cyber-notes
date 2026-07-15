import { useState } from 'react';
import { 
  Shield, 
  Terminal, 
  CheckCircle2, 
  ArrowRight, 
  Sword, 
  Network, 
  Layers, 
  Compass,
  Briefcase,
  Gift,
  Cpu
} from 'lucide-react';
import { Module, Topic } from '../types';

interface ModuleMapProps {
  modules: Module[];
  courseName?: string;
  onBack?: () => void;
  onTopicClick: (topic: Topic) => void;
}

// Unique Isometric 3D object rendering based on topicId
const renderUniqueIsometricObject = (
  topicId: string,
  x: number,
  y: number,
  isCompleted: boolean,
  isHovered: boolean
) => {
  switch (topicId) {
    /* ===================================================================== */
    /* Google Cybersecurity course room icons — each matched to its topic.   */
    /* ===================================================================== */

    // C1 — Historical Attacks: virus/worm on an old CRT monitor
    case 'historical-attacks':
      return (
        <g id="crt-malware-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(34,197,94,0.18)" filter="blur(3px)" />
          <rect x={x - 16} y={y - 14} width={32} height={26} rx={2} fill="#3f3a2f" stroke="#211f18" strokeWidth="1" />
          <path d={`M ${x - 8} ${y + 12} L ${x + 8} ${y + 12} L ${x + 11} ${y + 17} L ${x - 11} ${y + 17} Z`} fill="#2a2720" />
          <rect x={x - 12} y={y - 11} width={24} height={19} rx={1} fill="#04240f" stroke="#22c55e" strokeWidth="0.5" />
          <line x1={x - 12} y1={y - 6} x2={x + 12} y2={y - 6} stroke="#22c55e" strokeWidth="0.3" opacity="0.3" />
          <line x1={x - 12} y1={y + 2} x2={x + 12} y2={y + 2} stroke="#22c55e" strokeWidth="0.3" opacity="0.3" />
          <circle cx={x - 5} cy={y - 2} r={2.4} fill="#4ade80" />
          <circle cx={x - 1} cy={y - 3} r={2.4} fill="#22c55e" />
          <circle cx={x + 3} cy={y - 1} r={2.4} fill="#4ade80" />
          <circle cx={x + 6} cy={y + 2} r={2.4} fill="#22c55e" />
          <circle cx={x + 5.2} cy={y + 1.2} r={0.6} fill="#04240f" />
          <circle cx={x + 6.8} cy={y + 1.2} r={0.6} fill="#04240f" />
          <path d={`M ${x - 5} ${y + 0.4} l -1.5 1.5 M ${x - 1} ${y - 0.6} l -1.5 1.5 M ${x + 3} ${y + 1.4} l -1.5 1.5`} stroke="#16a34a" strokeWidth="0.6" />
        </g>
      );

    // C2 — Security Domains & Risk: 8-segment CISSP domain wheel
    case 'security-domains-risk': {
      const colors = ['#38bdf8', '#0ea5e9', '#22c55e', '#4ade80', '#eab308', '#f59e0b', '#a855f7', '#c084fc'];
      const wedges = [...Array(8)].map((_, i) => {
        const a0 = (i * 45 - 90) * Math.PI / 180;
        const a1 = ((i + 1) * 45 - 90) * Math.PI / 180;
        const r = 14;
        const x0 = x + r * Math.cos(a0), y0 = (y - 1) + r * Math.sin(a0) * 0.62;
        const x1 = x + r * Math.cos(a1), y1 = (y - 1) + r * Math.sin(a1) * 0.62;
        return <path key={i} d={`M ${x} ${y - 1} L ${x0} ${y0} A ${r} ${r * 0.62} 0 0 1 ${x1} ${y1} Z`} fill={colors[i]} stroke="#0f172a" strokeWidth="0.5" opacity="0.9" />;
      });
      return (
        <g id="domains-wheel-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(56,189,248,0.18)" filter="blur(3px)" />
          {wedges}
          <circle cx={x} cy={y - 1} r={4} fill="#0f172a" stroke="#e2e8f0" strokeWidth="0.6" />
          <text x={x} y={y + 1} fontSize="4.5" fill="#e2e8f0" textAnchor="middle" fontFamily="monospace" fontWeight="bold">8</text>
        </g>
      );
    }

    // C2 — SIEM Tools & Logs: dashboard monitor with graphs
    case 'siem-tools-logs':
      return (
        <g id="dashboard-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={7} fill="rgba(56,189,248,0.18)" filter="blur(3px)" />
          <rect x={x - 17} y={y - 14} width={34} height={24} rx={2} fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
          <path d={`M ${x - 6} ${y + 10} L ${x + 6} ${y + 10} L ${x + 9} ${y + 15} L ${x - 9} ${y + 15} Z`} fill="#334155" />
          <rect x={x - 14} y={y - 11} width={28} height={18} fill="#0b1220" />
          <rect x={x - 11} y={y - 1} width={3} height={6} fill="#22c55e" />
          <rect x={x - 6} y={y - 4} width={3} height={9} fill="#38bdf8" />
          <rect x={x - 1} y={y - 7} width={3} height={12} fill="#9fef00" />
          <rect x={x + 4} y={y - 3} width={3} height={8} fill="#a855f7" />
          <path d={`M ${x - 11} ${y - 6} L ${x - 6} ${y - 8} L ${x - 1} ${y - 9} L ${x + 6} ${y - 11}`} fill="none" stroke="#f59e0b" strokeWidth="1" />
        </g>
      );

    // C2 — Incident Response & Playbooks: ringed playbook binder w/ checklist
    case 'incident-response-playbooks':
      return (
        <g id="playbook-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(234,179,8,0.18)" filter="blur(3px)" />
          <path d={`M ${x - 13} ${y - 10} L ${x + 11} ${y - 14} L ${x + 13} ${y + 8} L ${x - 11} ${y + 12} Z`} fill="#b45309" stroke="#78350f" strokeWidth="0.6" />
          <path d={`M ${x - 9} ${y - 8} L ${x + 11} ${y - 11.5} L ${x + 12.5} ${y + 6} L ${x - 7.5} ${y + 9.5} Z`} fill="#f8fafc" />
          <circle cx={x - 11} cy={y - 6} r={1} fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
          <circle cx={x - 10.5} cy={y - 1} r={1} fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
          <circle cx={x - 10} cy={y + 4} r={1} fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
          <path d={`M ${x - 5} ${y - 4} l 1.5 1.5 l 3 -3`} fill="none" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={x} y1={y - 3} x2={x + 8} y2={y - 4.5} stroke="#94a3b8" strokeWidth="0.8" />
          <path d={`M ${x - 5} ${y + 1} l 1.5 1.5 l 3 -3`} fill="none" stroke="#22c55e" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={x} y1={y + 2} x2={x + 8} y2={y + 0.5} stroke="#94a3b8" strokeWidth="0.8" />
        </g>
      );

    // C3 — Security Hardening: fortified brick firewall + flame
    case 'security-hardening':
      return (
        <g id="firewall-wall-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(239,68,68,0.2)" filter="blur(3px)" />
          <path d={`M ${x - 14} ${y - 6} L ${x + 14} ${y - 6} L ${x + 14} ${y + 10} L ${x - 14} ${y + 10} Z`} fill="#b91c1c" stroke="#7f1d1d" strokeWidth="0.6" />
          <line x1={x - 14} y1={y - 1} x2={x + 14} y2={y - 1} stroke="#7f1d1d" strokeWidth="0.6" />
          <line x1={x - 14} y1={y + 4} x2={x + 14} y2={y + 4} stroke="#7f1d1d" strokeWidth="0.6" />
          <line x1={x - 7} y1={y - 6} x2={x - 7} y2={y - 1} stroke="#7f1d1d" strokeWidth="0.5" />
          <line x1={x} y1={y - 6} x2={x} y2={y - 1} stroke="#7f1d1d" strokeWidth="0.5" />
          <line x1={x + 7} y1={y - 6} x2={x + 7} y2={y - 1} stroke="#7f1d1d" strokeWidth="0.5" />
          <line x1={x - 10.5} y1={y - 1} x2={x - 10.5} y2={y + 4} stroke="#7f1d1d" strokeWidth="0.5" />
          <line x1={x - 3.5} y1={y - 1} x2={x - 3.5} y2={y + 4} stroke="#7f1d1d" strokeWidth="0.5" />
          <line x1={x + 3.5} y1={y - 1} x2={x + 3.5} y2={y + 4} stroke="#7f1d1d" strokeWidth="0.5" />
          <line x1={x + 10.5} y1={y - 1} x2={x + 10.5} y2={y + 4} stroke="#7f1d1d" strokeWidth="0.5" />
          <line x1={x - 10.5} y1={y + 4} x2={x - 10.5} y2={y + 10} stroke="#7f1d1d" strokeWidth="0.5" />
          <line x1={x - 3.5} y1={y + 4} x2={x - 3.5} y2={y + 10} stroke="#7f1d1d" strokeWidth="0.5" />
          <line x1={x + 3.5} y1={y + 4} x2={x + 3.5} y2={y + 10} stroke="#7f1d1d" strokeWidth="0.5" />
          <line x1={x + 10.5} y1={y + 4} x2={x + 10.5} y2={y + 10} stroke="#7f1d1d" strokeWidth="0.5" />
          <path d={`M ${x} ${y - 18} C ${x + 5} ${y - 12} ${x + 4} ${y - 8} ${x} ${y - 7} C ${x - 4} ${y - 8} ${x - 5} ${y - 12} ${x} ${y - 18} Z`} fill="#f97316" filter="drop-shadow(0 0 3px #f97316)" />
          <path d={`M ${x} ${y - 14} C ${x + 2.5} ${y - 11} ${x + 2} ${y - 9} ${x} ${y - 8} C ${x - 2} ${y - 9} ${x - 2.5} ${y - 11} ${x} ${y - 14} Z`} fill="#fbbf24" />
        </g>
      );

    // C5 — Protecting Organizational Assets: bank vault / safe door
    case 'protecting-assets':
      return (
        <g id="vault-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(148,163,184,0.2)" filter="blur(3px)" />
          <rect x={x - 15} y={y - 14} width={30} height={28} rx={2} fill="#334155" stroke="#1e293b" strokeWidth="1" />
          <rect x={x - 11} y={y - 10} width={22} height={20} rx={1.5} fill="#475569" stroke="#64748b" strokeWidth="0.6" />
          <circle cx={x - 1} cy={y} r={5} fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
          <circle cx={x - 1} cy={y} r={1.5} fill="#cbd5e1" />
          <line x1={x - 1} y1={y} x2={x - 1} y2={y - 4} stroke="#cbd5e1" strokeWidth="1" />
          <line x1={x + 7} y1={y - 4} x2={x + 7} y2={y + 4} stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx={x - 8} cy={y - 7} r={0.8} fill="#94a3b8" />
          <circle cx={x + 8} cy={y - 7} r={0.8} fill="#94a3b8" />
          <circle cx={x - 8} cy={y + 7} r={0.8} fill="#94a3b8" />
          <circle cx={x + 8} cy={y + 7} r={0.8} fill="#94a3b8" />
        </g>
      );

    // C5 — Vulnerabilities in Systems: cracked screen + magnifier on a bug
    case 'vulnerabilities-systems':
      return (
        <g id="cracked-screen-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(239,68,68,0.18)" filter="blur(3px)" />
          <rect x={x - 16} y={y - 14} width={32} height={24} rx={2} fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <path d={`M ${x - 7} ${y + 10} L ${x + 7} ${y + 10} L ${x + 10} ${y + 15} L ${x - 10} ${y + 15} Z`} fill="#334155" />
          <rect x={x - 13} y={y - 11} width={26} height={18} fill="#0b1220" />
          <path d={`M ${x - 2} ${y - 11} L ${x + 1} ${y - 4} L ${x - 3} ${y + 1} L ${x + 2} ${y + 7}`} stroke="#ef4444" strokeWidth="0.8" fill="none" />
          <path d={`M ${x + 1} ${y - 4} L ${x + 7} ${y - 6} M ${x - 3} ${y + 1} L ${x - 9} ${y - 1} M ${x + 1} ${y - 4} L ${x + 6} ${y + 3}`} stroke="#ef4444" strokeWidth="0.6" fill="none" />
          <ellipse cx={x + 4} cy={y + 1} rx={2.4} ry={3} fill="#f87171" />
          <line x1={x + 4} y1={y - 2} x2={x + 4} y2={y + 4} stroke="#7f1d1d" strokeWidth="0.4" />
          <path d={`M ${x + 1.6} ${y - 1} l -2 -1 M ${x + 1.6} ${y + 1} l -2 0 M ${x + 6.4} ${y - 1} l 2 -1 M ${x + 6.4} ${y + 1} l 2 0`} stroke="#7f1d1d" strokeWidth="0.4" />
          <circle cx={x + 3} cy={y} r={7} fill="none" stroke="#e2e8f0" strokeWidth="1.5" opacity="0.9" />
          <line x1={x + 8} y1={y + 5} x2={x + 13} y2={y + 10} stroke="#e2e8f0" strokeWidth="2" strokeLinecap="round" />
        </g>
      );

    // C6 — Intro to Detection & IR: radar screen with sweep + blip
    case 'detection-incident-response':
      return (
        <g id="radar-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(34,197,94,0.18)" filter="blur(3px)" />
          <circle cx={x} cy={y - 1} r={14} fill="#04240f" stroke="#22c55e" strokeWidth="1.2" />
          <circle cx={x} cy={y - 1} r={9} fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.5" />
          <circle cx={x} cy={y - 1} r={4.5} fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.5" />
          <line x1={x - 14} y1={y - 1} x2={x + 14} y2={y - 1} stroke="#22c55e" strokeWidth="0.4" opacity="0.4" />
          <line x1={x} y1={y - 15} x2={x} y2={y + 13} stroke="#22c55e" strokeWidth="0.4" opacity="0.4" />
          <path d={`M ${x} ${y - 1} L ${x} ${y - 15} A 14 14 0 0 1 ${x + 12} ${y + 6} Z`} fill="#22c55e" opacity="0.25" />
          <circle cx={x + 6} cy={y - 6} r={1.6} fill="#9fef00" filter="drop-shadow(0 0 3px #9fef00)" className="animate-pulse" />
        </g>
      );

    // C6 — Network Monitoring: packet-analyzer waveform monitor
    case 'network-monitoring':
      return (
        <g id="waveform-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={7} fill="rgba(56,189,248,0.18)" filter="blur(3px)" />
          <rect x={x - 17} y={y - 13} width={34} height={22} rx={2} fill="#0b1220" stroke="#38bdf8" strokeWidth="1.2" />
          <path d={`M ${x - 6} ${y + 9} L ${x + 6} ${y + 9} L ${x + 9} ${y + 15} L ${x - 9} ${y + 15} Z`} fill="#334155" />
          <line x1={x - 14} y1={y - 2} x2={x + 14} y2={y - 2} stroke="#1e3a5f" strokeWidth="0.5" />
          <path d={`M ${x - 14} ${y - 2} L ${x - 11} ${y - 2} L ${x - 9} ${y - 8} L ${x - 7} ${y + 4} L ${x - 5} ${y - 2} L ${x - 2} ${y - 2} L ${x} ${y - 9} L ${x + 2} ${y + 5} L ${x + 4} ${y - 2} L ${x + 7} ${y - 2} L ${x + 9} ${y - 6} L ${x + 11} ${y + 2} L ${x + 14} ${y - 2}`} fill="none" stroke="#9fef00" strokeWidth="1.2" filter="drop-shadow(0 0 2px #9fef00)" />
        </g>
      );

    // C6 — Incident Investigation: magnifier over log lines (detective)
    case 'incident-investigation':
      return (
        <g id="investigation-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(251,191,36,0.16)" filter="blur(3px)" />
          <path d={`M ${x - 13} ${y - 14} L ${x + 9} ${y - 14} L ${x + 13} ${y - 10} L ${x + 13} ${y + 12} L ${x - 13} ${y + 12} Z`} fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6" />
          <path d={`M ${x + 9} ${y - 14} L ${x + 9} ${y - 10} L ${x + 13} ${y - 10}`} fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="0.4" />
          <line x1={x - 10} y1={y - 8} x2={x + 8} y2={y - 8} stroke="#94a3b8" strokeWidth="0.8" />
          <line x1={x - 10} y1={y - 4} x2={x + 6} y2={y - 4} stroke="#94a3b8" strokeWidth="0.8" />
          <line x1={x - 10} y1={y} x2={x + 8} y2={y} stroke="#22c55e" strokeWidth="0.8" />
          <line x1={x - 10} y1={y + 4} x2={x + 4} y2={y + 4} stroke="#94a3b8" strokeWidth="0.8" />
          <line x1={x - 10} y1={y + 8} x2={x + 7} y2={y + 8} stroke="#94a3b8" strokeWidth="0.8" />
          <circle cx={x + 3} cy={y + 2} r={7} fill="rgba(56,189,248,0.15)" stroke="#0ea5e9" strokeWidth="1.5" />
          <line x1={x + 8} y1={y + 7} x2={x + 13} y2={y + 12} stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
        </g>
      );

    // C6 — IDS & SIEM Tools: recolored (blue/teal) layered detection stack
    case 'ids-siem-tools': {
      const layers = [
        { dy: 4, color: '#0ea5e9', border: '#38bdf8' },
        { dy: -4, color: '#06b6d4', border: '#22d3ee' },
        { dy: -12, color: '#14b8a6', border: '#2dd4bf' },
        { dy: -20, color: '#22c55e', border: '#4ade80' }
      ];
      return (
        <g id="ids-stack-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={7} fill="rgba(14,165,233,0.16)" filter="blur(4px)" />
          {layers.map((layer, idx) => {
            const h = layer.dy, w = 16, dh = 8, t = 2.5;
            return (
              <g key={idx}>
                <path d={`M ${x - w} ${y + h + dh} L ${x} ${y + h + dh * 2} L ${x} ${y + h + dh * 2 + t} L ${x - w} ${y + h + dh + t} Z`} fill={layer.color} opacity="0.8" />
                <path d={`M ${x} ${y + h + dh * 2} L ${x + w} ${y + h + dh} L ${x + w} ${y + h + dh + t} L ${x} ${y + h + dh * 2 + t} Z`} fill={layer.color} opacity="0.8" />
                <path d={`M ${x} ${y + h} L ${x + w} ${y + h + dh} L ${x} ${y + h + dh * 2} L ${x - w} ${y + h + dh} Z`} fill={layer.color} stroke={layer.border} strokeWidth="0.8" opacity="0.7" />
              </g>
            );
          })}
          <ellipse cx={x} cy={y - 14} rx={4} ry={2.4} fill="#0b1220" stroke="#4ade80" strokeWidth="0.6" />
          <circle cx={x} cy={y - 14} r={1.1} fill="#4ade80" />
        </g>
      );
    }

    // C7 — Introduction to Python: </> code brackets in Python colors
    case 'intro-python':
      return (
        <g id="python-lang-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(59,130,246,0.18)" filter="blur(3px)" />
          <rect x={x - 16} y={y - 13} width={32} height={24} rx={2} fill="#0b1220" stroke="#3b82f6" strokeWidth="1.2" />
          <path d={`M ${x - 6} ${y - 6} L ${x - 12} ${y} L ${x - 6} ${y + 6}`} fill="none" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M ${x + 6} ${y - 6} L ${x + 12} ${y} L ${x + 6} ${y + 6}`} fill="none" stroke="#fbbf24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <line x1={x + 2} y1={y - 7} x2={x - 2} y2={y + 7} stroke="#9fef00" strokeWidth="1.4" strokeLinecap="round" />
        </g>
      );

    // C7 — Write Effective Python Code: gear + code block
    case 'effective-python':
      return (
        <g id="gear-code-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(148,163,184,0.18)" filter="blur(3px)" />
          <rect x={x - 15} y={y - 10} width={26} height={22} rx={2} fill="#0b1220" stroke="#64748b" strokeWidth="1" />
          <line x1={x - 11} y1={y - 5} x2={x - 1} y2={y - 5} stroke="#9fef00" strokeWidth="1" />
          <line x1={x - 11} y1={y - 1} x2={x + 3} y2={y - 1} stroke="#38bdf8" strokeWidth="1" />
          <line x1={x - 11} y1={y + 3} x2={x - 3} y2={y + 3} stroke="#94a3b8" strokeWidth="1" />
          <line x1={x - 11} y1={y + 7} x2={x} y2={y + 7} stroke="#94a3b8" strokeWidth="1" />
          <g transform={`translate(${x + 9}, ${y - 11})`}>
            <circle r={5.5} fill="#94a3b8" stroke="#475569" strokeWidth="0.6" />
            <circle r={2.2} fill="#0b1220" />
            {[0, 45, 90, 135].map((deg, i) => (<rect key={i} x={-1} y={-7} width={2} height={3} fill="#94a3b8" transform={`rotate(${deg})`} />))}
          </g>
        </g>
      );

    // C7 — Data Structures & Algorithms: branching node tree
    case 'data-structures-algorithms':
      return (
        <g id="tree-nodes-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(168,85,247,0.18)" filter="blur(3px)" />
          <line x1={x} y1={y - 10} x2={x - 9} y2={y + 2} stroke="#c084fc" strokeWidth="1" />
          <line x1={x} y1={y - 10} x2={x + 9} y2={y + 2} stroke="#c084fc" strokeWidth="1" />
          <line x1={x - 9} y1={y + 2} x2={x - 13} y2={y + 11} stroke="#c084fc" strokeWidth="1" />
          <line x1={x - 9} y1={y + 2} x2={x - 4} y2={y + 11} stroke="#c084fc" strokeWidth="1" />
          <line x1={x + 9} y1={y + 2} x2={x + 13} y2={y + 11} stroke="#c084fc" strokeWidth="1" />
          <circle cx={x} cy={y - 10} r={4} fill="#a855f7" stroke="#e9d5ff" strokeWidth="0.8" />
          <circle cx={x - 9} cy={y + 2} r={3.4} fill="#8b5cf6" stroke="#e9d5ff" strokeWidth="0.6" />
          <circle cx={x + 9} cy={y + 2} r={3.4} fill="#8b5cf6" stroke="#e9d5ff" strokeWidth="0.6" />
          <circle cx={x - 13} cy={y + 11} r={2.8} fill="#7c3aed" stroke="#e9d5ff" strokeWidth="0.5" />
          <circle cx={x - 4} cy={y + 11} r={2.8} fill="#7c3aed" stroke="#e9d5ff" strokeWidth="0.5" />
          <circle cx={x + 13} cy={y + 11} r={2.8} fill="#7c3aed" stroke="#e9d5ff" strokeWidth="0.5" />
        </g>
      );

    // C7 — Python in Practice: automation robot
    case 'python-practice':
      return (
        <g id="robot-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(34,197,94,0.16)" filter="blur(3px)" />
          <line x1={x} y1={y - 16} x2={x} y2={y - 11} stroke="#94a3b8" strokeWidth="1" />
          <circle cx={x} cy={y - 17} r={1.5} fill="#9fef00" filter="drop-shadow(0 0 2px #9fef00)" />
          <rect x={x - 12} y={y - 11} width={24} height={18} rx={3} fill="#475569" stroke="#94a3b8" strokeWidth="1" />
          <rect x={x - 9} y={y - 8} width={18} height={12} rx={2} fill="#0b1220" />
          <circle cx={x - 4} cy={y - 2} r={2} fill="#38bdf8" filter="drop-shadow(0 0 2px #38bdf8)" />
          <circle cx={x + 4} cy={y - 2} r={2} fill="#38bdf8" filter="drop-shadow(0 0 2px #38bdf8)" />
          <line x1={x - 4} y1={y + 2} x2={x + 4} y2={y + 2} stroke="#22c55e" strokeWidth="1" />
          <rect x={x - 15} y={y - 4} width={3} height={5} rx={1} fill="#334155" />
          <rect x={x + 12} y={y - 4} width={3} height={5} rx={1} fill="#334155" />
          <rect x={x - 6} y={y + 7} width={12} height={5} rx={1} fill="#334155" />
        </g>
      );

    // C8 — Protect Data & Communicate Incidents: shield + chat bubble
    case 'protect-data-communicate':
      return (
        <g id="shield-chat-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(56,189,248,0.18)" filter="blur(3px)" />
          <path d={`M ${x - 4} ${y - 13} L ${x - 16} ${y - 9} L ${x - 16} ${y + 1} C ${x - 16} ${y + 9} ${x - 4} ${y + 14} ${x - 4} ${y + 14} C ${x - 4} ${y + 14} ${x + 8} ${y + 9} ${x + 8} ${y + 1} L ${x + 8} ${y - 9} Z`} fill="url(#shield-grad-left)" stroke="#0369a1" strokeWidth="0.8" />
          <path d={`M ${x - 8} ${y - 2} l 2.5 2.5 l 5 -5`} fill="none" stroke="#f0f9ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <g transform={`translate(${x + 8}, ${y - 11})`}>
            <rect x={-2} y={-4} width={14} height={10} rx={2.5} fill="#9fef00" />
            <path d="M 2 6 L 2 9 L 6 6 Z" fill="#9fef00" />
            <circle cx={2} cy={1} r={1} fill="#0b1220" />
            <circle cx={5} cy={1} r={1} fill="#0b1220" />
            <circle cx={8} cy={1} r={1} fill="#0b1220" />
          </g>
        </g>
      );

    // C8 — Escalate Incidents: upward escalation arrow over ascending steps
    case 'escalate-incidents':
      return (
        <g id="escalation-arrow-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(239,68,68,0.16)" filter="blur(3px)" />
          <path d={`M ${x - 15} ${y + 10} L ${x - 9} ${y + 13} L ${x - 9} ${y + 7} L ${x - 15} ${y + 4} Z`} fill="#334155" stroke="#475569" strokeWidth="0.5" />
          <path d={`M ${x - 6} ${y + 6} L ${x} ${y + 9} L ${x} ${y + 3} L ${x - 6} ${y} Z`} fill="#475569" stroke="#64748b" strokeWidth="0.5" />
          <path d={`M ${x + 3} ${y + 2} L ${x + 9} ${y + 5} L ${x + 9} ${y - 1} L ${x + 3} ${y - 4} Z`} fill="#64748b" stroke="#94a3b8" strokeWidth="0.5" />
          <path d={`M ${x} ${y - 15} L ${x + 8} ${y - 5} L ${x + 3} ${y - 5} L ${x + 3} ${y + 4} L ${x - 3} ${y + 4} L ${x - 3} ${y - 5} L ${x - 8} ${y - 5} Z`} fill="#ef4444" stroke="#fca5a5" strokeWidth="0.6" filter="drop-shadow(0 0 3px rgba(239,68,68,0.7))" />
        </g>
      );

    // C8 — Communicate to Stakeholders: presentation board with chart
    case 'communicate-stakeholders':
      return (
        <g id="presentation-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(251,191,36,0.16)" filter="blur(3px)" />
          <line x1={x - 8} y1={y + 8} x2={x - 12} y2={y + 15} stroke="#78350f" strokeWidth="1.5" />
          <line x1={x + 8} y1={y + 8} x2={x + 12} y2={y + 15} stroke="#78350f" strokeWidth="1.5" />
          <rect x={x - 15} y={y - 14} width={30} height={22} rx={1.5} fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
          <rect x={x - 10} y={y - 2} width={3.5} height={7} fill="#38bdf8" />
          <rect x={x - 4} y={y - 6} width={3.5} height={11} fill="#22c55e" />
          <rect x={x + 2} y={y - 9} width={3.5} height={14} fill="#9fef00" />
          <path d={`M ${x - 10} ${y - 8} L ${x + 9} ${y - 12}`} stroke="#ef4444" strokeWidth="1" fill="none" />
          <path d={`M ${x + 6} ${y - 12.5} L ${x + 9} ${y - 12} L ${x + 7.5} ${y - 9.5}`} fill="none" stroke="#ef4444" strokeWidth="1" />
        </g>
      );

    // C8 — Engage with the Community: group of people
    case 'engage-community':
      return (
        <g id="community-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(56,189,248,0.16)" filter="blur(3px)" />
          <circle cx={x} cy={y - 9} r={4} fill="#9fef00" />
          <path d={`M ${x - 6} ${y + 4} C ${x - 6} ${y - 3} ${x + 6} ${y - 3} ${x + 6} ${y + 4} Z`} fill="#9fef00" />
          <circle cx={x - 11} cy={y - 4} r={3.5} fill="#38bdf8" />
          <path d={`M ${x - 16} ${y + 8} C ${x - 16} ${y + 1} ${x - 6} ${y + 1} ${x - 6} ${y + 8} Z`} fill="#38bdf8" />
          <circle cx={x + 11} cy={y - 4} r={3.5} fill="#a855f7" />
          <path d={`M ${x + 6} ${y + 8} C ${x + 6} ${y + 1} ${x + 16} ${y + 1} ${x + 16} ${y + 8} Z`} fill="#a855f7" />
        </g>
      );

    // C8 — Utilize AI: AI chip with neural network
    case 'utilize-ai':
      return (
        <g id="ai-brain-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(168,85,247,0.18)" filter="blur(3px)" />
          <rect x={x - 12} y={y - 11} width={24} height={22} rx={2} fill="#1e293b" stroke="#a855f7" strokeWidth="1.2" />
          {[-6, 0, 6].map((o, i) => (<line key={`t${i}`} x1={x + o} y1={y - 14} x2={x + o} y2={y - 11} stroke="#a855f7" strokeWidth="1" />))}
          {[-6, 0, 6].map((o, i) => (<line key={`b${i}`} x1={x + o} y1={y + 11} x2={x + o} y2={y + 14} stroke="#a855f7" strokeWidth="1" />))}
          {[-4, 2].map((o, i) => (<line key={`l${i}`} x1={x - 15} y1={y + o} x2={x - 12} y2={y + o} stroke="#a855f7" strokeWidth="1" />))}
          {[-4, 2].map((o, i) => (<line key={`r${i}`} x1={x + 12} y1={y + o} x2={x + 15} y2={y + o} stroke="#a855f7" strokeWidth="1" />))}
          <path d={`M ${x - 5} ${y - 4} L ${x} ${y + 1} L ${x + 5} ${y - 5} M ${x} ${y + 1} L ${x - 5} ${y + 6} M ${x} ${y + 1} L ${x + 5} ${y + 5}`} stroke="#a855f7" strokeWidth="0.6" fill="none" opacity="0.8" />
          <circle cx={x - 5} cy={y - 4} r={1.6} fill="#c084fc" />
          <circle cx={x + 5} cy={y - 5} r={1.6} fill="#c084fc" />
          <circle cx={x} cy={y + 1} r={1.8} fill="#e9d5ff" />
          <circle cx={x - 5} cy={y + 6} r={1.6} fill="#c084fc" />
          <circle cx={x + 5} cy={y + 5} r={1.6} fill="#c084fc" />
        </g>
      );

    // All Google Mystery Chests (C1–C8): the treasure chest icon
    case 'mystery-chest-gc1':
    case 'mystery-chest-gc2':
    case 'mystery-chest-gc3':
    case 'mystery-chest-gc4':
    case 'mystery-chest-gc5':
    case 'mystery-chest-gc6':
    case 'mystery-chest-gc7':
    case 'mystery-chest-gc8':
      return (
        <g id="mystery-chest-scene">
          <ellipse cx={x} cy={y + 18} rx={22} ry={8} fill="rgba(234, 179, 8, 0.18)" filter="blur(4px)" />
          <path d={`M ${x - 15} ${y + 5} L ${x} ${y + 13} L ${x} ${y + 23} L ${x - 15} ${y + 15} Z`} fill="url(#chest-body-left)" stroke="#1e293b" strokeWidth="0.5" />
          <path d={`M ${x} ${y + 13} L ${x + 15} ${y + 5} L ${x + 15} ${y + 15} L ${x} ${y + 23} Z`} fill="url(#chest-body-right)" stroke="#0f172a" strokeWidth="0.5" />
          <path d={`M ${x - 15} ${y + 5} L ${x} ${y - 3} L ${x} ${y + 13} L ${x - 15} ${y + 5} Z`} fill="url(#chest-lid-left)" stroke="#1e293b" strokeWidth="0.5" />
          <path d={`M ${x} ${y - 3} L ${x + 15} ${y + 5} L ${x + 15} ${y + 15} L ${x} ${y + 13} Z`} fill="url(#chest-lid-right)" stroke="#0f172a" strokeWidth="0.5" />
          <path d={`M ${x - 12} ${y + 3.5} L ${x - 12} ${y + 13.5}`} stroke="#06b6d4" strokeWidth="1" filter="drop-shadow(0 0 2px #06b6d4)" />
          <path d={`M ${x + 12} ${y + 3.5} L ${x + 12} ${y + 13.5}`} stroke="#06b6d4" strokeWidth="1" filter="drop-shadow(0 0 2px #06b6d4)" />
          <path d={`M ${x - 2.5} ${y + 9} L ${x + 2.5} ${y + 9} L ${x + 1.5} ${y + 16} L ${x - 1.5} ${y + 16} Z`} fill="url(#sword-hilt-grad)" stroke="#78350f" strokeWidth="0.5" />
          <circle cx={x} cy={y + 12.5} r={1.2} fill="#111827" />
          <path d={`M ${x - 14.5} ${y + 5} L ${x} ${y + 13} L ${x + 14.5} ${y + 5}`} fill="none" stroke="#eab308" strokeWidth="1.2" opacity="0.85" filter="drop-shadow(0 0 3px #eab308)" />
        </g>
      );

    case 'cia-prism':
      return (
        <g id="cia-prism-scene">
          <ellipse cx={x} cy={y + 17} rx={18} ry={7} fill="rgba(66, 133, 244, 0.2)" filter="blur(3px)" />
          {/* Base */}
          <polygon points={`${x},${y+15} ${x-12},${y+8} ${x+12},${y+8}`} fill="#1e293b" />
          {/* Left Face (Blue) */}
          <polygon points={`${x},${y-12} ${x-12},${y+8} ${x},${y+15}`} fill="#4285F4" stroke="#1e3a8a" strokeWidth="0.5" />
          {/* Right Face (Red) */}
          <polygon points={`${x},${y-12} ${x+12},${y+8} ${x},${y+15}`} fill="#EA4335" stroke="#7f1d1d" strokeWidth="0.5" />
          {/* Back Face (Yellow) */}
          <polygon points={`${x},${y-12} ${x-12},${y+8} ${x+12},${y+8}`} fill="#FBBC05" stroke="#78350f" strokeWidth="0.5" opacity="0.3" />
          {/* Edges */}
          <line x1={x} y1={y-12} x2={x} y2={y+15} stroke="#ffffff" strokeWidth="1" opacity="0.5" />
        </g>
      );

    case 'warning-shield-skull':
      return (
        <g id="warning-shield-scene">
          <ellipse cx={x} cy={y + 17} rx={18} ry={7} fill="rgba(234, 67, 53, 0.2)" filter="blur(3px)" />
          {/* Base */}
          <path d={`M ${x - 5} ${y + 14} L ${x + 5} ${y + 14} L ${x} ${y + 5} Z`} fill="#1e293b" />
          {/* Shield Body */}
          <path d={`M ${x} ${y - 14} C ${x - 16} ${y - 14} ${x - 18} ${y + 2} ${x} ${y + 16} Z`} fill="#EA4335" stroke="#7f1d1d" strokeWidth="0.5" />
          <path d={`M ${x} ${y - 14} C ${x + 16} ${y - 14} ${x + 18} ${y + 2} ${x} ${y + 16} Z`} fill="#b91c1c" stroke="#7f1d1d" strokeWidth="0.5" />
          {/* Skull Icon Outline */}
          <circle cx={x} cy={y - 2} r={4} fill="#f8fafc" />
          <path d={`M ${x - 2} ${y + 1} L ${x + 2} ${y + 1} L ${x + 1.5} ${y + 4} L ${x - 1.5} ${y + 4} Z`} fill="#f8fafc" />
          {/* Skull Eyes */}
          <circle cx={x - 1.5} cy={y - 2} r={1.2} fill="#7f1d1d" />
          <circle cx={x + 1.5} cy={y - 2} r={1.2} fill="#7f1d1d" />
          {/* Skull Nose */}
          <path d={`M ${x} ${y - 0.5} L ${x - 0.5} ${y + 1} L ${x + 0.5} ${y + 1} Z`} fill="#7f1d1d" />
        </g>
      );

    case 'scales-of-justice':
      return (
        <g id="scales-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={8} fill="rgba(251, 188, 5, 0.2)" filter="blur(3px)" />
          {/* Document Base */}
          <path d={`M ${x - 12} ${y + 8} L ${x + 4} ${y + 2} L ${x + 16} ${y + 8} L ${x} ${y + 14} Z`} fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
          <line x1={x - 8} y1={y + 8} x2={x + 2} y2={y + 5} stroke="#cbd5e1" strokeWidth="0.5" />
          <line x1={x - 6} y1={y + 10} x2={x + 4} y2={y + 7} stroke="#cbd5e1" strokeWidth="0.5" />
          {/* Base Platform */}
          <path d={`M ${x - 6} ${y + 12} L ${x + 6} ${y + 12} L ${x + 4} ${y + 8} L ${x - 4} ${y + 8} Z`} fill="#b45309" />
          <path d={`M ${x - 6} ${y + 12} L ${x - 4} ${y + 8} L ${x} ${y + 10} Z`} fill="#78350f" />
          {/* Center Pillar */}
          <rect x={x - 1.5} y={y - 12} width={3} height={20} fill="#f59e0b" stroke="#b45309" strokeWidth="0.5" />
          {/* Crossbeam */}
          <path d={`M ${x - 14} ${y - 12} L ${x + 14} ${y - 12} L ${x + 14} ${y - 10} L ${x - 14} ${y - 10} Z`} fill="#fbbf24" stroke="#b45309" strokeWidth="0.5" />
          {/* Left scale */}
          <line x1={x - 12} y1={y - 10} x2={x - 16} y2={y - 2} stroke="#94a3b8" strokeWidth="0.5" />
          <line x1={x - 12} y1={y - 10} x2={x - 8} y2={y - 2} stroke="#94a3b8" strokeWidth="0.5" />
          <path d={`M ${x - 18} ${y - 2} L ${x - 6} ${y - 2} L ${x - 12} ${y + 1} Z`} fill="#f59e0b" stroke="#b45309" strokeWidth="0.5" />
          {/* Right scale */}
          <line x1={x + 12} y1={y - 10} x2={x + 8} y2={y + 2} stroke="#94a3b8" strokeWidth="0.5" />
          <line x1={x + 12} y1={y - 10} x2={x + 16} y2={y + 2} stroke="#94a3b8" strokeWidth="0.5" />
          <path d={`M ${x + 6} ${y + 2} L ${x + 18} ${y + 2} L ${x + 12} ${y + 5} Z`} fill="#f59e0b" stroke="#b45309" strokeWidth="0.5" />
        </g>
      );

    case 'open-book-magnifier':
      return (
        <g id="book-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(56, 189, 248, 0.2)" filter="blur(3px)" />
          {/* Book Cover */}
          <path d={`M ${x - 16} ${y + 2} L ${x} ${y + 12} L ${x + 16} ${y + 2} L ${x} ${y + 14} Z`} fill="#1e3a8a" />
          <path d={`M ${x - 16} ${y + 2} L ${x} ${y + 12} L ${x - 2} ${y + 14} L ${x - 18} ${y + 4} Z`} fill="#1e40af" />
          <path d={`M ${x + 16} ${y + 2} L ${x} ${y + 12} L ${x + 2} ${y + 14} L ${x + 18} ${y + 4} Z`} fill="#1d4ed8" />
          {/* Pages Left */}
          <path d={`M ${x - 15} ${y + 1} L ${x} ${y + 10} L ${x} ${y + 8} C ${x - 8} ${y + 4} ${x - 12} ${y + 1} ${x - 15} ${y - 1} Z`} fill="#f8fafc" />
          <path d={`M ${x - 15} ${y + 1} L ${x} ${y + 10} L ${x - 1} ${y + 12} L ${x - 16} ${y + 3} Z`} fill="#e2e8f0" />
          {/* Pages Right */}
          <path d={`M ${x + 15} ${y + 1} L ${x} ${y + 10} L ${x} ${y + 8} C ${x + 8} ${y + 4} ${x + 12} ${y + 1} ${x + 15} ${y - 1} Z`} fill="#f1f5f9" />
          <path d={`M ${x + 15} ${y + 1} L ${x} ${y + 10} L ${x + 1} ${y + 12} L ${x + 16} ${y + 3} Z`} fill="#cbd5e1" />
          {/* Text Lines Left */}
          <line x1={x - 12} y1={y + 2} x2={x - 4} y2={y + 6} stroke="#94a3b8" strokeWidth="0.6" />
          <line x1={x - 10} y1={y + 4} x2={x - 2} y2={y + 8} stroke="#94a3b8" strokeWidth="0.6" />
          {/* Text Lines Right */}
          <line x1={x + 12} y1={y + 2} x2={x + 4} y2={y + 6} stroke="#94a3b8" strokeWidth="0.6" />
          <line x1={x + 10} y1={y + 4} x2={x + 2} y2={y + 8} stroke="#94a3b8" strokeWidth="0.6" />
          {/* Magnifying Glass */}
          <g transform={`translate(${x + 4}, ${y - 4})`}>
            <line x1={0} y1={0} x2={-6} y2={8} stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            <circle cx={0} cy={0} r={5} fill="rgba(56, 189, 248, 0.4)" stroke="#e2e8f0" strokeWidth="1.5" />
            <path d={`M -3 -2 Q 0 -4 3 -2`} fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          </g>
        </g>
      );

    case 'attack-tactics':
    case 'offensive-security-intro':
      return (
        <g id="sword-scene">
          <ellipse cx={x} cy={y + 17} rx={16} ry={7} fill="rgba(239, 68, 68, 0.25)" filter="blur(3px)" />
          <polygon points={`${x},${y + 17} ${x - 4.5},${y - 6} ${x},${y - 8}`} fill="url(#sword-blade-left)" />
          <polygon points={`${x},${y + 17} ${x + 4.5},${y - 6} ${x},${y - 8}`} fill="url(#sword-blade-right)" />
          <line 
            x1={x} y1={y + 12} x2={x} y2={y - 5} 
            stroke="#ef4444" strokeWidth="1" 
            strokeLinecap="round" 
            filter="drop-shadow(0 0 3px rgba(239,68,68,0.9))"
            className="animate-pulse"
          />
          <path 
            d={`M ${x - 12} ${y - 10} L ${x + 12} ${y - 10} L ${x + 9} ${y - 6} L ${x - 9} ${y - 6} Z`} 
            fill="url(#sword-hilt-grad)" 
            stroke="#7f1d1d" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x - 2} ${y - 10} L ${x + 2} ${y - 10} L ${x + 1.5} ${y - 21} L ${x - 1.5} ${y - 21} Z`} 
            fill="#450a0a" 
            stroke="#ef4444" 
            strokeWidth="0.5"
          />
          <circle cx={x} cy={y - 23} r={3} fill="url(#sword-pommel-grad)" stroke="#f87171" strokeWidth="0.5" />
        </g>
      );

    case 'defensive-security-intro':
      return (
        <g id="shield-scene">
          <ellipse cx={x} cy={y + 17} rx={18} ry={7} fill="rgba(56, 189, 248, 0.2)" filter="blur(3px)" />
          <path d={`M ${x - 5} ${y + 14} L ${x + 5} ${y + 14} L ${x} ${y + 5} Z`} fill="#1e293b" />
          <path 
            d={`M ${x} ${y - 12} C ${x - 15} ${y - 12} ${x - 17} ${y + 2} ${x} ${y + 15} Z`} 
            fill="url(#shield-grad-left)" 
            stroke="#0284c7" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x} ${y - 12} C ${x + 15} ${y - 12} ${x + 17} ${y + 2} ${x} ${y + 15} Z`} 
            fill="url(#shield-grad-right)" 
            stroke="#0369a1" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x} ${y - 12} C ${x - 13} ${y - 12} ${x - 15} ${y + 1} ${x} ${y + 13} C ${x + 15} ${y + 1} ${x + 13} ${y - 12} ${x} ${y - 12}`} 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="1.2" 
            opacity="0.8"
          />
          <path 
            d={`M ${x - 4} ${y + 1} L ${x - 1} ${y + 4} L ${x + 5} ${y - 3}`} 
            fill="none" 
            stroke="#38bdf8" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="drop-shadow(0 0 3px rgba(56,189,248,0.9))"
          />
        </g>
      );

    case 'frameworks-controls-audits':
    case 'careers-in-cyber':
      return (
        <g id="clipboard-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={7} fill="rgba(120, 53, 15, 0.15)" filter="blur(4px)" />
          {/* Clipboard Board */}
          <path d={`M ${x - 10} ${y + 10} L ${x + 10} ${y - 1} L ${x + 16} ${y + 3} L ${x - 4} ${y + 14} Z`} fill="#78350f" stroke="#451a03" strokeWidth="0.5" />
          <path d={`M ${x - 10} ${y + 10} L ${x - 4} ${y + 14} L ${x - 4} ${y + 16} L ${x - 10} ${y + 12} Z`} fill="#451a03" />
          <path d={`M ${x - 4} ${y + 14} L ${x + 16} ${y + 3} L ${x + 16} ${y + 5} L ${x - 4} ${y + 16} Z`} fill="#290f01" />
          
          {/* Paper / Resume */}
          <path d={`M ${x - 8} ${y + 8} L ${x + 10} ${y - 1} L ${x + 14} ${y + 2} L ${x - 4} ${y + 11} Z`} fill="#f8fafc" />
          {/* Resume Lines */}
          <line x1={x - 4} y1={y + 5} x2={x + 4} y2={y + 1} stroke="#cbd5e1" strokeWidth="0.8" />
          <line x1={x - 2} y1={y + 7} x2={x + 6} y2={y + 3} stroke="#cbd5e1" strokeWidth="0.8" />
          <line x1={x + 1} y1={y + 9} x2={x + 7} y2={y + 6} stroke="#cbd5e1" strokeWidth="0.8" />
          {/* Profile pic box */}
          <path d={`M ${x + 8} ${y - 0.5} L ${x + 12} ${y + 2} L ${x + 10} ${y + 3} L ${x + 6} ${y + 0.5} Z`} fill="#94a3b8" />

          {/* Clipboard Clip */}
          <path d={`M ${x} ${y - 2} L ${x + 6} ${y - 5} L ${x + 8} ${y - 4} L ${x + 2} ${y - 1} Z`} fill="#94a3b8" />
          <path d={`M ${x} ${y - 2} L ${x + 2} ${y - 1} L ${x + 2} ${y + 1} L ${x} ${y} Z`} fill="#64748b" />
          <path d={`M ${x + 2} ${y - 1} L ${x + 8} ${y - 4} L ${x + 8} ${y - 2} L ${x + 2} ${y + 1} Z`} fill="#475569" />

          {/* Reading Glasses */}
          <g transform="translate(0, 5)">
            <ellipse cx={x - 1} cy={y + 3} rx={3} ry={1.5} fill="none" stroke="#1e293b" strokeWidth="0.6" transform={`rotate(-25 ${x-1} ${y+3})`} />
            <ellipse cx={x + 4} cy={y} rx={3} ry={1.5} fill="none" stroke="#1e293b" strokeWidth="0.6" transform={`rotate(-25 ${x+4} ${y})`} />
            <path d={`M ${x + 1} ${y + 1.5} Q ${x + 1.5} ${y + 0.5} ${x + 2} ${y + 1}`} fill="none" stroke="#1e293b" strokeWidth="0.6" />
          </g>
        </g>
      );

    case 'core-cyber-foundations':
      return (
        <g id="shield-scene">
          <ellipse cx={x} cy={y + 17} rx={18} ry={7} fill="rgba(56, 189, 248, 0.2)" filter="blur(3px)" />
          <path d={`M ${x - 5} ${y + 14} L ${x + 5} ${y + 14} L ${x} ${y + 5} Z`} fill="#1e293b" />
          <path 
            d={`M ${x} ${y - 12} C ${x - 15} ${y - 12} ${x - 17} ${y + 2} ${x} ${y + 15} Z`} 
            fill="url(#shield-grad-left)" 
            stroke="#0284c7" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x} ${y - 12} C ${x + 15} ${y - 12} ${x + 17} ${y + 2} ${x} ${y + 15} Z`} 
            fill="url(#shield-grad-right)" 
            stroke="#0369a1" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x} ${y - 12} C ${x - 13} ${y - 12} ${x - 15} ${y + 1} ${x} ${y + 13} C ${x + 15} ${y + 1} ${x + 13} ${y - 12} ${x} ${y - 12}`} 
            fill="none" 
            stroke="#e2e8f0" 
            strokeWidth="1.2" 
            opacity="0.8"
          />
          <path 
            d={`M ${x - 4} ${y + 1} L ${x - 1} ${y + 4} L ${x + 5} ${y - 3}`} 
            fill="none" 
            stroke="#38bdf8" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="drop-shadow(0 0 3px rgba(56,189,248,0.9))"
          />
        </g>
      );

    case 'threats-asset-security':
      return (
        <g id="warning-shield-scene">
          <ellipse cx={x} cy={y + 17} rx={18} ry={7} fill="rgba(234, 67, 53, 0.2)" filter="blur(3px)" />
          {/* Base */}
          <path d={`M ${x - 5} ${y + 14} L ${x + 5} ${y + 14} L ${x} ${y + 5} Z`} fill="#1e293b" />
          {/* Shield Body */}
          <path d={`M ${x} ${y - 14} C ${x - 16} ${y - 14} ${x - 18} ${y + 2} ${x} ${y + 16} Z`} fill="#EA4335" stroke="#7f1d1d" strokeWidth="0.5" />
          <path d={`M ${x} ${y - 14} C ${x + 16} ${y - 14} ${x + 18} ${y + 2} ${x} ${y + 16} Z`} fill="#b91c1c" stroke="#7f1d1d" strokeWidth="0.5" />
          {/* Skull Icon Outline */}
          <circle cx={x} cy={y - 2} r={4} fill="#f8fafc" />
          <path d={`M ${x - 2} ${y + 1} L ${x + 2} ${y + 1} L ${x + 1.5} ${y + 4} L ${x - 1.5} ${y + 4} Z`} fill="#f8fafc" />
          {/* Skull Eyes */}
          <circle cx={x - 1.5} cy={y - 2} r={1.2} fill="#7f1d1d" />
          <circle cx={x + 1.5} cy={y - 2} r={1.2} fill="#7f1d1d" />
          {/* Skull Nose */}
          <path d={`M ${x} ${y - 0.5} L ${x - 0.5} ${y + 1} L ${x + 0.5} ${y + 1} Z`} fill="#7f1d1d" />
        </g>
      );

    case 'frameworks-ethics':
      return (
        <g id="scales-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={8} fill="rgba(251, 188, 5, 0.2)" filter="blur(3px)" />
          {/* Document Base */}
          <path d={`M ${x - 12} ${y + 8} L ${x + 4} ${y + 2} L ${x + 16} ${y + 8} L ${x} ${y + 14} Z`} fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.5" />
          <line x1={x - 8} y1={y + 8} x2={x + 2} y2={y + 5} stroke="#cbd5e1" strokeWidth="0.5" />
          <line x1={x - 6} y1={y + 10} x2={x + 4} y2={y + 7} stroke="#cbd5e1" strokeWidth="0.5" />
          {/* Base Platform */}
          <path d={`M ${x - 6} ${y + 12} L ${x + 6} ${y + 12} L ${x + 4} ${y + 8} L ${x - 4} ${y + 8} Z`} fill="#b45309" />
          <path d={`M ${x - 6} ${y + 12} L ${x - 4} ${y + 8} L ${x} ${y + 10} Z`} fill="#78350f" />
          {/* Center Pillar */}
          <rect x={x - 1.5} y={y - 12} width={3} height={20} fill="#f59e0b" stroke="#b45309" strokeWidth="0.5" />
          {/* Crossbeam */}
          <path d={`M ${x - 14} ${y - 12} L ${x + 14} ${y - 12} L ${x + 14} ${y - 10} L ${x - 14} ${y - 10} Z`} fill="#fbbf24" stroke="#b45309" strokeWidth="0.5" />
          {/* Left scale */}
          <line x1={x - 12} y1={y - 10} x2={x - 16} y2={y - 2} stroke="#94a3b8" strokeWidth="0.5" />
          <line x1={x - 12} y1={y - 10} x2={x - 8} y2={y - 2} stroke="#94a3b8" strokeWidth="0.5" />
          <path d={`M ${x - 18} ${y - 2} L ${x - 6} ${y - 2} L ${x - 12} ${y + 1} Z`} fill="#f59e0b" stroke="#b45309" strokeWidth="0.5" />
          {/* Right scale */}
          <line x1={x + 12} y1={y - 10} x2={x + 8} y2={y + 2} stroke="#94a3b8" strokeWidth="0.5" />
          <line x1={x + 12} y1={y - 10} x2={x + 16} y2={y + 2} stroke="#94a3b8" strokeWidth="0.5" />
          <path d={`M ${x + 6} ${y + 2} L ${x + 18} ${y + 2} L ${x + 12} ${y + 5} Z`} fill="#f59e0b" stroke="#b45309" strokeWidth="0.5" />
        </g>
      );

    case 'master-glossary':
      return (
        <g id="book-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(56, 189, 248, 0.2)" filter="blur(3px)" />
          {/* Book Cover */}
          <path d={`M ${x - 16} ${y + 2} L ${x} ${y + 12} L ${x + 16} ${y + 2} L ${x} ${y + 14} Z`} fill="#1e3a8a" />
          <path d={`M ${x - 16} ${y + 2} L ${x} ${y + 12} L ${x - 2} ${y + 14} L ${x - 18} ${y + 4} Z`} fill="#1e40af" />
          <path d={`M ${x + 16} ${y + 2} L ${x} ${y + 12} L ${x + 2} ${y + 14} L ${x + 18} ${y + 4} Z`} fill="#1d4ed8" />
          {/* Pages Left */}
          <path d={`M ${x - 15} ${y + 1} L ${x} ${y + 10} L ${x} ${y + 8} C ${x - 8} ${y + 4} ${x - 12} ${y + 1} ${x - 15} ${y - 1} Z`} fill="#f8fafc" />
          <path d={`M ${x - 15} ${y + 1} L ${x} ${y + 10} L ${x - 1} ${y + 12} L ${x - 16} ${y + 3} Z`} fill="#e2e8f0" />
          {/* Pages Right */}
          <path d={`M ${x + 15} ${y + 1} L ${x} ${y + 10} L ${x} ${y + 8} C ${x + 8} ${y + 4} ${x + 12} ${y + 1} ${x + 15} ${y - 1} Z`} fill="#f1f5f9" />
          <path d={`M ${x + 15} ${y + 1} L ${x} ${y + 10} L ${x + 1} ${y + 12} L ${x + 16} ${y + 3} Z`} fill="#cbd5e1" />
          {/* Text Lines Left */}
          <line x1={x - 12} y1={y + 2} x2={x - 4} y2={y + 6} stroke="#94a3b8" strokeWidth="0.6" />
          <line x1={x - 10} y1={y + 4} x2={x - 2} y2={y + 8} stroke="#94a3b8" strokeWidth="0.6" />
          {/* Text Lines Right */}
          <line x1={x + 12} y1={y + 2} x2={x + 4} y2={y + 6} stroke="#94a3b8" strokeWidth="0.6" />
          <line x1={x + 10} y1={y + 4} x2={x + 2} y2={y + 8} stroke="#94a3b8" strokeWidth="0.6" />
          {/* Magnifying Glass */}
          <g transform={`translate(${x + 4}, ${y - 4})`}>
            <line x1={0} y1={0} x2={-6} y2={8} stroke="#475569" strokeWidth="2" strokeLinecap="round" />
            <circle cx={0} cy={0} r={5} fill="rgba(56, 189, 248, 0.4)" stroke="#e2e8f0" strokeWidth="1.5" />
            <path d={`M -3 -2 Q 0 -4 3 -2`} fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
          </g>
        </g>
      );

    case 'mystery-chest':
    case 'mystery-chest-net':
    case 'mystery-chest-web':
    case 'mystery-chest-comp':

    case 'the-cia-triad':
      return (
        <g id="cia-prism-scene">
          <ellipse cx={x} cy={y + 17} rx={18} ry={7} fill="rgba(66, 133, 244, 0.2)" filter="blur(3px)" />
          {/* Base */}
          <polygon points={`${x},${y+15} ${x-12},${y+8} ${x+12},${y+8}`} fill="#1e293b" />
          {/* Left Face (Blue) */}
          <polygon points={`${x},${y-12} ${x-12},${y+8} ${x},${y+15}`} fill="#4285F4" stroke="#1e3a8a" strokeWidth="0.5" />
          {/* Right Face (Red) */}
          <polygon points={`${x},${y-12} ${x+12},${y+8} ${x},${y+15}`} fill="#EA4335" stroke="#7f1d1d" strokeWidth="0.5" />
          {/* Back Face (Yellow) */}
          <polygon points={`${x},${y-12} ${x-12},${y+8} ${x+12},${y+8}`} fill="#FBBC05" stroke="#78350f" strokeWidth="0.5" opacity="0.3" />
          {/* Edges */}
          <line x1={x} y1={y-12} x2={x} y2={y+15} stroke="#ffffff" strokeWidth="1" opacity="0.5" />
        </g>
      );

    case 'cryptography-concepts':
      return (
        <g id="crypto-laptop-scene">
          <ellipse cx={x} cy={y + 18} rx={22} ry={8} fill="rgba(34, 197, 94, 0.2)" filter="blur(3px)" />
          {/* Laptop Base */}
          <path d={`M ${x - 18} ${y + 12} L ${x + 18} ${y + 12} L ${x + 22} ${y + 16} L ${x - 22} ${y + 16} Z`} fill="#475569" stroke="#1e293b" strokeWidth="0.5" />
          <path d={`M ${x - 22} ${y + 16} L ${x + 22} ${y + 16} L ${x + 22} ${y + 18} L ${x - 22} ${y + 18} Z`} fill="#1e293b" />
          {/* Screen Backing */}
          <path d={`M ${x - 16} ${y + 12} L ${x + 16} ${y + 12} L ${x + 12} ${y - 8} L ${x - 12} ${y - 8} Z`} fill="#334155" stroke="#0f172a" strokeWidth="0.5" />
          {/* Screen Content (Glowing Green Matrix-like) */}
          <path d={`M ${x - 14} ${y + 10} L ${x + 14} ${y + 10} L ${x + 10.5} ${y - 6} L ${x - 10.5} ${y - 6} Z`} fill="#0f172a" stroke="#22c55e" strokeWidth="0.25" />
          <path d={`M ${x - 14} ${y + 10} L ${x + 14} ${y + 10} L ${x + 10.5} ${y - 6} L ${x - 10.5} ${y - 6} Z`} fill="rgba(34, 197, 94, 0.15)" />
          {/* Lock Icon */}
          <rect x={x - 4} y={y - 1} width={8} height={6} rx={1} fill="#fbbf24" stroke="#b45309" strokeWidth="0.5" />
          <path d={`M ${x - 2.5} ${y - 1} C ${x - 2.5} ${y - 5} ${x + 2.5} ${y - 5} ${x + 2.5} ${y - 1}`} fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
        </g>
      );

    case 'become-a-hacker':
      return (
        <g id="hacker-terminal-scene">
          <ellipse cx={x} cy={y + 16} rx={20} ry={8} fill="rgba(239, 68, 68, 0.25)" filter="blur(3px)" />
          {/* CRT Monitor Body */}
          <rect x={x - 15} y={y - 12} width={30} height={24} rx={2} fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
          <path d={`M ${x - 15} ${y + 12} L ${x + 15} ${y + 12} L ${x + 12} ${y + 18} L ${x - 12} ${y + 18} Z`} fill="#334155" />
          {/* Terminal Screen (Red tint) */}
          <rect x={x - 12} y={y - 9} width={24} height={18} fill="#450a0a" stroke="#f87171" strokeWidth="0.5" />
          {/* Skull / Bug pixel art representation */}
          <circle cx={x} cy={y - 2} r={4} fill="#fca5a5" />
          <path d={`M ${x - 2.5} ${y + 1} L ${x + 2.5} ${y + 1} L ${x + 1.5} ${y + 4} L ${x - 1.5} ${y + 4} Z`} fill="#fca5a5" />
          <circle cx={x - 1.5} cy={y - 2} r={1} fill="#450a0a" />
          <circle cx={x + 1.5} cy={y - 2} r={1} fill="#450a0a" />
          <path d={`M ${x} ${y - 0.5} L ${x - 0.5} ${y + 1} L ${x + 0.5} ${y + 1} Z`} fill="#450a0a" />
          {/* Bug Legs */}
          <path d={`M ${x - 4} ${y - 2} L ${x - 7} ${y - 4} M ${x - 4} ${y} L ${x - 7} ${y} M ${x - 3} ${y + 2} L ${x - 6} ${y + 4}`} stroke="#fca5a5" strokeWidth="0.75" />
          <path d={`M ${x + 4} ${y - 2} L ${x + 7} ${y - 4} M ${x + 4} ${y} L ${x + 7} ${y} M ${x + 3} ${y + 2} L ${x + 6} ${y + 4}`} stroke="#fca5a5" strokeWidth="0.75" />
        </g>
      );

    case 'become-a-defender':
      return (
        <g id="defender-shield-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={8} fill="rgba(56, 189, 248, 0.2)" filter="blur(3px)" />
          {/* Monitor Base */}
          <path d={`M ${x - 10} ${y + 14} L ${x + 10} ${y + 14} L ${x + 14} ${y + 17} L ${x - 14} ${y + 17} Z`} fill="#475569" stroke="#1e293b" strokeWidth="0.5" />
          {/* Screen Backing */}
          <rect x={x - 18} y={y - 14} width={36} height={24} rx={1} fill="#1e293b" stroke="#0f172a" strokeWidth="1" />
          {/* Screen Content (Blue tint) */}
          <rect x={x - 16} y={y - 12} width={32} height={20} fill="#0c4a6e" stroke="#38bdf8" strokeWidth="0.5" />
          {/* Shield 3D projection on screen */}
          <path d={`M ${x} ${y - 9} C ${x - 8} ${y - 9} ${x - 10} ${y - 1} ${x} ${y + 6} Z`} fill="#0284c7" stroke="#bae6fd" strokeWidth="0.5" />
          <path d={`M ${x} ${y - 9} C ${x + 8} ${y - 9} ${x + 10} ${y - 1} ${x} ${y + 6} Z`} fill="#0369a1" stroke="#bae6fd" strokeWidth="0.5" />
          {/* Inner checkmark or lines */}
          <path d={`M ${x - 3} ${y - 2} L ${x - 1} ${y} L ${x + 4} ${y - 4}`} fill="none" stroke="#f0f9ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );

    case 'mystery-chest-os':
      return (
        <g id="mystery-chest-scene">
          <ellipse cx={x} cy={y + 18} rx={22} ry={8} fill="rgba(234, 179, 8, 0.18)" filter="blur(4px)" />
          <path 
            d={`M ${x - 15} ${y + 5} L ${x} ${y + 13} L ${x} ${y + 23} L ${x - 15} ${y + 15} Z`} 
            fill="url(#chest-body-left)" 
            stroke="#1e293b" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x} ${y + 13} L ${x + 15} ${y + 5} L ${x + 15} ${y + 15} L ${x} ${y + 23} Z`} 
            fill="url(#chest-body-right)" 
            stroke="#0f172a" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x - 15} ${y + 5} L ${x} ${y - 3} L ${x} ${y + 13} L ${x - 15} ${y + 5} Z`} 
            fill="url(#chest-lid-left)" 
            stroke="#1e293b" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x} ${y - 3} L ${x + 15} ${y + 5} L ${x + 15} ${y + 15} L ${x} ${y + 13} Z`} 
            fill="url(#chest-lid-right)" 
            stroke="#0f172a" 
            strokeWidth="0.5"
          />
          <path d={`M ${x - 12} ${y + 3.5} L ${x - 12} ${y + 13.5}`} stroke="#06b6d4" strokeWidth="1" filter="drop-shadow(0 0 2px #06b6d4)" />
          <path d={`M ${x + 12} ${y + 3.5} L ${x + 12} ${y + 13.5}`} stroke="#06b6d4" strokeWidth="1" filter="drop-shadow(0 0 2px #06b6d4)" />
          <path 
            d={`M ${x - 2.5} ${y + 9} L ${x + 2.5} ${y + 9} L ${x + 1.5} ${y + 16} L ${x - 1.5} ${y + 16} Z`} 
            fill="url(#sword-hilt-grad)" 
            stroke="#78350f" 
            strokeWidth="0.5"
          />
          <circle cx={x} cy={y + 12.5} r={1.2} fill="#111827" />
          <path 
            d={`M ${x - 14.5} ${y + 5} L ${x} ${y + 13} L ${x + 14.5} ${y + 5}`} 
            fill="none" 
            stroke="#eab308" 
            strokeWidth="1.2" 
            opacity="0.85" 
            filter="drop-shadow(0 0 3px #eab308)"
          />
        </g>
      );

    case 'dns-in-detail':
      return (
        <g id="dns-globe-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(56, 189, 248, 0.2)" filter="blur(3px)" />
          <circle cx={x} cy={y-2} r={16} fill="url(#shield-grad-left)" stroke="#0ea5e9" strokeWidth="0.5" />
          <ellipse cx={x} cy={y-2} rx={16} ry={6} fill="none" stroke="#38bdf8" strokeWidth="0.5" opacity="0.5" />
          <ellipse cx={x} cy={y-2} rx={6} ry={16} fill="none" stroke="#38bdf8" strokeWidth="0.5" opacity="0.5" />
          <ellipse cx={x} cy={y-2} rx={16} ry={2} fill="none" stroke="#38bdf8" strokeWidth="0.5" opacity="0.3" />
          <path d={`M ${x - 8} ${y - 10} Q ${x - 4} ${y - 14} ${x + 2} ${y - 8} Q ${x - 2} ${y - 2} ${x - 8} ${y - 10} Z`} fill="#9fef00" opacity="0.8" filter="drop-shadow(0 0 1px rgba(159, 239, 0, 0.5))" />
          <path d={`M ${x + 4} ${y + 2} Q ${x + 10} ${y - 2} ${x + 12} ${y + 4} Q ${x + 6} ${y + 8} ${x + 4} ${y + 2} Z`} fill="#9fef00" opacity="0.8" filter="drop-shadow(0 0 1px rgba(159, 239, 0, 0.5))" />
          <path d={`M ${x - 12} ${y} Q ${x - 8} ${y + 4} ${x - 10} ${y + 8} Q ${x - 14} ${y + 6} ${x - 12} ${y} Z`} fill="#9fef00" opacity="0.6" />
          <rect x={x - 14} y={y - 7} width={28} height={11} rx={2} fill="#161c2c" stroke="#9fef00" strokeWidth="0.8" filter="drop-shadow(0 0 2px rgba(159, 239, 0, 0.3))" />
          <text x={x} y={y + 1} fontSize="8" fontFamily="monospace" fontWeight="bold" fill="#ffffff" textAnchor="middle">DNS</text>
        </g>
      );

    case 'http-in-detail':
      return (
        <g id="http-browser-scene">
          <ellipse cx={x} cy={y + 17} rx={24} ry={8} fill="rgba(56, 189, 248, 0.15)" filter="blur(3px)" />
          
          {/* Small Server (Back right) */}
          <g transform="translate(12, -8)">
            <path d={`M ${x - 4} ${y} L ${x} ${y + 2} L ${x + 4} ${y} L ${x} ${y - 2} Z`} fill="#475569" />
            <path d={`M ${x - 4} ${y} L ${x} ${y + 2} L ${x} ${y + 12} L ${x - 4} ${y + 10} Z`} fill="#334155" />
            <path d={`M ${x + 4} ${y} L ${x} ${y + 2} L ${x} ${y + 12} L ${x + 4} ${y + 10} Z`} fill="#1e293b" />
            <line x1={x - 2} y1={y + 4} x2={x - 1} y2={y + 4.5} stroke="#0ea5e9" strokeWidth="1" />
            <line x1={x - 2} y1={y + 6} x2={x - 1} y2={y + 6.5} stroke="#22c55e" strokeWidth="1" />
          </g>

          {/* Browser Window (Front left) */}
          <g transform="translate(-6, 4)">
            <path d={`M ${x - 16} ${y + 8} L ${x + 10} ${y - 5} L ${x + 10} ${y - 20} L ${x - 16} ${y - 7} Z`} fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <path d={`M ${x - 16} ${y - 7} L ${x + 10} ${y - 20} L ${x + 14} ${y - 18} L ${x - 12} ${y - 5} Z`} fill="#334155" stroke="#475569" strokeWidth="0.5" />
            <path d={`M ${x + 10} ${y - 20} L ${x + 14} ${y - 18} L ${x + 14} ${y - 3} L ${x + 10} ${y - 5} Z`} fill="#0f172a" />
            {/* Window buttons */}
            <circle cx={x - 11} cy={y - 8} r={1} fill="#ef4444" />
            <circle cx={x - 8} cy={y - 9.5} r={1} fill="#f59e0b" />
            <circle cx={x - 5} cy={y - 11} r={1} fill="#10b981" />
            {/* URL bar */}
            <path d={`M ${x - 12} ${y - 3} L ${x + 8} ${y - 13} L ${x + 8} ${y - 10} L ${x - 12} ${y} Z`} fill="#0f172a" />
            <g transform={`translate(${x - 9}, ${y - 3}) skewY(-26.5)`}>
              <text x="0" y="0" fontSize="4.5" fontFamily="monospace" fill="#38bdf8">http://</text>
            </g>
          </g>

          {/* Request / Response Arrows */}
          <path d={`M ${x + 1} ${y + 3} Q ${x + 6} ${y + 2} ${x + 8} ${y - 2}`} fill="none" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
          <path d={`M ${x + 8} ${y - 2} L ${x + 7.5} ${y - 0.5} L ${x + 6} ${y - 2.5}`} fill="none" stroke="#22c55e" strokeWidth="1.2" />

          <path d={`M ${x + 6} ${y - 4} Q ${x - 1} ${y} ${x - 1} ${y + 3}`} fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
          <path d={`M ${x - 1} ${y + 3} L ${x} ${y + 1.5} L ${x + 1} ${y + 3.5}`} fill="none" stroke="#f59e0b" strokeWidth="1.2" />
        </g>
      );

    case 'how-websites-work':
      return (
        <g id="laptop-web-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={6} fill="rgba(0,0,0,0.3)" filter="blur(3px)" />
          <path d={`M ${x - 16} ${y + 8} L ${x + 4} ${y + 16} L ${x + 20} ${y + 6} L ${x} ${y - 2} Z`} fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
          <path d={`M ${x - 16} ${y + 8} L ${x + 4} ${y + 16} L ${x + 4} ${y + 18} L ${x - 16} ${y + 10} Z`} fill="#0f172a" />
          <path d={`M ${x + 4} ${y + 16} L ${x + 20} ${y + 6} L ${x + 20} ${y + 8} L ${x + 4} ${y + 18} Z`} fill="#1e293b" />
          <path d={`M ${x - 10} ${y + 7} L ${x + 2} ${y + 12} L ${x + 12} ${y + 5} L ${x} ${y} Z`} fill="#1e293b" />
          <path d={`M ${x - 8} ${y + 7.5} L ${x - 4} ${y + 9}`} stroke="#0f172a" strokeWidth="1.5" />
          <path d={`M ${x - 14} ${y + 5} L ${x + 2} ${y - 5} L ${x + 2} ${y - 22} L ${x - 14} ${y - 12} Z`} fill="#1e293b" stroke="#0f172a" strokeWidth="0.5" />
          <path d={`M ${x + 2} ${y - 5} L ${x + 4} ${y - 4} L ${x + 4} ${y - 21} L ${x + 2} ${y - 22} Z`} fill="#475569" />
          <path d={`M ${x - 13} ${y + 3} L ${x + 1} ${y - 6} L ${x + 1} ${y - 20} L ${x - 13} ${y - 11} Z`} fill="#0f172a" />
          <path d={`M ${x - 12} ${y - 9} L ${x} ${y - 16.5} L ${x} ${y - 14.5} L ${x - 12} ${y - 7} Z`} fill="#38bdf8" opacity="0.6" />
          <path d={`M ${x - 12} ${y - 5} L ${x - 4} ${y - 10} L ${x - 4} ${y - 7} L ${x - 12} ${y - 2} Z`} fill="#9fef00" opacity="0.8" />
          <path d={`M ${x - 2} ${y - 10.5} L ${x} ${y - 11.5} L ${x} ${y - 8.5} L ${x - 2} ${y - 7.5} Z`} fill="#f43f5e" opacity="0.7" />
          <g transform={`translate(${x - 8}, ${y - 12}) skewY(-22)`}>
            <text x="0" y="0" fontSize="3.5" fill="#ffffff" fontFamily="monospace" fontWeight="bold">HTML</text>
          </g>
        </g>
      );

    case 'putting-it-all-together':
      return (
        <g id="puzzle-cube-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={6} fill="rgba(192, 132, 252, 0.15)" filter="blur(3px)" />
          <path d={`M ${x - 14} ${y - 2} L ${x} ${y - 10} L ${x + 14} ${y - 2} L ${x} ${y + 6} Z`} fill="#c084fc" stroke="#7e22ce" strokeWidth="0.5" />
          <path d={`M ${x - 14} ${y - 2} L ${x} ${y + 6}`} stroke="#7e22ce" strokeWidth="0.5" />
          <path d={`M ${x - 7} ${y - 6} L ${x + 7} ${y + 2}`} stroke="#7e22ce" strokeWidth="0.5" />
          <path d={`M ${x + 7} ${y - 6} L ${x - 7} ${y + 2}`} stroke="#7e22ce" strokeWidth="0.5" />
          <path d={`M ${x} ${y - 10} L ${x} ${y + 6}`} stroke="#7e22ce" strokeWidth="0.5" />
          <path d={`M ${x - 14} ${y - 2} L ${x} ${y + 6} L ${x} ${y + 20} L ${x - 14} ${y + 12} Z`} fill="#38bdf8" stroke="#0369a1" strokeWidth="0.5" />
          <path d={`M ${x - 7} ${y + 2} L ${x - 7} ${y + 16}`} stroke="#0369a1" strokeWidth="0.5" />
          <path d={`M ${x - 14} ${y + 5} L ${x} ${y + 13}`} stroke="#0369a1" strokeWidth="0.5" />
          <path d={`M ${x - 7} ${y + 2} L ${x} ${y + 6} L ${x} ${y + 13} L ${x - 7} ${y + 9} Z`} fill="#0f172a" stroke="#0f172a" />
          <path d={`M ${x} ${y + 6} L ${x + 14} ${y - 2} L ${x + 14} ${y + 12} L ${x} ${y + 20} Z`} fill="#f472b6" stroke="#be185d" strokeWidth="0.5" />
          <path d={`M ${x + 7} ${y + 2} L ${x + 7} ${y + 16}`} stroke="#be185d" strokeWidth="0.5" />
          <path d={`M ${x} ${y + 13} L ${x + 14} ${y + 5}`} stroke="#be185d" strokeWidth="0.5" />
          <g transform="translate(-16, -16)">
            <path d={`M ${x - 2} ${y + 1} L ${x + 4} ${y - 2} L ${x + 10} ${y + 1} L ${x + 4} ${y + 4} Z`} fill="#c084fc" stroke="#7e22ce" strokeWidth="0.5" />
            <path d={`M ${x - 2} ${y + 1} L ${x + 4} ${y + 4} L ${x + 4} ${y + 10} L ${x - 2} ${y + 7} Z`} fill="#38bdf8" stroke="#0369a1" strokeWidth="0.5" />
            <path d={`M ${x + 4} ${y + 4} L ${x + 10} ${y + 1} L ${x + 10} ${y + 7} L ${x + 4} ${y + 10} Z`} fill="#f472b6" stroke="#be185d" strokeWidth="0.5" />
          </g>
        </g>
      );

    case 'network-architecture':
    case 'what-is-networking':
      return (
        <g id="networking-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(56, 189, 248, 0.15)" filter="blur(4px)" />
          <g transform="translate(-12, 4)">
            <path d={`M ${x - 10} ${y} L ${x} ${y + 5} L ${x + 10} ${y} L ${x} ${y - 5} Z`} fill="#475569" stroke="#334155" strokeWidth="0.5" />
            <path d={`M ${x - 10} ${y} L ${x} ${y + 5} L ${x} ${y + 7} L ${x - 10} ${y + 2} Z`} fill="#334155" />
            <path d={`M ${x} ${y + 5} L ${x + 10} ${y} L ${x + 10} ${y + 2} L ${x} ${y + 7} Z`} fill="#1e293b" />
            <path d={`M ${x} ${y - 5} L ${x + 10} ${y} L ${x + 10} ${y - 12} L ${x} ${y - 17} Z`} fill="#1e293b" />
            <path d={`M ${x + 1} ${y - 4.5} L ${x + 9} ${y - 0.5} L ${x + 9} ${y - 11.5} L ${x + 1} ${y - 15.5} Z`} fill="#0f172a" />
            <path d={`M ${x + 2} ${y - 5.5} L ${x + 8} ${y - 2.5} L ${x + 8} ${y - 10.5} L ${x + 2} ${y - 13.5} Z`} fill="#0284c7" />
          </g>
          <g transform="translate(12, 4)">
            <path d={`M ${x - 10} ${y} L ${x} ${y + 5} L ${x + 10} ${y} L ${x} ${y - 5} Z`} fill="#475569" stroke="#334155" strokeWidth="0.5" />
            <path d={`M ${x - 10} ${y} L ${x} ${y + 5} L ${x} ${y + 7} L ${x - 10} ${y + 2} Z`} fill="#334155" />
            <path d={`M ${x} ${y + 5} L ${x + 10} ${y} L ${x + 10} ${y + 2} L ${x} ${y + 7} Z`} fill="#1e293b" />
            <path d={`M ${x} ${y - 5} L ${x - 10} ${y} L ${x - 10} ${y - 12} L ${x} ${y - 17} Z`} fill="#1e293b" />
            <path d={`M ${x - 1} ${y - 4.5} L ${x - 9} ${y - 0.5} L ${x - 9} ${y - 11.5} L ${x - 1} ${y - 15.5} Z`} fill="#0f172a" />
            <path d={`M ${x - 2} ${y - 5.5} L ${x - 8} ${y - 2.5} L ${x - 8} ${y - 10.5} L ${x - 2} ${y - 13.5} Z`} fill="#0284c7" />
          </g>
          <path 
            d={`M ${x - 8} ${y - 4} Q ${x} ${y - 14} ${x + 8} ${y - 4}`} 
            fill="none" 
            stroke="#9fef00" 
            strokeWidth="1.5" 
            strokeDasharray="2,2" 
            filter="drop-shadow(0 0 2px #9fef00)"
          />
          <path 
            d={`M ${x - 4} ${y} Q ${x} ${y - 7} ${x + 4} ${y}`} 
            fill="none" 
            stroke="#9fef00" 
            strokeWidth="1.2" 
            strokeDasharray="1.5,1.5" 
            filter="drop-shadow(0 0 1px #9fef00)"
          />
        </g>
      );

    case 'intro-to-lan':
      return (
        <g id="lan-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={7} fill="rgba(6, 182, 212, 0.15)" filter="blur(4px)" />
          {/* Switch (Center) */}
          <path d={`M ${x - 4} ${y + 5} L ${x} ${y + 7} L ${x + 4} ${y + 5} L ${x} ${y + 3} Z`} fill="#475569" stroke="#94a3b8" strokeWidth="0.5" />
          <path d={`M ${x - 4} ${y + 5} L ${x} ${y + 7} L ${x} ${y + 8} L ${x - 4} ${y + 6} Z`} fill="#1e293b" />
          <path d={`M ${x + 4} ${y + 5} L ${x} ${y + 7} L ${x} ${y + 8} L ${x + 4} ${y + 6} Z`} fill="#0f172a" />
          
          {/* Laptop (Left-front) */}
          <g transform="translate(-12, 8)">
            <path d={`M ${x - 5} ${y} L ${x} ${y + 3} L ${x + 5} ${y} L ${x} ${y - 3} Z`} fill="#64748b" stroke="#334155" strokeWidth="0.5" />
            <path d={`M ${x - 5} ${y} L ${x} ${y + 3} L ${x} ${y + 4} L ${x - 5} ${y + 1} Z`} fill="#334155" />
            <path d={`M ${x} ${y - 3} L ${x + 5} ${y} L ${x + 5} ${y - 5} L ${x} ${y - 8} Z`} fill="#0f172a" />
            <path d={`M ${x + 0.5} ${y - 3} L ${x + 4.5} ${y - 0.5} L ${x + 4.5} ${y - 4.5} L ${x + 0.5} ${y - 7} Z`} fill="#06b6d4" />
          </g>

          {/* PC Tower + Monitor (Right-back) */}
          <g transform="translate(10, -5)">
            {/* Monitor */}
            <path d={`M ${x - 6} ${y} L ${x} ${y + 3} L ${x} ${y - 3} L ${x - 6} ${y - 6} Z`} fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
            <path d={`M ${x - 5} ${y - 1} L ${x - 1} ${y + 1} L ${x - 1} ${y - 4} L ${x - 5} ${y - 6} Z`} fill="#22c55e" />
            {/* Tower */}
            <path d={`M ${x + 1} ${y} L ${x + 4} ${y + 1.5} L ${x + 4} ${y - 5} L ${x + 1} ${y - 6.5} Z`} fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
            <path d={`M ${x} ${y - 1} L ${x + 1} ${y} L ${x + 1} ${y - 6.5} L ${x} ${y - 7.5} Z`} fill="#1e293b" />
          </g>

          {/* Printer (Left-back) */}
          <g transform="translate(-8, -8)">
            <path d={`M ${x - 4} ${y} L ${x} ${y + 2} L ${x + 4} ${y} L ${x} ${y - 2} Z`} fill="#94a3b8" />
            <path d={`M ${x - 4} ${y} L ${x} ${y + 2} L ${x} ${y + 5} L ${x - 4} ${y + 3} Z`} fill="#64748b" />
            <path d={`M ${x + 4} ${y} L ${x} ${y + 2} L ${x} ${y + 5} L ${x + 4} ${y + 3} Z`} fill="#475569" />
            <path d={`M ${x} ${y - 2} L ${x + 2} ${y - 1} L ${x + 2} ${y - 4} L ${x} ${y - 5} Z`} fill="#f1f5f9" />
          </g>

          {/* Cables connecting to switch */}
          <path d={`M ${x - 2} ${y + 6} L ${x - 7} ${y + 8}`} stroke="#0ea5e9" strokeWidth="0.8" />
          <path d={`M ${x + 2} ${y + 4} L ${x + 7} ${y - 2}`} stroke="#0ea5e9" strokeWidth="0.8" />
          <path d={`M ${x - 1} ${y + 4} L ${x - 5} ${y - 4}`} stroke="#0ea5e9" strokeWidth="0.8" />
        </g>
      );

    case 'osi-model': {
      const layers = [
        { dy: 4, color: "#ef4444", border: "#f87171" },
        { dy: -3, color: "#f97316", border: "#fb923c" },
        { dy: -10, color: "#eab308", border: "#fde047" },
        { dy: -17, color: "#22c55e", border: "#4ade80" },
        { dy: -24, color: "#06b6d4", border: "#22d3ee" },
        { dy: -31, color: "#a855f7", border: "#c084fc" }
      ];
      return (
        <g id="osi-stack-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={7} fill="rgba(168, 85, 247, 0.15)" filter="blur(4px)" />
          {layers.map((layer, idx) => {
            const h = layer.dy;
            const w = 16;
            const dh = 8;
            const t = 2.5;
            return (
              <g key={idx}>
                <path 
                  d={`M ${x - w} ${y + h + dh} L ${x} ${y + h + dh * 2} L ${x} ${y + h + dh * 2 + t} L ${x - w} ${y + h + dh + t} Z`} 
                  fill={layer.color} 
                  opacity="0.8" 
                />
                <path 
                  d={`M ${x} ${y + h + dh * 2} L ${x + w} ${y + h + dh} L ${x + w} ${y + h + dh + t} L ${x} ${y + h + dh * 2 + t} Z`} 
                  fill={layer.color} 
                  opacity="0.8" 
                />
                <path 
                  d={`M ${x} ${y + h} L ${x + w} ${y + h + dh} L ${x} ${y + h + dh * 2} L ${x - w} ${y + h + dh} Z`} 
                  fill={layer.color} 
                  stroke={layer.border} 
                  strokeWidth="0.8" 
                  opacity="0.65" 
                />
              </g>
            );
          })}
        </g>
      );
    }

    case 'packets-and-frames':
    case 'network-protocols-tools':
      return (
        <g id="packets-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={7} fill="rgba(59, 130, 246, 0.15)" filter="blur(3px)" />
          {/* Line with arrow */}
          <path d={`M ${x - 12} ${y + 10} L ${x + 10} ${y - 1}`} stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 2" filter="drop-shadow(0 0 2px #3b82f6)" />
          <path d={`M ${x + 7} ${y} L ${x + 10} ${y - 1} L ${x + 9} ${y + 2}`} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinejoin="round" />
          
          {/* Packet 1 */}
          <g transform="translate(-10, 8)">
            <path d={`M ${x - 4} ${y} L ${x} ${y + 2} L ${x + 4} ${y} L ${x} ${y - 2} Z`} fill="#fcd34d" stroke="#f59e0b" strokeWidth="0.5" />
            <path d={`M ${x - 4} ${y} L ${x} ${y + 2} L ${x} ${y + 4} L ${x - 4} ${y + 2} Z`} fill="#f59e0b" />
            <path d={`M ${x + 4} ${y} L ${x} ${y + 2} L ${x} ${y + 4} L ${x + 4} ${y + 2} Z`} fill="#d97706" />
            <path d={`M ${x - 2} ${y} L ${x} ${y + 1} L ${x + 2} ${y}`} stroke="#b45309" strokeWidth="0.5" />
          </g>

          {/* Packet 2 */}
          <g transform="translate(-1, 3.5)">
            <path d={`M ${x - 4} ${y} L ${x} ${y + 2} L ${x + 4} ${y} L ${x} ${y - 2} Z`} fill="#6ee7b7" stroke="#10b981" strokeWidth="0.5" />
            <path d={`M ${x - 4} ${y} L ${x} ${y + 2} L ${x} ${y + 4} L ${x - 4} ${y + 2} Z`} fill="#34d399" />
            <path d={`M ${x + 4} ${y} L ${x} ${y + 2} L ${x} ${y + 4} L ${x + 4} ${y + 2} Z`} fill="#059669" />
            <path d={`M ${x - 2} ${y} L ${x} ${y + 1} L ${x + 2} ${y}`} stroke="#065f46" strokeWidth="0.5" />
          </g>

          {/* Packet 3 */}
          <g transform="translate(8, -1)">
            <path d={`M ${x - 4} ${y} L ${x} ${y + 2} L ${x + 4} ${y} L ${x} ${y - 2} Z`} fill="#93c5fd" stroke="#3b82f6" strokeWidth="0.5" />
            <path d={`M ${x - 4} ${y} L ${x} ${y + 2} L ${x} ${y + 4} L ${x - 4} ${y + 2} Z`} fill="#60a5fa" />
            <path d={`M ${x + 4} ${y} L ${x} ${y + 2} L ${x} ${y + 4} L ${x + 4} ${y + 2} Z`} fill="#2563eb" />
            <path d={`M ${x - 2} ${y} L ${x} ${y + 1} L ${x + 2} ${y}`} stroke="#1d4ed8" strokeWidth="0.5" />
          </g>
        </g>
      );

    case 'extending-your-network':
      return (
        <g id="extranet-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(249, 115, 22, 0.22)" filter="blur(4px)" />
          
          {/* Firewall (Small Brick Wall) in front */}
          <g transform="translate(0, 8)">
            <path d={`M ${x - 8} ${y + 5} L ${x} ${y + 9} L ${x} ${y + 1} L ${x - 8} ${y - 3} Z`} fill="#b91c1c" stroke="#991b1b" strokeWidth="0.5" />
            <path d={`M ${x} ${y + 9} L ${x + 8} ${y + 5} L ${x + 8} ${y - 3} L ${x} ${y + 1} Z`} fill="#991b1b" stroke="#7f1d1d" strokeWidth="0.5" />
            <path d={`M ${x - 8} ${y - 3} L ${x} ${y + 1} L ${x + 8} ${y - 3} L ${x} ${y - 7} Z`} fill="#ef4444" stroke="#b91c1c" strokeWidth="0.5" />
            <line x1={x - 8} y1={y + 1} x2={x} y2={y + 5} stroke="#cbd5e1" strokeWidth="0.5" opacity="0.6" />
            <line x1={x} y1={y + 5} x2={x + 8} y2={y + 1} stroke="#cbd5e1" strokeWidth="0.5" opacity="0.6" />
          </g>

          {/* 3D WiFi Router */}
          <g transform="translate(0, -5)">
            <path d={`M ${x - 10} ${y} L ${x} ${y + 5} L ${x + 10} ${y} L ${x} ${y - 5} Z`} fill="#1e293b" stroke="#334155" strokeWidth="0.5" />
            <path d={`M ${x - 10} ${y} L ${x} ${y + 5} L ${x} ${y + 7} L ${x - 10} ${y + 2} Z`} fill="#0f172a" />
            <path d={`M ${x + 10} ${y} L ${x} ${y + 5} L ${x} ${y + 7} L ${x + 10} ${y + 2} Z`} fill="#020617" />
            {/* Antennas */}
            <path d={`M ${x - 8} ${y - 3} L ${x - 8} ${y - 12}`} stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            <path d={`M ${x + 8} ${y - 3} L ${x + 8} ${y - 12}`} stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
            {/* Signal Waves */}
            <path d={`M ${x - 12} ${y - 14} Q ${x} ${y - 20} ${x + 12} ${y - 14}`} fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" filter="drop-shadow(0 0 2px #38bdf8)" />
            <path d={`M ${x - 8} ${y - 16} Q ${x} ${y - 21} ${x + 8} ${y - 16}`} fill="none" stroke="#0ea5e9" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
            {/* Lights */}
            <circle cx={x - 2} cy={y + 5} r={0.8} fill="#22c55e" />
            <circle cx={x} cy={y + 6} r={0.8} fill="#22c55e" />
            <circle cx={x + 2} cy={y + 5} r={0.8} fill="#22c55e" />
          </g>
        </g>
      );

    case 'web-anatomy':
      return (
        <g id="web-anatomy-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={7} fill="rgba(56, 189, 248, 0.15)" filter="blur(4px)" />
          <g transform="translate(0, -2)">
            <path 
              d={`M ${x - 18} ${y - 6} L ${x + 18} ${y - 18} L ${x + 18} ${y + 4} L ${x - 18} ${y + 16} Z`} 
              fill="url(#web-pane-grad)" 
              stroke="#0ea5e9" 
              strokeWidth="1.2" 
              opacity="0.85" 
              filter="drop-shadow(0 0 3px rgba(14,165,223,0.4))"
            />
            <circle cx={x - 13} cy={y - 3} r={1.5} fill="#ef4444" />
            <circle cx={x - 9} cy={y - 4.5} r={1.5} fill="#f59e0b" />
            <circle cx={x - 5} cy={y - 6} r={1.5} fill="#10b981" />
            <line x1={x - 13} y1={y + 3} x2={x - 3} y2={y - 1} stroke="#c084fc" strokeWidth="2.2" strokeLinecap="round" />
            <line x1={x - 13} y1={y + 7.5} x2={x + 11} y2={y} stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
            <line x1={x - 8} y1={y + 11.5} x2={x + 6} y2={y + 6.5} stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        </g>
      );

    case 'linux-operating-system':
      return (
        <g id="linux-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={7} fill="rgba(34, 197, 94, 0.12)" filter="blur(4px)" />
          <path d={`M ${x - 5} ${y + 9} L ${x + 5} ${y + 5} L ${x + 5} ${y + 14} L ${x - 5} ${y + 18} Z`} fill="#1e293b" />
          <path d={`M ${x - 10} ${y + 15} L ${x + 10} ${y + 7} L ${x + 8} ${y + 11} L ${x - 8} ${y + 19} Z`} fill="#334155" />
          <path 
            d={`M ${x - 16} ${y - 4} L ${x + 4} ${y - 12} L ${x + 4} ${y + 4} L ${x - 16} ${y + 12} Z`} 
            fill="#020617" 
            stroke="#475569" 
            strokeWidth="1" 
          />
          <path 
            d={`M ${x + 4} ${y - 12} L ${x + 18} ${y - 7} L ${x + 18} ${y + 9} L ${x + 4} ${y + 4} Z`} 
            fill="#334155" 
            stroke="#1e293b" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x - 16} ${y - 4} L ${x - 2} ${y - 9} L ${x + 18} ${y - 7} L ${x + 4} ${y - 12} Z`} 
            fill="#475569" 
            stroke="#1e293b" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x - 12} ${y + 3} L ${x - 9} ${y + 5} L ${x - 12} ${y + 7}`} 
            fill="none" 
            stroke="#22c55e" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            filter="drop-shadow(0 0 1px #22c55e)"
          />
          <rect 
            x={x - 6.5} y={y + 4.5} width={2.2} height={4.5} 
            fill="#22c55e" 
            transform={`skewY(14)`} 
            className="animate-pulse"
          />
        </g>
      );

    case 'inside-a-computer-system':
      return (
        <g id="cpu-scene">
          <ellipse cx={x} cy={y + 17} rx={18} ry={7} fill="rgba(34, 197, 94, 0.2)" filter="blur(3px)" />
          {/* Chip Base */}
          <polygon points={`${x},${y+14} ${x-14},${y+7} ${x},${y} ${x+14},${y+7}`} fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
          {/* CPU core */}
          <polygon points={`${x},${y+10} ${x-8},${y+6} ${x},${y+2} ${x+8},${y+6}`} fill="#1e293b" stroke="#22c55e" strokeWidth="0.5" />
          <polygon points={`${x},${y+8} ${x-5},${y+5.5} ${x},${y+3} ${x+5},${y+5.5}`} fill="#22c55e" opacity="0.3" filter="blur(1px)" className="animate-pulse" />
          {/* Pins Left */}
          <line x1={x-12} y1={y+8} x2={x-12} y2={y+11} stroke="#94a3b8" strokeWidth="1" />
          <line x1={x-9} y1={y+9.5} x2={x-9} y2={y+12.5} stroke="#94a3b8" strokeWidth="1" />
          <line x1={x-6} y1={y+11} x2={x-6} y2={y+14} stroke="#94a3b8" strokeWidth="1" />
          <line x1={x-3} y1={y+12.5} x2={x-3} y2={y+15.5} stroke="#94a3b8" strokeWidth="1" />
          {/* Pins Right */}
          <line x1={x+12} y1={y+8} x2={x+12} y2={y+11} stroke="#94a3b8" strokeWidth="1" />
          <line x1={x+9} y1={y+9.5} x2={x+9} y2={y+12.5} stroke="#94a3b8" strokeWidth="1" />
          <line x1={x+6} y1={y+11} x2={x+6} y2={y+14} stroke="#94a3b8" strokeWidth="1" />
          <line x1={x+3} y1={y+12.5} x2={x+3} y2={y+15.5} stroke="#94a3b8" strokeWidth="1" />
        </g>
      );

    case 'computer-types':
      return (
        <g id="laptop-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(56, 189, 248, 0.2)" filter="blur(3px)" />
          {/* Base Keyboard */}
          <polygon points={`${x},${y+14} ${x-16},${y+6} ${x},${y} ${x+16},${y+6}`} fill="#334155" />
          <polygon points={`${x},${y+16} ${x-16},${y+8} ${x-16},${y+6} ${x},${y+14}`} fill="#1e293b" />
          <polygon points={`${x},${y+16} ${x+16},${y+8} ${x+16},${y+6} ${x},${y+14}`} fill="#0f172a" />
          {/* Keyboard Keys */}
          <polygon points={`${x},${y+11} ${x-10},${y+6} ${x},${y+2} ${x+10},${y+6}`} fill="#0f172a" />
          <polygon points={`${x},${y+13} ${x-3},${y+11.5} ${x},${y+10.5} ${x+3},${y+11.5}`} fill="#0f172a" />
          {/* Screen */}
          <polygon points={`${x-14},${y+4} ${x},${y-3} ${x},${y-16} ${x-14},${y-9}`} fill="#1e293b" />
          <polygon points={`${x-12},${y+2} ${x-1},${y-3.5} ${x-1},${y-14} ${x-12},${y-8.5}`} fill="#0ea5e9" opacity="0.8" />
          <line x1={x-10} y1={y-6} x2={x-4} y2={y-9} stroke="#f0f9ff" strokeWidth="0.5" />
          <line x1={x-10} y1={y-4} x2={x-6} y2={y-6} stroke="#f0f9ff" strokeWidth="0.5" />
          <line x1={x-10} y1={y-2} x2={x-3} y2={y-5.5} stroke="#38bdf8" strokeWidth="0.5" />
          <polygon points={`${x-14},${y+5} ${x},${y-2} ${x},${y-3} ${x-14},${y+4}`} fill="#94a3b8" />
        </g>
      );

    case 'client-server-basics':
      return (
        <g id="client-server-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(168, 85, 247, 0.2)" filter="blur(3px)" />
          {/* Client Box */}
          <polygon points={`${x-10},${y+12} ${x-18},${y+8} ${x-14},${y+6} ${x-6},${y+10}`} fill="#a855f7" />
          <polygon points={`${x-10},${y+12} ${x-18},${y+8} ${x-18},${y+2} ${x-10},${y+6}`} fill="#7e22ce" />
          <polygon points={`${x-6},${y+10} ${x-10},${y+12} ${x-10},${y+6} ${x-6},${y+4}`} fill="#581c87" />
          {/* Server Box */}
          <polygon points={`${x+14},${y+6} ${x+6},${y+2} ${x+10},${y-1} ${x+18},${y+3}`} fill="#a855f7" />
          <polygon points={`${x+14},${y+6} ${x+6},${y+2} ${x+6},${y-10} ${x+14},${y-6}`} fill="#7e22ce" />
          <polygon points={`${x+18},${y+3} ${x+14},${y+6} ${x+14},${y-6} ${x+18},${y-9}`} fill="#581c87" />
          {/* Connection Line */}
          <path d={`M ${x-6} ${y+10} Q ${x+4} ${y+12} ${x+6} ${y+2}`} fill="none" stroke="#d8b4fe" strokeWidth="1.5" strokeDasharray="2,2" className="animate-pulse" />
          <circle cx={x-6} cy={y+10} r={1.5} fill="#f3e8ff" />
          <circle cx={x+6} cy={y+2} r={1.5} fill="#f3e8ff" />
        </g>
      );

    case 'virtualisation-basics':
      return (
        <g id="virtualisation-scene">
          <ellipse cx={x} cy={y + 17} rx={18} ry={7} fill="rgba(249, 115, 22, 0.2)" filter="blur(3px)" />
          {/* Outer Host */}
          <polygon points={`${x},${y+14} ${x-14},${y+7} ${x},${y} ${x+14},${y+7}`} fill="none" stroke="#64748b" strokeWidth="1" />
          <polygon points={`${x},${y+14} ${x-14},${y+7} ${x-14},${y-3} ${x},${y+4}`} fill="none" stroke="#64748b" strokeWidth="1" />
          <polygon points={`${x},${y+14} ${x+14},${y+7} ${x+14},${y-3} ${x},${y+4}`} fill="none" stroke="#64748b" strokeWidth="1" />
          {/* Inner VM 1 */}
          <polygon points={`${x},${y+9} ${x-6},${y+6} ${x},${y+3} ${x+6},${y+6}`} fill="#f97316" />
          <polygon points={`${x},${y+9} ${x-6},${y+6} ${x-6},${y+2} ${x},${y+5}`} fill="#ea580c" />
          <polygon points={`${x},${y+9} ${x+6},${y+6} ${x+6},${y+2} ${x},${y+5}`} fill="#c2410c" />
          {/* Inner VM 2 */}
          <polygon points={`${x},${y-1} ${x-6},${y-4} ${x},${y-7} ${x+6},${y-4}`} fill="#3b82f6" />
          <polygon points={`${x},${y-1} ${x-6},${y-4} ${x-6},${y-8} ${x},${y-5}`} fill="#2563eb" />
          <polygon points={`${x},${y-1} ${x+6},${y-4} ${x+6},${y-8} ${x},${y-5}`} fill="#1d4ed8" />
        </g>
      );

    case 'cloud-computing-fundamentals':
      return (
        <g id="cloud-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={7} fill="rgba(236, 72, 153, 0.2)" filter="blur(3px)" />
          {/* Cloud layers */}
          <path d={`M ${x-8} ${y+12} Q ${x-16} ${y+8} ${x-8} ${y+4} Q ${x-6} ${y-2} ${x+2} ${y+2} Q ${x+12} ${y-2} ${x+14} ${y+6} Q ${x+20} ${y+10} ${x+12} ${y+14} Z`} fill="#ec4899" />
          <path d={`M ${x-8} ${y+10} Q ${x-16} ${y+6} ${x-8} ${y+2} Q ${x-6} ${y-4} ${x+2} ${y} Q ${x+12} ${y-4} ${x+14} ${y+4} Q ${x+20} ${y+8} ${x+12} ${y+12} Z`} fill="#db2777" />
          <path d={`M ${x-8} ${y+8} Q ${x-16} ${y+4} ${x-8} ${y} Q ${x-6} ${y-6} ${x+2} ${y-2} Q ${x+12} ${y-6} ${x+14} ${y+2} Q ${x+20} ${y+6} ${x+12} ${y+10} Z`} fill="#be185d" />
          {/* Nodes */}
          <circle cx={x-4} cy={y+2} r={1.5} fill="#fbcfe8" className="animate-pulse" />
          <circle cx={x+4} cy={y+5} r={1.5} fill="#fbcfe8" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
          <circle cx={x+8} cy={y} r={1.5} fill="#fbcfe8" className="animate-pulse" style={{ animationDelay: '1s' }} />
          <line x1={x-4} y1={y+2} x2={x+4} y2={y+5} stroke="#fbcfe8" strokeWidth="0.5" />
          <line x1={x+4} y1={y+5} x2={x+8} y2={y} stroke="#fbcfe8" strokeWidth="0.5" />
        </g>
      );


    case 'intro-operating-systems':
    case 'os-intro':
      return (
        <g id="os-intro-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(168, 85, 247, 0.25)" filter="blur(3px)" />
          {/* Stylized Chip/CPU */}
          <rect x={x-14} y={y-15} width={28} height={28} fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" rx="3" />
          {/* Inner core */}
          <rect x={x-8} y={y-9} width={16} height={16} fill="#a855f7" rx="2" />
          {/* Circuit traces */}
          <path d={`M ${x-14} ${y-1} L ${x-8} ${y-1} M ${x+8} ${y-1} L ${x+14} ${y-1} M ${x} ${y-15} L ${x} ${y-9} M ${x} ${y+7} L ${x} ${y+13}`} stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
          <path d={`M ${x-14} ${y-5} L ${x-8} ${y-5} M ${x+8} ${y-5} L ${x+14} ${y-5} M ${x-14} ${y+3} L ${x-8} ${y+3} M ${x+8} ${y+3} L ${x+14} ${y+3}`} stroke="#c084fc" strokeWidth="1" strokeLinecap="round" />
          {/* Small gear in corner */}
          <circle cx={x+14} cy={y-15} r={5} fill="#f3e8ff" stroke="#a855f7" strokeWidth="1" />
          <path d={`M ${x+14} ${y-22} L ${x+14} ${y-8} M ${x+7} ${y-15} L ${x+21} ${y-15} M ${x+9} ${y-20} L ${x+19} ${y-10} M ${x+9} ${y-10} L ${x+19} ${y-20}`} stroke="#a855f7" strokeWidth="1.5" />
          <circle cx={x+14} cy={y-15} r={2.5} fill="#1e293b" />
        </g>
      );

    case 'win-basics':
      return (
        <g id="win-basics-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(14, 165, 233, 0.25)" filter="blur(3px)" />
          <g transform={`matrix(0.866, 0.5, -0.866, 0.5, ${x}, ${y-5})`}>
            {/* 4 blue panes, isometric */}
            <rect x={-14} y={-14} width={13} height={13} fill="#0ea5e9" />
            <rect x={1} y={-14} width={13} height={13} fill="#0284c7" />
            <rect x={-14} y={1} width={13} height={13} fill="#0284c7" />
            <rect x={1} y={1} width={13} height={13} fill="#0369a1" />
          </g>
          {/* Floating glow */}
          <polygon points={`${x},${y+1} ${x-14},${y-7} ${x},${y-15} ${x+14},${y-7}`} fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
        </g>
      );

    case 'linux-bash-commands':
    case 'linux-cli':
      return (
        <g id="linux-cli-scene">
          <ellipse cx={x} cy={y + 17} rx={20} ry={7} fill="rgba(250, 204, 21, 0.25)" filter="blur(3px)" />
          {/* Tux body */}
          <path d={`M ${x} ${y-18} C ${x-12} ${y-18}, ${x-16} ${y+8}, ${x} ${y+12} C ${x+16} ${y+8}, ${x+12} ${y-18}, ${x} ${y-18} Z`} fill="#0f172a" />
          {/* White belly */}
          <path d={`M ${x} ${y-6} C ${x-10} ${y-6}, ${x-12} ${y+6}, ${x} ${y+10} C ${x+12} ${y+6}, ${x+10} ${y-6}, ${x} ${y-6} Z`} fill="#f8fafc" />
          {/* Eyes */}
          <circle cx={x-4} cy={y-10} r={3} fill="#f8fafc" />
          <circle cx={x+4} cy={y-10} r={3} fill="#f8fafc" />
          <circle cx={x-3.5} cy={y-9.5} r={1.5} fill="#0f172a" />
          <circle cx={x+3.5} cy={y-9.5} r={1.5} fill="#0f172a" />
          {/* Beak */}
          <path d={`M ${x-3} ${y-5} L ${x+3} ${y-5} L ${x} ${y-1} Z`} fill="#eab308" />
          {/* Feet */}
          <ellipse cx={x-7} cy={y+12} rx={5} ry={2.5} fill="#eab308" />
          <ellipse cx={x+7} cy={y+12} rx={5} ry={2.5} fill="#eab308" />
          {/* Flipper left */}
          <path d={`M ${x-13} ${y-2} C ${x-18} ${y+4}, ${x-13} ${y+8}, ${x-10} ${y+3}`} fill="#0f172a" />
          {/* Flipper right */}
          <path d={`M ${x+13} ${y-2} C ${x+18} ${y+4}, ${x+13} ${y+8}, ${x+10} ${y+3}`} fill="#0f172a" />
        </g>
      );

    case 'win-cli':
      return (
        <g id="win-cli-scene">
          <ellipse cx={x} cy={y + 17} rx={24} ry={8} fill="rgba(34, 197, 94, 0.25)" filter="blur(3px)" />
          {/* Terminal window */}
          <rect x={x-18} y={y-16} width={36} height={26} fill="#0f172a" stroke="#334155" strokeWidth="1.5" rx="2" />
          {/* Top bar */}
          <path d={`M ${x-18} ${y-16} Q ${x-18} ${y-16} ${x-16} ${y-16} L ${x+16} ${y-16} Q ${x+18} ${y-16} ${x+18} ${y-16} L ${x+18} ${y-10} L ${x-18} ${y-10} Z`} fill="#334155" />
          {/* Close/Min/Max buttons */}
          <circle cx={x+12} cy={y-13} r={1.5} fill="#ef4444" />
          <circle cx={x+7} cy={y-13} r={1.5} fill="#facc15" />
          <circle cx={x+2} cy={y-13} r={1.5} fill="#22c55e" />
          {/* Prompt text >_ */}
          <text x={x-14} y={y-1} fill="#22c55e" fontSize="10" fontFamily="monospace" fontWeight="bold">{`>_`}</text>
          {/* Code lines */}
          <line x1={x-14} y1={y+4} x2={x+4} y2={y+4} stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
          <line x1={x-14} y1={y+7} x2={x-2} y2={y+7} stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );

    case 'intro-asset-security':
    case 'os-sec':
      return (
        <g id="os-sec-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(239, 68, 68, 0.25)" filter="blur(3px)" />
          {/* Large Shield */}
          <path d={`M ${x-14} ${y-14} L ${x+14} ${y-14} L ${x+14} ${y-2} C ${x+14} ${y+8}, ${x} ${y+14}, ${x} ${y+14} C ${x} ${y+14}, ${x-14} ${y+8}, ${x-14} ${y-2} Z`} fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
          {/* Inner Shield */}
          <path d={`M ${x-9} ${y-9} L ${x+9} ${y-9} L ${x+9} ${y-3} C ${x+9} ${y+4}, ${x} ${y+9}, ${x} ${y+9} C ${x} ${y+9}, ${x-9} ${y+4}, ${x-9} ${y-3} Z`} fill="#ef4444" />
          {/* Keyhole */}
          <circle cx={x} cy={y-4} r={2.5} fill="#f8fafc" />
          <polygon points={`${x-2},${y-3} ${x+2},${y-3} ${x+1},${y+2} ${x-1},${y+2}`} fill="#f8fafc" />
        </g>
      );

    case 'mystery-chest-software-basics':
      return (
        <g id="mystery-chest-scene">
          <ellipse cx={x} cy={y + 18} rx={22} ry={8} fill="rgba(234, 179, 8, 0.18)" filter="blur(4px)" />
          <path 
            d={`M ${x - 15} ${y + 5} L ${x} ${y + 13} L ${x} ${y + 23} L ${x - 15} ${y + 15} Z`} 
            fill="url(#chest-body-left)" 
            stroke="#1e293b" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x} ${y + 13} L ${x + 15} ${y + 5} L ${x + 15} ${y + 15} L ${x} ${y + 23} Z`} 
            fill="url(#chest-body-right)" 
            stroke="#0f172a" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x - 15} ${y + 5} L ${x} ${y - 3} L ${x} ${y + 13} L ${x - 15} ${y + 5} Z`} 
            fill="url(#chest-lid-left)" 
            stroke="#1e293b" 
            strokeWidth="0.5"
          />
          <path 
            d={`M ${x} ${y - 3} L ${x + 15} ${y + 5} L ${x + 15} ${y + 15} L ${x} ${y + 13} Z`} 
            fill="url(#chest-lid-right)" 
            stroke="#0f172a" 
            strokeWidth="0.5"
          />
          <path d={`M ${x - 12} ${y + 3.5} L ${x - 12} ${y + 13.5}`} stroke="#06b6d4" strokeWidth="1" filter="drop-shadow(0 0 2px #06b6d4)" />
          <path d={`M ${x + 12} ${y + 3.5} L ${x + 12} ${y + 13.5}`} stroke="#06b6d4" strokeWidth="1" filter="drop-shadow(0 0 2px #06b6d4)" />
          <path 
            d={`M ${x - 2.5} ${y + 9} L ${x + 2.5} ${y + 9} L ${x + 1.5} ${y + 16} L ${x - 1.5} ${y + 16} Z`} 
            fill="url(#sword-hilt-grad)" 
            stroke="#78350f" 
            strokeWidth="0.5"
          />
          <circle cx={x} cy={y + 12.5} r={1.2} fill="#111827" />
          <path 
            d={`M ${x - 14.5} ${y + 5} L ${x} ${y + 13} L ${x + 14.5} ${y + 5}`} 
            fill="none" 
            stroke="#eab308" 
            strokeWidth="1.2" 
            opacity="0.85" 
            filter="drop-shadow(0 0 3px #eab308)"
          />
        </g>
      );

    case 'data-representation':
      return (
        <g id="data-repr-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(56, 189, 248, 0.2)" filter="blur(3px)" />
          {/* Binary display chip */}
          <rect x={x - 14} y={y - 12} width={28} height={22} rx={3} fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Binary digits */}
          <text x={x - 10} y={y - 3} fill="#9fef00" fontSize="7" fontFamily="monospace" fontWeight="bold">0 1 0 1</text>
          <text x={x - 10} y={y + 5} fill="#38bdf8" fontSize="7" fontFamily="monospace" fontWeight="bold">1 0 1 0</text>
          {/* LED dots on chip */}
          <circle cx={x - 10} cy={y - 8} r={1} fill="#9fef00" filter="drop-shadow(0 0 2px #9fef00)" />
          <circle cx={x - 6} cy={y - 8} r={1} fill="#ef4444" />
          <circle cx={x - 2} cy={y - 8} r={1} fill="#9fef00" filter="drop-shadow(0 0 2px #9fef00)" />
          <circle cx={x + 2} cy={y - 8} r={1} fill="#ef4444" />
        </g>
      );

    case 'data-encoding':
      return (
        <g id="data-encode-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(168, 85, 247, 0.2)" filter="blur(3px)" />
          {/* Encoding conversion tablet */}
          <rect x={x - 14} y={y - 14} width={28} height={24} rx={2} fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
          {/* A → 65 conversion */}
          <text x={x - 10} y={y - 4} fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="bold">A</text>
          <text x={x - 2} y={y - 3} fill="#a855f7" fontSize="6" fontFamily="monospace">→</text>
          <text x={x + 2} y={y - 4} fill="#9fef00" fontSize="8" fontFamily="monospace" fontWeight="bold">65</text>
          {/* UTF-8 label */}
          <text x={x - 9} y={y + 6} fill="#94a3b8" fontSize="5" fontFamily="monospace">UTF-8</text>
        </g>
      );

    case 'python-simple-demo':
      return (
        <g id="python-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(59, 130, 246, 0.2)" filter="blur(3px)" />
          {/* Python logo-inspired snake */}
          <rect x={x - 14} y={y - 12} width={28} height={22} rx={3} fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
          {/* Python text */}
          <text x={x - 8} y={y - 2} fill="#fbbf24" fontSize="6" fontFamily="monospace" fontWeight="bold">py</text>
          <text x={x - 2} y={y - 2} fill="#3b82f6" fontSize="6" fontFamily="monospace">thon</text>
          {/* Code snippet hint */}
          <text x={x - 10} y={y + 6} fill="#9fef00" fontSize="4.5" fontFamily="monospace">print()</text>
        </g>
      );

    case 'javascript-simple-demo':
      return (
        <g id="js-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(250, 204, 21, 0.2)" filter="blur(3px)" />
          {/* JS badge */}
          <rect x={x - 12} y={y - 12} width={24} height={22} rx={2} fill="#fbbf24" stroke="#b45309" strokeWidth="1" />
          <text x={x - 7} y={y + 4} fill="#1e293b" fontSize="14" fontFamily="monospace" fontWeight="bold">JS</text>
        </g>
      );

    case 'databases-sql':
    case 'database-sql-basics':
      return (
        <g id="sql-scene">
          <ellipse cx={x} cy={y + 17} rx={22} ry={8} fill="rgba(34, 197, 94, 0.2)" filter="blur(3px)" />
          {/* Database cylinder */}
          <ellipse cx={x} cy={y - 10} rx={14} ry={5} fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
          <rect x={x - 14} y={y - 10} width={28} height={18} fill="#1e293b" stroke="none" />
          <line x1={x - 14} y1={y - 10} x2={x - 14} y2={y + 8} stroke="#22c55e" strokeWidth="1.5" />
          <line x1={x + 14} y1={y - 10} x2={x + 14} y2={y + 8} stroke="#22c55e" strokeWidth="1.5" />
          <ellipse cx={x} cy={y + 8} rx={14} ry={5} fill="#1e293b" stroke="#22c55e" strokeWidth="1.5" />
          {/* Middle ring */}
          <ellipse cx={x} cy={y - 1} rx={14} ry={5} fill="none" stroke="#22c55e" strokeWidth="0.5" opacity="0.4" />
          {/* SQL text */}
          <text x={x - 7} y={y + 2} fill="#9fef00" fontSize="6" fontFamily="monospace" fontWeight="bold">SQL</text>
        </g>
      );

    default:
      return (
        <g id="default-device">
          <ellipse cx={x} cy={y + 17} rx={16} ry={6} fill="rgba(148, 163, 184, 0.15)" filter="blur(3px)" />
          <rect x={x - 8} y={y - 8} width={16} height={16} fill="#475569" rx="2" />
          <circle cx={x} cy={y} r={3} fill="#94a3b8" />
        </g>
      );
  }
};

interface LineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// Main room drawing function, including shadows, platform base, hover effects, and unique 3D objects
const renderIsometricRoom = (
  topicId: string,
  x: number,
  y: number,
  isCompleted: boolean,
  isHovered: boolean,
  viewMode: 'desktop' | 'mobile'
) => {
  const strokeColor = isHovered || isCompleted ? "#9fef00" : "#3d5075";
  const strokeWidth = isHovered || isCompleted ? "1.5" : "1";
  const glowFilter = isHovered || isCompleted ? "drop-shadow(0 0 5px rgba(159,239,0,0.7))" : "none";
  
  const topFill = isCompleted ? "url(#platform-top-completed)" : "url(#platform-top-uncompleted)";
  const leftFill = "url(#platform-left-shaded)";
  const rightFill = "url(#platform-right-shaded)";

  return (
    <g id={`isometric-room-group-${viewMode}-${topicId}`}
       style={{
         transform: 'scale(1.25)',
         transformOrigin: `${x}px ${y + 17}px`
       }}
    >
      {/* 1. Base Ground Shadow */}
      <ellipse
        cx={x}
        cy={y + 32}
        rx={36}
        ry={11}
        fill={isCompleted ? "rgba(159, 239, 0, 0.2)" : "rgba(0, 0, 0, 0.45)"}
        className="transition-all duration-300"
        style={{
          transform: isHovered ? 'scale(0.85) translateY(2px)' : 'scale(1)',
          transformOrigin: `${x}px ${y + 32}px`
        }}
      />

      {/* 2. Platform Lifting Container */}
      <g
        className="transition-all duration-300 ease-out"
        style={{
          transform: isHovered ? 'translateY(-12px)' : 'translateY(0px)',
          transformOrigin: `${x}px ${y}px`
        }}
      >
        {/* Left Platform Side */}
        <path
          d={`M ${x - 45} ${y + 17} L ${x} ${y + 29} L ${x} ${y + 37} L ${x - 45} ${y + 25} Z`}
          fill={leftFill}
          stroke={isCompleted ? "rgba(159,239,0,0.12)" : "#1e293d"}
          strokeWidth="0.5"
        />

        {/* Right Platform Side */}
        <path
          d={`M ${x} ${y + 29} L ${x + 45} ${y + 17} L ${x + 45} ${y + 25} L ${x} ${y + 37} Z`}
          fill={rightFill}
          stroke={isCompleted ? "rgba(159,239,0,0.08)" : "#131b29"}
          strokeWidth="0.5"
        />

        {/* Top Platform Rhombus Face */}
        <path
          id={`platform-top-${viewMode}-${topicId}`}
          d={`M ${x} ${y + 5} L ${x + 45} ${y + 17} L ${x} ${y + 29} L ${x - 45} ${y + 17} Z`}
          fill={topFill}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          filter={glowFilter}
          className="transition-all duration-300"
        />

        {/* --- UNIQUE 3D ISOMETRIC OBJECT ON TOP --- */}
        <g style={{
           transform: 'scale(1.45)',
           transformOrigin: `${x}px ${y + 17}px`
        }}>
          {renderUniqueIsometricObject(topicId, x, y, isCompleted, isHovered)}
        </g>
      </g>
    </g>
  );
};

export default function ModuleMap({
  modules,
  courseName,
  onBack,
  onTopicClick,
}: ModuleMapProps) {
  const [hoveredTopicId, setHoveredTopicId] = useState<string | null>(null);

  return (
    <div className="flex-1 flex flex-col space-y-12 py-4 animate-fadeIn" id="module-map-container">
      {/* Hidden global SVG providing premium isometric gradient definitions shared across all rooms */}
      <svg width="0" height="0" className="absolute pointer-events-none opacity-0" id="global-isometric-gradients">
        <defs>
          {/* Platform top completed: navy base with soft green tint */}
          <linearGradient id="platform-top-completed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3229" />
            <stop offset="100%" stopColor="#11181c" />
          </linearGradient>

          {/* Platform top uncompleted: dark navy */}
          <linearGradient id="platform-top-uncompleted" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f293d" />
            <stop offset="100%" stopColor="#151b29" />
          </linearGradient>

          {/* Platform sides */}
          <linearGradient id="platform-left-shaded" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#161f30" />
            <stop offset="100%" stopColor="#0d1420" />
          </linearGradient>
          <linearGradient id="platform-right-shaded" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#101724" />
            <stop offset="100%" stopColor="#0a0e17" />
          </linearGradient>

          {/* Sword */}
          <linearGradient id="sword-blade-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fca5a5" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <linearGradient id="sword-blade-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
          <linearGradient id="sword-hilt-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="sword-pommel-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Shield */}
          <linearGradient id="shield-grad-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="shield-grad-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>

          {/* Briefcase */}
          <linearGradient id="briefcase-body-left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <linearGradient id="briefcase-body-right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#1c1917" />
          </linearGradient>
          <linearGradient id="briefcase-body-top" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#92400e" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Mystery Chest */}
          <linearGradient id="chest-body-left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="chest-body-right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="chest-lid-left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="chest-lid-right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Server */}
          <linearGradient id="server-body-left" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="server-body-right" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Flame */}
          <linearGradient id="fire-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="60%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>

          {/* Web anatomy */}
          <linearGradient id="web-pane-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>
      </svg>
      {/* Intro Heading Section */}
      <div className="text-left select-none" id="module-list-heading">
        {onBack && (
          <button 
            onClick={onBack}
            className="mb-6 flex items-center space-x-2 text-gray-400 hover:text-[#9fef00] transition-colors font-mono text-xs uppercase tracking-widest cursor-pointer"
          >
            <span>&larr; Back to Courses</span>
          </button>
        )}
        <div className="flex items-center space-x-2 text-[#9fef00] font-mono text-xs uppercase tracking-widest mb-1.5">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>Curriculum Map</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight font-sans">
          {courseName || 'My Cybersecurity Notes'}
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-2xl leading-relaxed font-sans">
          Traverse the training grid. Click on any active 3D isometric platform to inspect detailed mindmaps, take notes, and clear technical recall tasks.
        </p>
      </div>

      {/* Modules List */}
      <div className="space-y-12" id="modules-grid">
        {modules.map((module, mIdx) => {
          const isFuture = !!module.isFuture;
          const totalCount = module.topics.length;

          // Compute dynamic height for the SVG container based on the number of topics
          const ySpacing = 140;
          const mapHeight = totalCount > 0 ? 160 + (totalCount - 1) * ySpacing : 120;

          // Compute coordinate points for each topic
          const points = module.topics.map((_, idx) => {
            const x = (idx % 2 === 0) ? 120 : 380;
            const y = 80 + idx * ySpacing;
            return { x, y };
          });

          // Generate SVG segments to connect the steps in sequence
          const getDesktopSegments = () => {
            const segments: LineSegment[] = [];
            for (let i = 0; i < points.length - 1; i++) {
              const x1 = points[i].x;
              const y1 = points[i].y + 17;
              const x2 = points[i+1].x;
              const y2 = points[i+1].y + 17;

              // Anchor points at the platform's exact outer horizontal tips
              const startOnLeft = (i % 2 === 0);
              const startX = startOnLeft ? x1 + 45 : x1 - 45;
              const startY = y1;
              const endX = startOnLeft ? x2 - 45 : x2 + 45;
              const endY = y2;

              segments.push({
                x1: startX,
                y1: startY,
                x2: endX,
                y2: endY
              });
            }
            return segments;
          };
          const segments = getDesktopSegments();

          // Compact mobile zigzag geometry (smaller horizontal amplitude ~29/71%,
          // so the alternating path survives on narrow screens instead of collapsing)
          const mLeftX = 100;
          const mRightX = 240;
          const mYSpacing = 145;
          const mMapHeight = totalCount > 0 ? 150 + (totalCount - 1) * mYSpacing : 120;
          const mPoints = module.topics.map((_, idx) => ({
            x: idx % 2 === 0 ? mLeftX : mRightX,
            y: 60 + idx * mYSpacing,
          }));
          const mSegments: LineSegment[] = [];
          for (let i = 0; i < mPoints.length - 1; i++) {
            const startOnLeft = i % 2 === 0;
            const y1 = mPoints[i].y + 17;
            const y2 = mPoints[i + 1].y + 17;
            mSegments.push({
              x1: startOnLeft ? mPoints[i].x + 42 : mPoints[i].x - 42,
              y1,
              x2: startOnLeft ? mPoints[i + 1].x - 42 : mPoints[i + 1].x + 42,
              y2,
            });
          }

          return (
            <div 
              key={module.id} 
              className={`relative bg-[#1c2538]/60 backdrop-blur-md rounded-2xl border border-[#2d3a54] p-6 shadow-2xl transition-all duration-300 ${
                isFuture ? 'opacity-60 border-dashed hover:opacity-80' : 'hover:border-[#2d3a54]/80'
              }`}
              id={`module-card-${module.id}`}
            >
              {/* Module Heading & Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#2d3a54]/60 pb-4 mb-8 text-left gap-2 select-none">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <span className="text-gray-500 font-mono text-sm mr-1">
                      {String(mIdx + 1).padStart(2, '0')}
                    </span>
                    <span>{module.title}</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 max-w-xl font-sans">
                    {module.description}
                  </p>
                </div>

                {/* Module Topics Count Badge */}
                {!isFuture && totalCount > 0 && (
                  <div className="flex items-center space-x-2 bg-[#161c2c] px-3.5 py-1.5 rounded-lg border border-[#2d3a54] text-xs font-mono">
                    <span className="text-gray-400">Rooms:</span>
                    <span className="font-bold text-gray-300">
                      {totalCount}
                    </span>
                  </div>
                )}

                {isFuture && (
                  <span className="bg-[#161c2c] text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase self-start sm:self-center">
                    Future Module
                  </span>
                )}
              </div>

              {/* 3D Isometric Pathway Section */}
              {totalCount > 0 ? (
                <div className="relative w-full overflow-hidden py-4" id={`3d-path-section-${module.id}`}>
                  
                  {/* DESKTOP VIEW: Beautiful SVG Pathway */}
                  <div className="hidden md:flex justify-center w-full">
                    {/* Embedded styles for laser line flow animation */}
                    <style>{`
                      @keyframes crawl-${module.id} {
                        to {
                          stroke-dashoffset: -20;
                        }
                      }
                      .neon-path-${module.id} {
                        stroke-dasharray: 6, 8;
                        animation: crawl-${module.id} 1.2s linear infinite;
                      }
                    `}</style>

                    <svg 
                      width="500" 
                      height={mapHeight} 
                      viewBox={`0 0 500 ${mapHeight}`} 
                      className="w-full max-w-[500px] h-auto drop-shadow-lg overflow-visible"
                    >
                      <defs>
                        {/* Soft Shadow Blur */}
                        <filter id={`shadow-blur-${module.id}`} x="-30%" y="-30%" width="160%" height="160%">
                          <feGaussianBlur stdDeviation="5" />
                        </filter>

                        {/* Completed Cube Face Gradients (Dark Navy base with a soft neon-green top tint) */}
                        <linearGradient id={`cube-top-completed-${module.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#253c45" /> {/* Dark navy-blue with a 10-15% green tint */}
                          <stop offset="100%" stopColor="#1c2834" />
                        </linearGradient>
                        <linearGradient id={`cube-left-completed-${module.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#1e293d" /> {/* Dark side face identical to uncompleted */}
                          <stop offset="100%" stopColor="#141b29" />
                        </linearGradient>
                        <linearGradient id={`cube-right-completed-${module.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#141b29" /> {/* Dark side face identical to uncompleted */}
                          <stop offset="100%" stopColor="#0d121c" />
                        </linearGradient>

                        {/* Uncompleted Cube Face Gradients */}
                        <linearGradient id={`cube-top-uncompleted-${module.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2c3954" />
                          <stop offset="100%" stopColor="#1f293d" />
                        </linearGradient>
                        <linearGradient id={`cube-left-uncompleted-${module.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#1e293d" />
                          <stop offset="100%" stopColor="#141b29" />
                        </linearGradient>
                        <linearGradient id={`cube-right-uncompleted-${module.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#141b29" />
                          <stop offset="100%" stopColor="#0d121c" />
                        </linearGradient>
                      </defs>

                      {/* Ground Layer Connection Cable Paths */}
                      <g id="path-connection-lines">
                        {segments.map((seg, sIdx) => (
                          <g key={sIdx} id={`desktop-segment-${module.id}-${sIdx}`}>
                            {/* Underglow Cable */}
                            <line 
                              x1={seg.x1} 
                              y1={seg.y1} 
                              x2={seg.x2} 
                              y2={seg.y2} 
                              fill="none" 
                              stroke="#2d3a54" 
                              strokeWidth="6" 
                              strokeLinecap="round" 
                              opacity="0.6"
                            />
                            {/* Laser Cable (Neon green dashes crawling) */}
                            <line 
                              x1={seg.x1} 
                              y1={seg.y1} 
                              x2={seg.x2} 
                              y2={seg.y2} 
                              fill="none" 
                              stroke="#9fef00" 
                              strokeWidth="3.5" 
                              strokeLinecap="round" 
                              className={`neon-path-${module.id} filter drop-shadow-[0_0_5px_rgba(159,239,0,0.8)]`}
                              opacity="0.85"
                            />
                          </g>
                        ))}
                      </g>

                      {/* Interactive 3D Nodes */}
                      {module.topics.map((topic, idx) => {
                                                const isCompleted = false;
                        const isHovered = hoveredTopicId === topic.id;
                        const x = points[idx].x;
                        const y = points[idx].y;

                        return (
                          <g
                            key={topic.id}
                            onMouseEnter={() => setHoveredTopicId(topic.id)}
                            onMouseLeave={() => setHoveredTopicId(null)}
                            onClick={() => onTopicClick(topic)}
                            className="cursor-pointer group"
                            id={`isometric-node-${topic.id}`}
                          >
                            {renderIsometricRoom(topic.id, x, y, isCompleted, isHovered, 'desktop')}

                            {/* 3. Simplified Name Label (Alt-sides: Left-aligned vs Right-aligned with exact 28px gap & 100% vertical center) */}
                            <foreignObject
                              x={idx % 2 === 0 ? x + 73 : x - 313}
                              y={y - 13}
                              width={240}
                              height={50}
                              className="pointer-events-none"
                            >
                              <div className={`flex items-center h-full select-none ${
                                idx % 2 === 0 ? 'justify-start text-left' : 'justify-end text-right'
                              }`}>
                                <span className={`text-sm font-extrabold tracking-tight transition-colors duration-200 leading-snug font-sans ${
                                  isHovered 
                                    ? 'text-[#9fef00] drop-shadow-[0_0_8px_rgba(159,239,0,0.6)]' 
                                    : 'text-gray-200'
                                }`}>
                                  {topic.title}
                                </span>
                                
                              </div>
                            </foreignObject>

                            

                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* MOBILE VIEW: Compact SVG zigzag (same alternating path as desktop, smaller amplitude) */}
                  <div className="md:hidden flex justify-center w-full" id={`mobile-path-container-${module.id}`}>
                    <svg
                      width="340"
                      height={mMapHeight}
                      viewBox={`0 0 340 ${mMapHeight}`}
                      className="w-full max-w-[340px] h-auto drop-shadow-lg overflow-visible"
                    >
                      {/* Ground Layer Connection Cable Paths */}
                      <g id={`mobile-path-connection-lines-${module.id}`}>
                        {mSegments.map((seg, sIdx) => (
                          <g key={sIdx} id={`mobile-segment-${module.id}-${sIdx}`}>
                            {/* Underglow Cable */}
                            <line
                              x1={seg.x1}
                              y1={seg.y1}
                              x2={seg.x2}
                              y2={seg.y2}
                              stroke="#2d3a54"
                              strokeWidth="5"
                              strokeLinecap="round"
                              opacity="0.6"
                            />
                            {/* Laser Cable (Neon green dashes crawling) */}
                            <line
                              x1={seg.x1}
                              y1={seg.y1}
                              x2={seg.x2}
                              y2={seg.y2}
                              stroke="#9fef00"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              className={`neon-path-${module.id} filter drop-shadow-[0_0_4px_rgba(159,239,0,0.8)]`}
                              opacity="0.85"
                            />
                          </g>
                        ))}
                      </g>

                      {/* Interactive 3D Nodes */}
                      {module.topics.map((topic, idx) => {
                        const isCompleted = false;
                        const isHovered = hoveredTopicId === topic.id;
                        const x = mPoints[idx].x;
                        const y = mPoints[idx].y;

                        return (
                          <g
                            key={topic.id}
                            onClick={() => onTopicClick(topic)}
                            onMouseEnter={() => setHoveredTopicId(topic.id)}
                            onMouseLeave={() => setHoveredTopicId(null)}
                            className="cursor-pointer group"
                            id={`mobile-node-${topic.id}`}
                          >
                            {renderIsometricRoom(topic.id, x, y, isCompleted, isHovered, 'mobile')}

                            {/* Centered label beneath each icon (wraps to 2 lines, no clipping) */}
                            <foreignObject
                              x={x - 80}
                              y={y + 32}
                              width={160}
                              height={46}
                              className="pointer-events-none"
                            >
                              <div className="flex items-start justify-center h-full text-center px-1 select-none">
                                <span className={`text-[13px] font-extrabold tracking-tight leading-snug font-sans line-clamp-2 transition-colors duration-200 ${
                                  isHovered
                                    ? 'text-[#9fef00] drop-shadow-[0_0_8px_rgba(159,239,0,0.6)]'
                                    : 'text-gray-200'
                                }`}>
                                  {topic.title}
                                </span>
                              </div>
                            </foreignObject>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                </div>
              ) : (
                /* Locked / Placeholder Fallback card */
                <div className="bg-[#161c2c] border border-dashed border-[#2d3a54] rounded-2xl p-8 text-center text-gray-500 font-mono text-xs select-none">
                  <span>[ MODULE ENCRYPTED // RELEASING SOON ]</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
