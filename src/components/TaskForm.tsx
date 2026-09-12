import React, { useState } from 'react';
import { db } from '../db';
import { Plus } from 'lucide-react';

export const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [durationMinutes, setDurationMinutes] = useState(30);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await db.tasks.add({
      title,
      startTime,
      durationMinutes: Number(durationMinutes),
      completed: false
    });

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="任務名稱（例如：撰寫專案報告）"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex gap-2">
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(Number(e.target.value))}
          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={15}>15 分鐘</option>
          <option value={30}>30 分鐘</option>
          <option value={45}>45 分鐘</option>
          <option value={60}>60 分鐘</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 transition-colors font-medium cursor-pointer"
        >
          <Plus size={18} />
          新增
        </button>
      </div>
    </form>
  );
};