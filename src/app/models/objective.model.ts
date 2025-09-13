export interface ObjectiveBank {
  bankId: string;
  amount: number;
}

export interface Objective {
  id: string;
  name: string;
  targetAmount: number;
  banks: ObjectiveBank[];
}
