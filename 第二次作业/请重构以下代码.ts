// 请使用优化以下代码：

// 假设已经存在以下3个函数，3个函数的功能都是向服务器上传文件，根据不同的上传类型参数都会不一样。内容的实现这里无须关注
// 请重新设计一个功能，根据不同文件的后缀名，上传到不同的服务器。
// txt 上传到 ftp
// exe 上传到 sftp
// doc 上传到 http
function uploadByFtp (file: string): Promise<boolean> {
  return new Promise(resolve => resolve(true))
}
function uploadBySftp (file: string[], cb: (ret: boolean) => void): void {
  cb(true)
}
function uploadByHttp (file: string): boolean {
  return true
}

function matchFile(file: string) {
  try {
    return file.match(/\.(\w+)$/)?.[1]
  } catch (error) {
    console.error(error)
    return undefined
  }
}

function judgeFileType(ext?: string) {
  if (ext !== 'txt' && ext !== 'ext' && ext !== 'doc') {
    console.error('The suffix name does not meet the specifications')
    return false
  }
  return true
}

function uploadTxt(file: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      const result = uploadByFtp(file);
      resolve(result);
    } catch (error) {
      console.error('upload failed')
      reject(error);
    }
  });
}

function uploadExe(file: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    uploadBySftp([file], ret => {
      if (ret) {
        resolve(true)
      } else {
        console.error('upload failed')
        reject()
      }
    })
  })
}

function uploadDoc(file: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const result = uploadByHttp(file)
    if (result) {
      resolve(true)
    } else {
      console.error('upload failed')
      reject()
    }
  })
}

const actionMap: Record<string, (file: string) => Promise<boolean>> = {
  txt: uploadTxt,
  exe: uploadExe,
  doc: uploadDoc,
}

// 实现如下
async function upload(files: string[]): Promise<boolean> {
  try {
    const matchedFiles = files.filter(file => {
      return judgeFileType(matchFile(file))
    })
    await Promise.all(matchedFiles.map(file => {
      const ext = matchFile(file)
      return actionMap[ext!](file)
    }))
    console.log('upload success.')
    return true
  } catch(err) {
    console.error(err)
    return false
  }  
}
