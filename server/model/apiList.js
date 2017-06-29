/**
 * Created by leezi on 6/17/2017.
 */
const Sequelize = require('sequelize')
const sqlOpt = require('./../config/mysql')
let sequelize = new Sequelize('test', sqlOpt.name, sqlOpt.pwd, {
  host: sqlOpt.host,
  dialect: 'mysql',
  port: sqlOpt.port,
  pool: {
    max: 5000,
    min: 0,
    idle: 10000
  }
})
let api = sequelize.define(
  'api', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    method: Sequelize.STRING,
    url: Sequelize.STRING,
    description: Sequelize.STRING,
    createTime: Sequelize.INTEGER,
    did: Sequelize.STRING,
    status: Sequelize.INTEGER,
    content_type: Sequelize.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'apilist',
    timestamps: false
  }
)
module.exports = {
  add(params) {
    return api.create({
      id: params.id,
      name: params.name,
      method: params.method,
      url: params.url,
      description: params.description,
      createTime: params.createTime,
      did: params.did,
      status: params.status,
      content_type: params.content_type
    })
  },
  search(params) {
    return api.findAll({
      where: {
        id: params.id
      }
    })
  },
  searchbyDid(params) {
    return api.findAll({
      where: {
        did: params.id
      }
    })
  },
  searchbyId(p) {
    return api.findAll({
      where: {
        id: p.id
      }
    })
  },
  searchAll(params) {
    return api.findAll({
      where: {}
    })
  },
  delAll() {
    return api.destroy({
      where: {}
    })
  },
  searchLive() {
    return api.findAll({
      where: {
        status: 0
      }
    })
  },
  changeType(params) {
    return api.update({
      content_type: params.content_type
    }, {
      where: {
        id: params.id
      }
    })
  }
}