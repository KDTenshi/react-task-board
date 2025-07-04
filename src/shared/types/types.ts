export type TTask = {
  id: string;
  title: string;
  date: number;
};

export type TColumn = {
  id: string;
  title: string;
  tasks: TTask[];
};
