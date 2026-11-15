'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Eye,
  EyeOff,
  FileSpreadsheet,
  FileText,
  LayoutDashboard,
  Lightbulb,
  ListTodo,
  LockKeyhole,
  LogOut,
  Menu,
  MessageCircle,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Plus,
  Presentation,
  Search,
  Settings,
  Sun,
  User,
  X
} from 'lucide-react';
import NotificationDropdown from '../../../components/notification-dropdown';
import { STARTUP_NAV_ITEMS } from '../../../components/startup-sidebar';
import { FormaMark, FormaSteps, FormaWordmark } from '../../forma-brand';
import '../../forma.css';

const STAGES = ['Idea', 'Prototype', 'Early revenue', 'Mature'];
const STAGE_ITEMS = [
  'Problem and customer interviews',
  'Define your ideal customer profile',
  'Build and test your prototype',
  'Document product-market evidence',
  'Map competitors and positioning',
  'Prepare a repeatable sales motion'
];
const INITIAL_TASKS = [
  { title: 'Finalize pricing model', who: 'AK', due: 'Today', state: 'soon' },
  { title: 'Review customer interview notes', who: 'PM', due: 'Tomorrow', state: 'normal' },
  { title: 'Update pitch deck traction slide', who: 'AK', due: 'Overdue', state: 'late' }
];
const MILESTONES = [
  ['Prototype test', '12 Nov', 'Now', 'blue'],
  ['Beta launch', '01 Dec', 'Next', 'warm'],
  ['First 10 customers', '15 Jan', 'Later', 'quiet'],
  ['Seed round', '01 Mar', 'Later', 'quiet']
];
const ACTIVITY = [
  ['check', 'Mentor signed off unit economics', '12 min ago'],
  ['file', 'Priya uploaded Pitch deck v3', '1 hour ago'],
  ['eye', 'Investor viewed your data room', 'Yesterday'],
  ['chat', 'Customer feedback added to research', 'Yesterday']
];
const DOCS = [
  [Presentation, 'Pitch deck v3', 'Updated today'],
  [FileSpreadsheet, 'Financial model', 'Updated yesterday'],
  [FileText, 'Product brief', '30 Oct']
];

function RailContent({ compact = false, stage, stageIndex, onCollapse, onClose, showCollapse = true, onAction }) {
  return (
    <>
      <div className="rail-brand">
        <Link href="/startup/dashboard" className="rail-brand-link" aria-label="Forma dashboard">
          <FormaMark />
          <FormaWordmark className="rail-wordmark" />
        </Link>
        {onClose && (
          <button type="button" className="rail-close" onClick={onClose} aria-label="Close navigation">
            <X size={16} />
          </button>
        )}
      </div>

      {!compact && <p className="rail-section">Startup</p>}

      <nav className="rail-nav" aria-label="Startup workspace">
        {STARTUP_NAV_ITEMS.map(([label, Icon, url]) => {
          const isActive = label === 'Dashboard';
          return (
            <Link
              key={label}
              href={url}
              title={compact ? label : undefined}
              className={`rail-link ${isActive ? 'is-active' : ''}`}
            >
              <Icon size={17} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="rail-foot">
        {!compact && (
          <div className="rail-stage">
            <div className="rail-stage-head">
              <span>Current stage</span>
              <b>{stage}</b>
            </div>
            <FormaSteps active={stageIndex} labels={false} tone="deep" />
          </div>
        )}
        {showCollapse && (
          <button
            type="button"
            className="rail-collapse-btn"
            onClick={onCollapse}
            aria-label={compact ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {compact ? <ChevronsRight size={15} /> : <><ChevronsLeft size={15} /> Collapse</>}
          </button>
        )}
        <Link href="/startup/user-profile" className="rail-profile">
          <span className="avatar on-deep">AK</span>
          <div>
            <b>Aarav Kapoor</b>
            <small>Founder · Acme Studio</small>
          </div>
        </Link>
      </div>
    </>
  );
}

export default function StartupDashboard() {
  const [compact, setCompact] = useState(false);
  const [darkmode, setDarkmode] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [tab, setTab] = useState('My tasks');
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState('Prototype');
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState([true, true, false, true, false, false]);
  const [profileOpen, setProfileOpen] = useState(false);
  const [today, setToday] = useState('');
  const [greeting, setGreeting] = useState('Good evening');
  const toastTimer = useRef(null);

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    setGreeting(hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening');
    setToday(
      new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(now)
    );
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMobile(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const showToast = (message) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  };

  const stageIndex = STAGES.indexOf(stage);
  const done = checked.filter(Boolean).length;
  const readiness = 72;
  const ringLength = 2 * Math.PI * 38;

  const metrics = [
    { label: 'Readiness score', value: readiness, unit: '/ 100', detail: '+5 this month', bar: readiness },
    { label: 'Monthly recurring revenue', value: '₹4.8L', unit: '', detail: '+12% vs last month', tone: '' },
    { label: 'Runway', value: '9', unit: 'months', detail: 'Burn ₹3.1L / mo', tone: 'neutral' },
    { label: 'Open tasks', value: '14', unit: '', detail: '3 due this week', tone: 'warn' }
  ];

  return (
    <div className={`forma forma-dash ${darkmode ? 'forma-dark' : ''}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <aside className={`dash-rail ${compact ? 'is-compact' : ''}`}>
        <RailContent
          compact={compact}
          stage={stage}
          stageIndex={stageIndex}
          onCollapse={() => setCompact(!compact)}
          onAction={showToast}
        />
      </aside>

      {mobile && (
        <div className="rail-scrim" onClick={() => setMobile(false)}>
          <aside
            className="rail-mobile"
            aria-label="Startup navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <RailContent
              stage={stage}
              stageIndex={stageIndex}
              showCollapse={false}
              onClose={() => setMobile(false)}
              onAction={showToast}
            />
          </aside>
        </div>
      )}

      <header className={`dash-top ${compact ? 'is-compact' : ''}`}>
        <div className="top-left">
          <button
            type="button"
            className="icon-btn mobile-only"
            onClick={() => setMobile(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={18} />
          </button>
          <Link href="/startup/dashboard" className="top-brand" aria-label="Forma dashboard">
            <FormaWordmark />
          </Link>
          <label className="dash-search">
            <Search size={15} />
            <input
              aria-label="Search workspace"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search workspace"
            />
          </label>
        </div>

        <div className="top-right">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setDarkmode(!darkmode)}
            aria-label={darkmode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkmode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <div className="notif-wrap">
            <NotificationDropdown role="startup" />
          </div>
          <div className="profile-wrap">
            <button
              type="button"
              className="profile-btn"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-expanded={profileOpen}
              aria-label="Account menu"
            >
              <span className="avatar">AK</span>
              <span className="profile-txt">
                <b>Aarav Kapoor</b>
                <small>Founder</small>
              </span>
              <ChevronDown size={14} />
            </button>
            {profileOpen && (
              <div className="profile-menu">
                <div className="profile-menu-head">
                  <b>Aarav Kapoor</b>
                  <small>Founder · Acme Studio</small>
                </div>
                <Link href="/startup/user-profile" onClick={() => setProfileOpen(false)}>
                  <User size={14} /> My founder profile
                </Link>
                <Link href="/startup/profile" onClick={() => setProfileOpen(false)}>
                  <Building2 size={14} /> Company profile
                </Link>
                <Link href="/startup/community" onClick={() => setProfileOpen(false)}>
                  <MessageSquare size={14} /> Community
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    showToast('Account settings will be available soon.');
                  }}
                >
                  <Settings size={14} /> Account settings
                </button>
                <Link href="/login" className="danger" onClick={() => setProfileOpen(false)}>
                  <LogOut size={14} /> Sign out
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main id="main" className={`dash-main ${compact ? 'is-compact' : ''}`}>
        <div className="dash-inner">
          <div className="dash-greet">
            <div>
              {today && <p className="dash-date">{today}</p>}
              <h1 className="forma-display">{greeting}, Aarav.</h1>
              <p className="dash-lede">
                <b>Acme Studio</b> is building at the Prototype stage. Here is what needs you next.
              </p>
            </div>
            <Link href="/startup/team" className="f-btn f-btn-blue">
              <Plus size={16} /> Invite a teammate
            </Link>
          </div>

          <section className="stage-band" aria-labelledby="stage-heading">
            <div>
              <p className="stage-label">Current stage</p>
              <div className="stage-title-row">
                <h2 id="stage-heading" className="forma-display">
                  {stage}
                </h2>
                <label className="stage-select">
                  <select
                    aria-label="Change startup stage"
                    value={stage}
                    onChange={(event) => {
                      setStage(event.target.value);
                      showToast(`Stage updated to ${event.target.value}.`);
                    }}
                  >
                    {STAGES.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} />
                </label>
              </div>
              <p className="stage-note">
                {stageIndex < STAGES.length - 1 ? (
                  <>
                    Next up is <b>{STAGES[stageIndex + 1]}</b>. {done} of 10 exit criteria are met.
                  </>
                ) : (
                  <>You have reached the final stage. Keep the machine running.</>
                )}
              </p>
              <Link href="/startup/stage" className="stage-action">
                View exit criteria <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="stage-track">
              <FormaSteps active={stageIndex} tone="deep" />
            </div>
          </section>

          <section className="stat-strip" aria-label="Key metrics">
            {metrics.map((metric) => (
              <div className="stat-cell" key={metric.label}>
                <p className="stat-label">{metric.label}</p>
                <div className="stat-value">
                  <span className="num">{metric.value}</span>
                  {metric.unit && <small>{metric.unit}</small>}
                </div>
                {metric.bar && (
                  <div className="stat-bar" aria-hidden="true">
                    <span style={{ width: `${metric.bar}%` }} />
                  </div>
                )}
                <p className={`stat-detail ${metric.tone || ''}`}>{metric.detail}</p>
              </div>
            ))}
          </section>

          <div className="dash-grid">
            <section className="fpanel span-5" aria-labelledby="focus-heading">
              <div className="panel-head">
                <h2 id="focus-heading">Focus</h2>
                <Link href="/startup/tasks" className="panel-action">
                  <Plus size={13} /> New task
                </Link>
              </div>
              <div className="forma-tabs" role="tablist" aria-label="Task views">
                {['My tasks', 'Team', 'Milestones'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={tab === item}
                    onClick={() => setTab(item)}
                    className={tab === item ? 'is-active' : ''}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {tab === 'Milestones' ? (
                <div>
                  {MILESTONES.map(([name, date, state, tone]) => (
                    <div className="list-row" key={name}>
                      <span>{name}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="panel-quiet">{date}</span>
                        <span className={`chip ${tone === 'blue' ? '' : tone}`}>{state}</span>
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  {tasks.map((task, index) => (
                    <div className="task-row" key={task.title}>
                      <input
                        type="checkbox"
                        aria-label={`Complete ${task.title}`}
                        checked={!!task.done}
                        onChange={() =>
                          setTasks(tasks.map((item, i) => (i === index ? { ...item, done: !item.done } : item)))
                        }
                      />
                      <span className={`task-title ${task.done ? 'done' : ''}`}>{task.title}</span>
                      <span className="avatar soft">{tab === 'Team' ? ['AK', 'PM', 'SR'][index] : task.who}</span>
                      <span className={`due ${task.state}`}>{task.due}</span>
                    </div>
                  ))}
                </div>
              )}

              <Link href="/startup/tasks" className="panel-foot-link">
                Open task board <ArrowRight size={13} />
              </Link>
            </section>

            <section className="fpanel span-4" aria-labelledby="checklist-heading">
              <div className="panel-head">
                <h2 id="checklist-heading">Stage checklist</h2>
                <Link href="/startup/stage" className="panel-action">
                  See all
                </Link>
              </div>
              <div className="progress-head">
                <span>{done} of 6 milestones complete</span>
                <b>{Math.round((done / 6) * 100)}%</b>
              </div>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow={Math.round((done / 6) * 100)}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Stage checklist progress"
              >
                <span style={{ width: `${(done / 6) * 100}%` }} />
              </div>
              <div>
                {STAGE_ITEMS.map((item, index) => (
                  <label className="check-item" key={item}>
                    <input
                      type="checkbox"
                      checked={checked[index]}
                      onChange={() =>
                        setChecked(checked.map((value, i) => (i === index ? !value : value)))
                      }
                    />
                    <span className={`check-label ${checked[index] ? 'done' : ''}`}>{item}</span>
                    <span className="avatar soft" style={{ width: 24, height: 24, fontSize: 9 }}>
                      {index % 2 ? 'PM' : 'AK'}
                    </span>
                  </label>
                ))}
              </div>
              <Link href="/startup/stage" className="panel-foot-link">
                Open stage toolkit <ArrowRight size={13} />
              </Link>
            </section>

            <section className="fpanel span-3" aria-labelledby="readiness-heading">
              <div className="panel-head">
                <h2 id="readiness-heading">Readiness</h2>
                <button
                  type="button"
                  className="panel-action"
                  onClick={() => showToast('Readiness combines checklist, traction and mentor feedback.')}
                  aria-label="About the readiness score"
                >
                  <MoreHorizontal size={16} />
                </button>
              </div>
              <div className="readiness-top">
                <div className="readiness-ring">
                  <svg width="94" height="94" viewBox="0 0 94 94" aria-hidden="true">
                    <circle className="ring-bg" cx="47" cy="47" r="38" />
                    <circle
                      className="ring-fill"
                      cx="47"
                      cy="47"
                      r="38"
                      strokeDasharray={ringLength}
                      strokeDashoffset={ringLength * (1 - readiness / 100)}
                    />
                  </svg>
                  <div className="readiness-center">
                    <div>
                      <b>{readiness}</b>
                      <small>of 100</small>
                    </div>
                  </div>
                </div>
                <div className="readiness-copy">
                  Strong investor signal. Three items still need mentor sign-off before the next round.
                </div>
              </div>
              <div className="subscores">
                {[
                  ['Checklist', 80],
                  ['Traction', 65],
                  ['Mentor feedback', 70]
                ].map(([name, value]) => (
                  <div key={name}>
                    <div className="subscore-head">
                      <span>{name}</span>
                      <b>{value}%</b>
                    </div>
                    <div className="subscore-bar">
                      <span style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="readiness-note">
                <Clock size={13} /> 3 items left for mentor sign-off
              </p>
              <Link href="/startup/readiness" className="panel-foot-link">
                Improve score <ArrowRight size={13} />
              </Link>
            </section>

            <section className="fpanel span-4" aria-labelledby="investor-heading">
              <div className="panel-head">
                <h2 id="investor-heading">Investor interest</h2>
                <button
                  type="button"
                  className="panel-action"
                  onClick={() => setVisible(!visible)}
                  aria-label={visible ? 'Make investor profile private' : 'Make investor profile visible'}
                >
                  {visible ? <Eye size={14} /> : <EyeOff size={14} />} {visible ? 'Visible' : 'Private'}
                </button>
              </div>
              {visible ? (
                <>
                  <div className="mini-stats">
                    {[
                      ['Views', '128'],
                      ['Shortlists', '12'],
                      ['Messages', '4']
                    ].map(([name, value]) => (
                      <div className="mini-stat" key={name}>
                        <b>{value}</b>
                        <small>{name}</small>
                      </div>
                    ))}
                  </div>
                  {[
                    ['Mira Ventures', 'Shortlisted', ''],
                    ['Northstar Capital', 'In talks', 'warm'],
                    ['SeedSpring', 'Viewed', 'quiet']
                  ].map(([name, state, tone]) => (
                    <div className="list-row" key={name}>
                      <span>{name}</span>
                      <span className={`chip ${tone}`}>{state}</span>
                    </div>
                  ))}
                </>
              ) : (
                <div className="private-box">
                  <LockKeyhole size={18} />
                  <p>Your profile is private</p>
                  <small>Make it visible to investors to see views, shortlists and messages.</small>
                  <button type="button" onClick={() => setVisible(true)}>
                    Make profile visible
                  </button>
                </div>
              )}
            </section>

            <section className="fpanel span-4" aria-labelledby="hiring-heading">
              <div className="panel-head">
                <h2 id="hiring-heading">Hiring</h2>
                <Link href="/startup/hiring" className="panel-action">
                  All roles <ArrowRight size={12} />
                </Link>
              </div>
              <div className="job-card">
                <div className="job-card-top">
                  <span className="job-icon">
                    <Briefcase size={16} />
                  </span>
                  <div style={{ flex: 1 }}>
                    <h3>Backend engineer</h3>
                    <p>12 applicants · Full time</p>
                  </div>
                  <MoreHorizontal size={16} color="var(--f-muted)" />
                </div>
                <Link href="/startup/hiring" className="ghost-btn">
                  Review applicants
                </Link>
              </div>
              <Link href="/startup/hiring/jobs/new" className="panel-foot-link">
                <Plus size={13} /> Post a job
              </Link>
            </section>

            <section className="fpanel span-4" aria-labelledby="mentor-heading">
              <div className="panel-head">
                <h2 id="mentor-heading">Your mentor</h2>
                <Link href="/startup/mentors" className="panel-action" aria-label="View mentor">
                  <ArrowUpRight size={14} />
                </Link>
              </div>
              <div className="mentor-row">
                <span className="avatar">RM</span>
                <div>
                  <b>Rhea Mukherjee</b>
                  <small>Go-to-market · SaaS</small>
                </div>
              </div>
              <div className="mentor-session">
                <CalendarDays size={14} color="var(--f-blue-text)" />
                <span>
                  Next session: <b>Thu, 4:00 PM</b>
                </span>
                <Link href="/startup/sessions">Sessions</Link>
              </div>
              <p className="panel-quiet" style={{ marginTop: 12 }}>
                4 of 6 readiness items signed off
              </p>
              <div className="progress-bar" style={{ marginTop: 6, marginBottom: 0 }}>
                <span style={{ width: '66%' }} />
              </div>
            </section>

            <section className="fpanel span-6" aria-labelledby="activity-heading">
              <div className="panel-head">
                <h2 id="activity-heading">Recent activity</h2>
                <Link href="/startup/analytics" className="panel-action">
                  View all
                </Link>
              </div>
              <div>
                {ACTIVITY.map(([type, text, time], index) => (
                  <div className="activity-row" key={text}>
                    <span className={`activity-icon ${index === 0 ? 'recent' : ''}`}>
                      {type === 'check' ? (
                        <CheckCircle2 size={14} />
                      ) : type === 'file' ? (
                        <FileText size={14} />
                      ) : type === 'eye' ? (
                        <Eye size={14} />
                      ) : (
                        <MessageCircle size={14} />
                      )}
                    </span>
                    <div>
                      <p>{text}</p>
                      <small>{time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="fpanel span-6" aria-labelledby="team-heading">
              <div className="panel-head">
                <h2 id="team-heading">Team &amp; documents</h2>
                <Link href="/startup/team" className="panel-action">
                  <Plus size={13} /> Invite
                </Link>
              </div>
              <div className="team-head">
                <div className="avatars">
                  <span className="avatar carbon">AK</span>
                  <span className="avatar">PM</span>
                  <span className="avatar" style={{ background: 'var(--f-bg)', color: 'var(--f-ink)' }}>
                    SR
                  </span>
                  <span className="avatar soft">+2</span>
                </div>
                <Link href="/startup/data-room" className="panel-quiet">
                  Open vault
                </Link>
              </div>
              <div>
                {DOCS.map(([Icon, name, date]) => (
                  <Link href="/startup/data-room" className="doc-row" key={name}>
                    <Icon size={15} />
                    <span>{name}</span>
                    <small>{date}</small>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <nav className="bottom-nav" aria-label="Quick navigation">
        <Link href="/startup/dashboard" className="is-active">
          <LayoutDashboard size={18} /> Home
        </Link>
        <Link href="/startup/tasks">
          <ListTodo size={18} /> Tasks
        </Link>
        <Link href="/startup/mentors">
          <Lightbulb size={18} /> Mentor
        </Link>
        <Link href="/startup/investors">
          <Briefcase size={18} /> Investors
        </Link>
        <button type="button" onClick={() => setMobile(true)}>
          <Menu size={18} /> More
        </button>
      </nav>

      {toast && (
        <div className="forma-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}
    </div>
  );
}
