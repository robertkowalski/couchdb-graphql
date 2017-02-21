const request = require('request')
const couchUrl = 'http://localhost:5984'


function requestGET (url) {
  return new Promise((resolve, reject) => {
    request({
        uri: url,
        json: true
      }, (err, res, body) => {
        if (err) throw err

        resolve(body)
      })

    }, (err) => {
      throw err
  })
}

exports.getDbInfo = getDbInfo
function getDbInfo (id) {
  return new Promise((resolve, reject) => {
    id = encodeURIComponent(id)

    request({
      uri: `${couchUrl}/${id}`,
      json: true
    }, (err, res, body) => {
      if (err) throw err

      resolve(body)
    })
  }, (err) => {
    throw err
  })
}

exports.getAllDbList = getAllDbList
function getAllDbList ({limit = Infinity, skip = 0}) {
  return new Promise((resolve, reject) => {
    request({
      uri: `${couchUrl}/_all_dbs?limit=${limit}&skip=${skip}`,
      json: true
    }, (err, res, body) => {
      if (err) throw err

      resolve(body)
    })
  }, (err) => {
    throw err
  })
}

exports.fetchAllDbs = fetchAllDbs
function fetchAllDbs ({limit = 9999999999999999, skip = 0}) {
  return new Promise((resolve, reject) => {
    getAllDbList({limit: limit, skip: skip})
      .then((dbs) => {
        console.log(dbs)
        const infos = dbs.map((db) => {
          return getDbInfo(db)
        })

        return infos
      })
      .then((requests) => {
        // TODO: handle 403
        Promise
          .all(requests)
          .then((result) => {
            resolve(result)
          })
      })
  }, (err) => {
    console.log(err)
    throw err
  })
}

exports.fetchAnimalDb = fetchAnimalDb
function fetchAnimalDb (limit = 20, skip = 0) {
  return new Promise((resolve, reject) => {
    const url = `${couchUrl}/animaldb/_all_docs?limit=${limit}&include_docs=true`

    requestGET(url)
      .then((r) => {
        const res = r.rows.map((raw) => {
          return raw.doc
        })

        resolve(res)
      }, (err) => {
        throw err
      })
  })
}
