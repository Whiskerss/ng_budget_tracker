import { FinancialData } from './financial-data.model';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  financialData?: FinancialData[];
}
