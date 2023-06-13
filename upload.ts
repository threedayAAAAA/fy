// 请使用优化以下代码：

// 假设已经存在以下3个函数，3个函数的功能都是向服务器上传文件，根据不同的上传类型参数都会不一样。内容的实现这里无须关注
// 请重新设计一个功能，根据不同文件的后缀名，上传到不同的服务器。
// txt 上传到 ftp
// exe 上传到 sftp
// doc 上传到 http
type UploadFunction = (file: string) => Promise<boolean>;

const actionMap: Record<string, UploadFunction> = {
  txt: uploadByFtp,
  exe: uploadBySftpFn,
  doc: uploadByHttpFn,
};

function uploadByFtp (file: string): Promise<boolean> {
    return new Promise(resolve => resolve(true))
}
function uploadBySftp (file: string[], cb: (ret: boolean) => void): void {
    cb(true)
}
function uploadByHttp (file: string): boolean {
    return true
}

function getFileType(file: string): string {
  const ext = file.match(/\.(\w+)$/);
  if (!ext) {
    throw new Error("文件名格式需要满足.xxx形式");
  }
  return ext[1];
}

function uploadBySftpFn(file: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    uploadBySftp([file], (ret: boolean) => {
      if (ret) {
        resolve(true);
      } else {
        reject();
      }
    });
  });
}

function uploadByHttpFn(file: string): Promise<boolean> {
  return Promise.resolve(uploadByHttp(file));
}

async function upload(files: string[]): Promise<boolean> {
  if (!Array.isArray(files)) {
    throw new Error("files参数必须是数组");
  }

  const uploadTasks: Promise<boolean>[] = [];

  for (const file of files) {
    if (typeof file !== "string") {
      throw new Error("files参数内容必须为字符串");
    }

    const ext = getFileType(file);
    const uploadFn = actionMap[ext];

    if (!uploadFn) {
      console.log(`不支持上传${file}文件`);
      continue;
    }

    uploadTasks.push(uploadFn(file));
  }

  try {
    await Promise.all(uploadTasks);
    console.log("upload success.");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

upload(["a.doc", "b.txt", "c.exe", "d.jpg"]);
