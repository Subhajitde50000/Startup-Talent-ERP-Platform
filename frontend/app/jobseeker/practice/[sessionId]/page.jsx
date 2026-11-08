'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Mic,
  MicOff,
  Square,
  Play,
  RotateCcw,
  Sparkles,
  Volume2,
  Clock,
  ArrowRight,
  Pause,
  Camera,
  CameraOff,
  Eye,
  Activity,
  Smile,
  UserRound,
} from 'lucide-react';
import { JobSeekerShell } from '@/components';
import {
  JobBtn,
  defaultUser,
} from '@/components/jobseeker-ui';
import { practiceSessions } from '../../jobseeker-data';

export default function LivePracticeSessionPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.sessionId;
  const session = practiceSessions.find((s) => s.id === rawId) || practiceSessions[0];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  const questions = [
    {
      q: 'Tell me about a complex design system you architected and how you managed tokens across engineering teams.',
      followUp: 'Focus on how you handled brand variance and cross-platform token synchronization.',
    },
    {
      q: 'Describe a situation where engineering pushed back on a design specification. How did you resolve the trade-off?',
      followUp: 'Highlight collaborative resolution and balancing speed with UX fidelity.',
    },
    {
      q: 'How do you prioritize research and user testing in an early-stage startup where product roadmaps change weekly?',
      followUp: 'Showcase fast feedback loops and qualitative signal gathering.',
    },
  ];

  useEffect(() => {
    let interval = null;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const handleNextQuestion = () => {
    setIsRecording(false);
    setSeconds(0);
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      router.push(`/jobseeker/practice/${session.id}/report`);
    }
  };

  const currentQ = questions[currentQIndex];

  return (
    <JobSeekerShell active="Interview practice">
      <div className="space-y-6 max-w-4xl pb-10">
        {/* Header bar */}
        <header className="rounded-2xl border border-[#E5E1D8] bg-[#0F1B2D] p-5 text-white flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#B8955A] uppercase tracking-wider block mb-0.5">
              Live AI Practice Studio
            </span>
            <h1 className="text-lg md:text-xl font-serif font-bold text-white">
              {session.role} · {session.type}
            </h1>
            <p className="text-xs text-white/70 mt-0.5">
              Question {currentQIndex + 1} of {questions.length} ·{' '}
              {isStarted ? 'Practice in progress' : 'Ready to start'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-white/20 bg-white/10 px-3.5 py-1.5 flex items-center gap-2 text-xs">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isRecording ? 'bg-[#B42318] animate-pulse' : 'bg-white/40'
                }`}
              />
              <span className="font-mono text-sm font-semibold">{formatTimer(seconds)}</span>
            </div>

            <Link href="/jobseeker/practice">
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg border border-white/20 text-xs text-white/80 hover:bg-white/10"
              >
                Exit Session
              </button>
            </Link>
          </div>
        </header>

        {/* Question Prompter Card */}
        <section className="rounded-2xl border border-[#E5E1D8] bg-white p-8 md:p-10 shadow-sm text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FAF8F4] border border-[#E5E1D8] px-3.5 py-1 text-xs text-[#6B7280]">
            <Sparkles size={13} className="text-[#806236]" /> AI Interviewer Prompt
          </div>

          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#0F1B2D] max-w-2xl mx-auto leading-relaxed">
            "{currentQ.q}"
          </h2>

          <div className="rounded-xl border border-[#F0EBE0] bg-[#FAF8F4] p-4 max-w-lg mx-auto text-xs text-[#6B7280] space-y-1">
            <span className="font-semibold text-[#806236] block">Interviewer Hint:</span>
            <p>{currentQ.followUp}</p>
          </div>

          {!isStarted && (
            <div className="rounded-2xl border border-[#B8955A]/30 bg-[#FFFBF4] p-5">
              <p className="text-xs text-[#4A5568]">
                Start the practice when you are ready. Your camera preview and coaching indicators will appear during the session.
              </p>
              <button
                type="button"
                onClick={() => setIsStarted(true)}
                className="mx-auto mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0F1B2D] px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#1C2B42]"
              >
                <Play size={15} fill="currentColor" />
                Start Practice
              </button>
            </div>
          )}

          {/* Visual Coaching Area */}
          <div className={`grid gap-4 pt-2 text-left lg:grid-cols-[minmax(0,1.35fr)_minmax(220px,.65fr)] ${!isStarted ? 'opacity-60' : ''}`}>
            <div className="relative min-h-[230px] overflow-hidden rounded-2xl bg-[#17243A] shadow-inner">
              {cameraEnabled ? (
                <>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(184,149,90,.24),transparent_35%),linear-gradient(145deg,#263B5A,#0F1B2D)]" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0B1422]/80 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <span className="grid h-24 w-24 place-items-center rounded-full border-4 border-[#B8955A]/70 bg-[#D7B98A] text-2xl font-bold text-[#0F1B2D] shadow-lg">
                      AD
                    </span>
                    <span className="mt-3 rounded-full bg-black/30 px-3 py-1 text-[10px] font-medium backdrop-blur">
                      Camera preview
                    </span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/70">
                  <CameraOff size={28} />
                  <span className="text-xs">Camera is turned off</span>
                </div>
              )}

              <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/35 px-2.5 py-1 text-[10px] text-white backdrop-blur">
                <span className={`h-1.5 w-1.5 rounded-full ${cameraEnabled ? 'bg-[#55C98A]' : 'bg-white/40'}`} />
                {cameraEnabled ? 'Visual coaching active' : 'Visual coaching paused'}
              </div>

              <button
                type="button"
                onClick={() => setCameraEnabled((enabled) => !enabled)}
                className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-black/40 px-3 py-2 text-[10px] font-semibold text-white backdrop-blur transition hover:bg-black/60"
                aria-label={cameraEnabled ? 'Turn camera off' : 'Turn camera on'}
              >
                {cameraEnabled ? <Camera size={13} /> : <CameraOff size={13} />}
                {cameraEnabled ? 'Turn off' : 'Turn on'}
              </button>
            </div>

            <div className="rounded-2xl border border-[#E5E1D8] bg-[#FAF8F4] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#0F1B2D]">Live coaching</p>
                  <p className="mt-0.5 text-[10px] text-[#6B7280]">Private visual feedback</p>
                </div>
                <Eye size={16} className="text-[#806236]" />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5 text-[#4A5568]"><Activity size={13} /> Confidence</span>
                    <strong className="text-[#286749]">82%</strong>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#E5E1D8]">
                    <div className="h-full w-[82%] rounded-full bg-[#55A978]" />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5 text-[#4A5568]"><UserRound size={13} /> Posture</span>
                    <strong className="text-[#286749]">Good</strong>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#E5E1D8]">
                    <div className="h-full w-[88%] rounded-full bg-[#55A978]" />
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between text-[10px]">
                    <span className="flex items-center gap-1.5 text-[#4A5568]"><Smile size={13} /> Expression</span>
                    <strong className="text-[#806236]">Engaged</strong>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[#E5E1D8]">
                    <div className="h-full w-[76%] rounded-full bg-[#B8955A]" />
                  </div>
                </div>
              </div>

              <p className="mt-4 border-t border-[#E5E1D8] pt-3 text-[10px] leading-relaxed text-[#6B7280]">
                Keep your shoulders relaxed and look toward the camera while answering.
              </p>
            </div>
          </div>

          {/* Voice Response Area */}
          <div className="pt-4 flex flex-col items-center justify-center space-y-4">
            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              disabled={!isStarted}
              aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
              className={`grid h-20 w-20 place-items-center rounded-full transition-all shadow-md ${
                !isStarted
                  ? 'cursor-not-allowed bg-[#A0A7B4] text-white/70'
                  : isRecording
                  ? 'bg-[#B42318] text-white hover:bg-[#912018] ring-8 ring-[#B42318]/20'
                  : 'bg-[#0F1B2D] text-white hover:bg-[#1C2B42] hover:scale-105'
              }`}
            >
              {isRecording ? <Square size={24} /> : <Mic size={28} />}
            </button>

            <span className="text-xs text-[#6B7280]">
              {!isStarted
                ? 'Start the practice to enable your microphone.'
                : isRecording
                ? 'Recording your voice... Click red square when finished.'
                : 'Tap microphone and speak out loud naturally.'}
            </span>
          </div>

          {/* Stepper Controls */}
          <div className="pt-6 border-t border-[#F0EBE0] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setSeconds(0);
                setIsRecording(false);
              }}
              className="text-xs text-[#6B7280] hover:text-[#0F1B2D] flex items-center gap-1 font-medium"
            >
              <RotateCcw size={13} /> Reset Question
            </button>

            <JobBtn primary small onClick={handleNextQuestion} className="flex items-center gap-1.5">
              {currentQIndex === questions.length - 1 ? 'Finish & Generate Report' : 'Next Question'}
              <ArrowRight size={13} />
            </JobBtn>
          </div>
        </section>
      </div>
    </JobSeekerShell>
  );
}
