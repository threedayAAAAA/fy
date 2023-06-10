// 请使用优化以下代码：

// 假设已经存在以下3个函数，3个函数的功能都是向服务器上传文件，根据不同的上传类型参数都会不一样。内容的实现这里无须关注
// 请重新设计一个功能，根据不同文件的后缀名，上传到不同的服务器。
// txt 上传到 ftp
// exe 上传到 sftp
// doc 上传到 http
async function uploadByFtp(file: string): Promise<boolean> {
  // return new Promise((resolve, reject) => reject('根源'))
  return new Promise(resolve => resolve(true))
}
function uploadBySftp(file: string[], cb: (ret: boolean) => void): void {
  cb(true)
}
function uploadByHttp(file: string): boolean {
  return true
}

enum fileExt {
  txt = "txt",
  exe = "exe",
  doc = "doc"
}

type fileAction = () => Promise<boolean>

const fileActionMap: Record<fileExt, fileAction> = {
  [fileExt.txt]: () => uploadByFtp(fileExt.txt),
  [fileExt.exe]: () => {
    return new Promise((resolve, reject) => {
      uploadBySftp([fileExt.exe], ret => {
        ret ? resolve(true) : reject()
      })
    })
  },
  [fileExt.doc]: () => uploadByHttp(fileExt.doc) ? Promise.resolve(true) : Promise.reject()

}

const getExtName = (str: string) => str.match(/\.(\w+)$/)?.[1] || '' //拿不到数据就空串


//校验通过的文件将会去执行action
const validFile = (file: string) => Object.keys(fileActionMap).includes(getExtName(file))


//提供错误日志
const filtersWithError = (files: string[]) => {
  return files.filter((file) => {
    const result = validFile(file);
    !result && console.error(`无${file}支持的拓展名对应上传方法`)
    return result;
  })
}

// 实现如下
async function upload(files: string[]): Promise<Array<{
  status: 'rejected',
  reason: {
    originError: any,
    currentFile: string
  }
} | {
  status: 'fulfilled', value: boolean
}> | void> {
  const uploadArray = filtersWithError(files).map(eachFile => {
    const ext = getExtName(eachFile) as fileExt
    return fileActionMap[ext]().catch((originError) => {
      return Promise.reject({ originError, currentFile: eachFile })
    })
  })
  return await Promise.allSettled(uploadArray)
}

upload(['aa.txt', 'bb.a', 'cc.doc']).then(console.log)

