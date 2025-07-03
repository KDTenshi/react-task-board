export type TTask = {
  id: string;
  title: string;
  description: string;
  date: number;
};

export type TColumn = {
  id: string;
  title: string;
  tasks: TTask[];
};
