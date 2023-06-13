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

function getFileType (file: string) {
    const fileArr = file.match(/\.(\w+)$/);
    if (fileArr && fileArr.length > 1) {
        return fileArr[1];
    }
    throw new Error('未匹配到合适的后缀');
}

function uploadBySftpFn(file: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        uploadBySftp([file], ret => {
            if (ret) {
                resolve(true)
            } else {
                reject()
            }
        })
    })
}

function uploadByHttpFn(file: string): Promise<boolean> {
    return Promise.resolve(uploadByHttp(file))
}

interface extType {
    [key: string]: Function
}
const actionMap: extType = {
    txt: uploadByFtp,
    exe: uploadBySftpFn,
    doc: uploadByHttpFn
}

// 实现如下
function upload(files: string[]): Promise<boolean> {
    if (!Array.isArray(files)) {
        throw new Error('files类型必须为数组')
    }

    return Promise.all(files.filter(file => {
        const ext = getFileType(file);

        if (!ext || !actionMap[ext]) {
            return false;
        }
        return true;
    }).map(file => {
        const ext = getFileType(file);
        if (ext && actionMap[ext]) {
            return actionMap[ext](file)
        }

    })).then(() => {
        console.log('upload success')
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    })
}


