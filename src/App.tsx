import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { Calendar } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="flex items-center gap-3 mb-8">
          <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-md">
            <Calendar size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">TimeTask</h1>
            <p className="text-sm text-slate-500">時間箱 + 待辦事項（IndexedDB 本地儲存）</p>
          </div>
        </header>

        <main>
          <TaskForm />
          <TaskList />
        </main>
      </div>
    </div>
  );
}