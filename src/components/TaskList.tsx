import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Task } from '../db';
import { CheckCircle2, Circle, Trash2, Clock } from 'lucide-react';

export const TaskList: React.FC = () => {
  const tasks = useLiveQuery(() => db.tasks.orderBy('startTime').toArray());

  const toggleComplete = async (task: Task) => {
    if (task.id) {
      await db.tasks.update(task.id, { completed: !task.completed });
    }
  };

  const deleteTask = async (id?: number) => {
    if (id) {
      await db.tasks.delete(id);
    }
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        目前沒有設定時間箱任務，請在上方新增！
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
            task.completed
              ? 'bg-slate-50 border-slate-200 text-slate-400'
              : 'bg-white border-slate-200 shadow-sm text-slate-800'
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleComplete(task)}
              className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
            >
              {task.completed ? (
                <CheckCircle2 className="text-emerald-500" size={22} />
              ) : (
                <Circle size={22} />
              )}
            </button>
            <span className={task.completed ? 'line-through' : 'font-medium'}>
              {task.title}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              <Clock size={14} />
              {task.startTime} ({task.durationMinutes}m)
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};