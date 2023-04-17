export interface FileType {
  description: string;
  accept: {
    [key: string]: string[];
  };
}

export function checkSupport() {
  if (!('showOpenFilePicker' in window)) {
    window.alert('Your browser does not support the File System Access API.');
    return false;
  }
  return true;
}

export async function choose(save = false, types: FileType[] = []) {
  if (save) {
    return await (window as any).showSaveFilePicker({ types });
  } else {
    const [fileHandle] = await (window as any).showOpenFilePicker({ types });
    return fileHandle;
  }
}

export async function getFile(handle: any) {
  return await handle.getFile();
}

export function getName(handle: any): string {
  return handle.name;
}

export async function getText(file: File): Promise<string> {
  const reader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException('Error reading the file.'));
    };
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsText(file);
  });
}

export async function write(handle: any, contents: string): Promise<void> {
  const writable = await handle.createWritable();
  await writable.write(contents);
  await writable.close();
}
