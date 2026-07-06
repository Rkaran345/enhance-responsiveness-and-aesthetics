import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  ListTodo,
  Clock,
  Music,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Sun,
  CloudRain,
  Wind,
  Coffee,
  ChevronRight,
  TrendingUp,
  Calendar,
  AlertCircle
} from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tasks' | 'focus' | 'ambience'>('dashboard');
  const [glowColor, setGlowColor] = useState<'purple' | 'emerald' | 'rose'>('purple');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Refactor Aura dashboard CSS styles', completed: false, priority: 'high', category: 'Development' },
    { id: '2', text: 'Prepare presentation slides for Q3 project review', completed: true, priority: 'medium', category: 'Design' },
    { id: '3', text: 'Review feedback on landing page layout', completed: false, priority: 'low', category: 'Marketing' }
  ]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [newTaskCategory, setNewTaskCategory] = useState('Development');

  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState<'work' | 'break'>('work');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const [sounds, setSounds] = useState([
    { id: 'rain', name: 'Rainfall', icon: CloudRain, active: false, volume: 50 },
    { id: 'forest', name: 'Forest Wind', icon: Wind, active: false, volume: 30 },
    { id: 'cafe', name: 'Café Bustle', icon: Coffee, active: false, volume: 40 }
  ]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(s => s - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(m => m - 1);
          setTimerSeconds(59);
        } else {
          if (timerMode === 'work') {
            setTimerMode('break');
            setTimerMinutes(5);
            setSessionsCompleted(s => s + 1);
          } else {
            setTimerMode('work');
            setTimerMinutes(25);
          }
          setIsTimerRunning(false);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerMinutes, timerSeconds, timerMode]);

  const formatTime = (minutes: number, seconds: number) => {
    return String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
  };

  const getGreeting = () => {
    const hrs = currentTime.getHours();
    if (hrs < 12) return 'Good morning';
    if (hrs < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskText,
      completed: false,
      priority: newTaskPriority,
      category: newTaskCategory
    };
    setTasks([newTask, ...tasks]);
    setNewTaskText('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const toggleSound = (id: string) => {
    setSounds(sounds.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const handleVolumeChange = (id: string, volume: number) => {
    setSounds(sounds.map(s => s.id === id ? { ...s, volume } : s));
  };

  const glowClasses = {
    purple: 'from-purple-600/20 via-pink-600/10 to-transparent',
    emerald: 'from-emerald-600/20 via-teal-600/10 to-transparent',
    rose: 'from-rose-600/20 via-amber-600/10 to-transparent'
  };

  const accentColor = {
    purple: 'text-purple-400 border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20',
    emerald: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20',
    rose: 'text-rose-400 border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20'
  };

  const buttonAccent = {
    purple: 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/20',
    emerald: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20',
    rose: 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20'
  };

  return (
    <div className="min-h-screen bg-[#030303] text-[#F9F9FB] relative overflow-hidden flex flex-col md:flex-row">
      <div className={"absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-gradient-to-br " + glowClasses[glowColor] + " animate-pulse-subtle -z-10"} />
      <div className={"absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] bg-gradient-to-br " + glowClasses[glowColor] + " animate-pulse-subtle -z-10 opacity-60"} />

      <aside className="w-full md:w-64 glass-panel border-r border-neutral-800/40 p-6 flex flex-col justify-between z-10">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-wider text-gradient">A U R A</span>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
              { id: 'tasks', name: 'Tasks', icon: ListTodo },
              { id: 'focus', name: 'Focus Flow', icon: Clock },
              { id: 'ambience', name: 'Ambience', icon: Music }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={"w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium " + (isActive ? "bg-white/10 text-white shadow-inner border border-white/5" : "text-neutral-400 hover:text-white hover:bg-white/5")}
                >
                  <Icon className={"w-4 h-4 " + (isActive ? "text-purple-400" : "text-neutral-400")} />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800/40">
          <div className="text-xs text-neutral-500 mb-3 uppercase tracking-wider font-semibold">Workspace Ambient</div>
          <div className="flex items-center gap-3">
            {(['purple', 'emerald', 'rose'] as const).map(color => (
              <button
                key={color}
                onClick={() => setGlowColor(color)}
                className={"w-6 h-6 rounded-full border-2 transition-all " + (glowColor === color ? "border-white scale-110" : "border-transparent") + " " + (color === "purple" ? "bg-purple-500" : color === "emerald" ? "bg-emerald-500" : "bg-rose-500")}
              />
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen z-10 flex flex-col gap-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl">
          <div>
            <h1 className="text-2xl md:text-3xl font-light tracking-tight text-white">
              {getGreeting() + ", "} <span className="font-semibold text-gradient-purple">Seraphina</span>
            </h1>
            <p className="text-sm text-neutral-400 mt-1">Ready to craft a focused day? Here is your overview.</p>
          </div>
          
          <div className="flex items-center gap-4 text-right">
            <div>
              <div className="text-xl font-mono text-white font-medium">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="text-xs text-neutral-400 flex items-center gap-1.5 justify-end mt-0.5">
                <Calendar className="w-3.5 h-3.5" />
                {currentTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
            <div className="h-8 w-px bg-neutral-800" />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span className="text-xs text-neutral-300 font-medium">72°F</span>
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-400 font-medium">Total Focus Flow</span>
                <Clock className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-3xl font-semibold text-white mb-2">{(sessionsCompleted * 25) + " "} <span className="text-sm font-normal text-neutral-400">mins</span></div>
              <p className="text-xs text-neutral-500 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>+12% increase from yesterday</span>
              </p>
            </div>

            <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-400 font-medium">Tasks Completed</span>
                <ListTodo className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-semibold text-white mb-2">
                {tasks.filter(t => t.completed).length + " / " + tasks.length}
              </div>
              <p className="text-xs text-neutral-500 flex items-center gap-1">
                <span>Keep going to unlock focus awards</span>
              </p>
            </div>

            <div className="glass-panel-interactive p-6 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-neutral-400 font-medium">Productivity Score</span>
                <Sparkles className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-3xl font-semibold text-white mb-2">94%</div>
              <p className="text-xs text-neutral-500 flex items-center gap-1">
                <span>Optimal peak focus detected</span>
              </p>
            </div>

            <div className="md:col-span-2 glass-panel p-6 rounded-2xl flex flex-col gap-4">
              <h2 className="text-lg font-medium text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" /> Focus Flow Timer
              </h2>
              <div className="flex-1 flex flex-col items-center justify-center py-6">
                <div className="relative w-44 h-44 flex items-center justify-center rounded-full border-2 border-dashed border-neutral-800 mb-6">
                  <div className="absolute inset-2 rounded-full border border-neutral-700/30 flex flex-col items-center justify-center bg-black/40">
                    <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{timerMode === 'work' ? 'FOCUS' : 'BREAK'}</span>
                    <span className="text-3xl font-mono font-bold text-white mt-1">{formatTime(timerMinutes, timerSeconds)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={"flex items-center justify-center w-12 h-12 rounded-full text-white transition-all shadow-lg " + buttonAccent[glowColor]}
                  >
                    {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>
                  <button 
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerMinutes(timerMode === 'work' ? 25 : 5);
                      setTimerSeconds(0);
                    }}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 text-white transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white flex items-center gap-2">
                  <ListTodo className="w-4 h-4 text-emerald-400" /> Tasks
                </h2>
                <button onClick={() => setActiveTab('tasks')} className="text-xs text-neutral-400 hover:text-white flex items-center gap-0.5 transition-all">
                  View All <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-2.5 max-h-[260px] overflow-y-auto pr-1">
                {tasks.slice(0, 4).map(task => (
                  <div 
                    key={task.id}
                    className={"p-3 rounded-xl border transition-all flex items-start justify-between gap-3 " + (task.completed ? "bg-neutral-900/30 border-neutral-900/60 opacity-60" : "bg-white/2 border-white/3 hover:border-white/5")}
                  >
                    <button onClick={() => toggleTask(task.id)} className="mt-0.5 text-neutral-500 hover:text-white transition-colors">
                      {task.completed ? (
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 fill-emerald-500/10" />
                      ) : (
                        <Circle className="w-4.5 h-4.5" />
                      )}
                    </button>
                    <span className={"text-sm flex-1 leading-normal " + (task.completed ? "line-through text-neutral-500" : "text-neutral-300")}>
                      {task.text}
                    </span>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-10 opacity-40">
                    <ListTodo className="w-8 h-8 mb-2" />
                    <span className="text-xs">No active tasks today</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
              <h2 className="text-lg font-medium text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-400" /> Create Task
              </h2>
              
              <form onSubmit={handleAddTask} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-neutral-400 font-medium">Task Description</label>
                  <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="What needs to be done?"
                    className="glass-input px-4 py-3 rounded-xl text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 font-medium">Priority</label>
                    <select
                      value={newTaskPriority}
                      onChange={(e: any) => setNewTaskPriority(e.target.value)}
                      className="glass-input px-3 py-2.5 rounded-xl text-sm bg-neutral-900"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-400 font-medium">Category</label>
                    <input
                      type="text"
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value)}
                      placeholder="e.g. Design"
                      className="glass-input px-3 py-2.5 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className={"mt-2 py-3 rounded-xl text-sm font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-1.5 " + buttonAccent[glowColor]}
                >
                  <Plus className="w-4 h-4" /> Add Task
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">{"All Active Tasks (" + tasks.filter(t => !t.completed).length + ")"}</h2>
                <div className="text-xs text-neutral-500 font-medium">Click circle to complete</div>
              </div>

              <div className="flex flex-col gap-3">
                {tasks.map(task => (
                  <div 
                    key={task.id}
                    className={"p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 " + (task.completed ? "bg-neutral-900/30 border-neutral-900/60 opacity-60" : "bg-white/2 border-white/3 hover:border-white/5")}
                  >
                    <div className="flex items-start gap-3.5 flex-1">
                      <button onClick={() => toggleTask(task.id)} className="mt-0.5 text-neutral-500 hover:text-white transition-colors">
                        {task.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                        ) : (
                          <Circle className="w-5 h-5" />
                        )}
                      </button>
                      <div className="flex-1">
                        <span className={"text-sm leading-relaxed block " + (task.completed ? "line-through text-neutral-500" : "text-neutral-200")}>
                          {task.text}
                        </span>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={"text-[10px] px-2 py-0.5 rounded-md font-semibold border " + (task.priority === "high" ? "text-rose-400 border-rose-500/20 bg-rose-500/5" : task.priority === "medium" ? "text-amber-400 border-amber-500/20 bg-amber-500/5" : "text-blue-400 border-blue-500/20 bg-blue-500/5")}>
                            {task.priority.toUpperCase()}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold border border-neutral-800 bg-neutral-900/50 text-neutral-400">
                            {task.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => deleteTask(task.id)}
                      className="text-neutral-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="flex flex-col items-center justify-center text-center py-16 opacity-30">
                    <ListTodo className="w-12 h-12 mb-3" />
                    <span className="text-sm">No tasks created yet. Add one above!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'focus' && (
          <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center gap-8 py-14 max-w-xl mx-auto w-full">
            <div className="text-center">
              <h2 className="text-2xl font-light text-white tracking-wide">Focus Flow Session</h2>
              <p className="text-sm text-neutral-400 mt-1">Deep work session based on Pomodoro technique</p>
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center rounded-full border-2 border-dashed border-neutral-850">
              <div className="absolute inset-3 rounded-full border border-neutral-800 flex flex-col items-center justify-center bg-black/50 shadow-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">{timerMode === 'work' ? 'DEEP FOCUS' : 'SHORT BREAK'}</span>
                <span className="text-5xl font-mono font-bold text-white mt-2 tracking-tight">{formatTime(timerMinutes, timerSeconds)}</span>
                <span className="text-xs text-neutral-400 mt-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> {"Session #" + (sessionsCompleted + 1)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={"flex items-center justify-center w-16 h-16 rounded-full text-white transition-all shadow-xl hover:scale-105 active:scale-95 " + buttonAccent[glowColor]}
              >
                {isTimerRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
              </button>
              
              <button 
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerMinutes(timerMode === 'work' ? 25 : 5);
                  setTimerSeconds(0);
                }}
                className="flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 text-white transition-all hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/5">
              <AlertCircle className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-neutral-300 font-medium">Tip: Turn on background Ambience to enhance deep focus</span>
            </div>
          </div>
        )}

        {activeTab === 'ambience' && (
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-6 max-w-2xl mx-auto w-full">
            <div>
              <h2 className="text-xl font-light text-white tracking-wide">Aesthetic Soundspaces</h2>
              <p className="text-sm text-neutral-400 mt-1">Blend atmospheric sounds to customize your focal environment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sounds.map(sound => {
                const SoundIcon = sound.icon;
                return (
                  <div 
                    key={sound.id}
                    className={"p-5 rounded-2xl border transition-all flex flex-col gap-4 " + (sound.active ? "bg-purple-950/15 border-purple-500/30" : "bg-white/2 border-white/3 hover:border-white/5")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={"p-2.5 rounded-xl " + (sound.active ? "bg-purple-500/20 text-purple-400" : "bg-neutral-900 text-neutral-400")}>
                          <SoundIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-white block">{sound.name}</span>
                          <span className="text-xs text-neutral-500">{sound.active ? 'Playing' : 'Paused'}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => toggleSound(sound.id)}
                        className={"px-4 py-1.5 rounded-xl text-xs font-bold transition-all border " + (sound.active ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/10" : "bg-white/5 border-white/5 hover:bg-white/10 text-white")}
                      >
                        {sound.active ? 'Mute' : 'Play'}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={sound.volume} 
                        disabled={!sound.active} 
                        onChange={(e) => handleVolumeChange(sound.id, Number(e.target.value))} 
                        className="flex-1 accent-purple-500 h-1 bg-neutral-800 rounded-lg cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" 
                      />
                      <Volume2 className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-neutral-800/40 pt-4 flex items-center justify-between text-xs text-neutral-500">
              <span>All soundscapes are synthesized locally</span>
              <span>Volume levels: 100% max</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
