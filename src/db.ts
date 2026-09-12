import Dexie, { type Table } from 'dexie';

export interface Task {
  id?: number;
  title: string;
  startTime: string; // HH:mm 格式
  durationMinutes: number;
  completed: boolean;
}

export class TimeboxDatabase extends Dexie {
  tasks!: Table<Task>;

  constructor() {
    super('TimeTaskDB');
    this.version(1).stores({
      tasks: '++id, startTime, completed'
    });
  }
}

export const db = new TimeboxDatabase();