import { Accepts } from '@/utils/file';

export interface Environment {
  autoSaveInterval: number;
  defaultTabTitle: string;
  accepts: Accepts[];
}
