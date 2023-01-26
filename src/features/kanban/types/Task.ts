export type TaskType = 'FEATURE' | 'BUG' | 'REQUEST';

export type TaskCardData = {
  id: string;
  name: string;
  type: TaskType;
};

export type TaskLaneData = {
  id: string;
  name: string;
  cards: TaskCardData[];
};
