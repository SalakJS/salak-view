const path = require('path')
const fs = require('fs')

const getFileStat = (file) => {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, stat) => {
      if (err) {
        reject(err)
        return
      }

      resolve(stat)
    })
  })
}

async function getPath (dir, rel, ext) {
  try {
    const stat = await getFileStat(path.join(dir, rel))
    if (stat.isDirectory()) {
      return getPath(dir, path.join(rel, `index.${ext}`), ext)
    }

    return {
      rel: path.join(dir, rel),
      ext: path.extname(rel).slice(1)
    }
  } catch (err) {
    if (!path.extname(rel) || path.extname(rel).slice(1) !== ext) {
      return getPath(dir, `${rel}.${ext}`, ext)
    }

    throw err
  }
}

module.exports = getPath
