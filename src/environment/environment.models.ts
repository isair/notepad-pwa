import { FileType } from '@/utils/file';

export interface Environment {
  autoSaveInterval: number;
  defaultTabTitle: string;
  fileTypes: FileType[];
}
