export interface Accepts {
  description: string;
  extensions: string[];
  mimeTypes: string[];
}

export function checkSupport() {
  if (!(window as any).chooseFileSystemEntries) {
    window.alert(
      'Please go to chrome://flags and enable "Native File System API"'
    );
    return false;
  }
  return true;
}

export async function choose(save = false, accepts: Accepts[] = []) {
  const opts = {
    type: save ? 'save-file' : undefined,
    accepts: accepts ? accepts : undefined,
  };
  return await (window as any).chooseFileSystemEntries(opts);
}

export async function getFile(handle: any) {
  return handle.getFile();
}

export function getName(fileOrHandle: any) {
  return fileOrHandle.name;
}

export async function getText(file: any) {
  return file.text();
}

export async function write(handle: any, contents: string) {
  const writable = await handle.createWritable();
  await writable.write(contents);
  await writable.close();
}
