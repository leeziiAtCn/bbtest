/**
 * Created by leezi on 6/18/2017.
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
let params = sequelize.define(
  'params', {
    pid: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    id: Sequelize.STRING,
    key: Sequelize.STRING,
    type: Sequelize.STRING,
    did: Sequelize.STRING,
    default: Sequelize.STRING,
    description: Sequelize.STRING,
    required: Sequelize.INTEGER,
    what: Sequelize.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'params',
    timestamps: false
  }
)
module.exports = {
  add(param) {
    return params.create({
      id: param.id,
      did: param.did,
      pid: param.pid,
      key: param.key,
      type: param.type,
      default: param.default,
      required: param.required,
      description: param.description,
      what: param.what
    })
  },
  delAll() {
    return params.destroy({
      where: {}
    })
  },
  searchBy2id(p) {
    return params.findAll({
      where: {
        id: p.id,
        did: p.did
      }
    })
  },
  changeParam(p) {
    return params.update({
      key: p.key,
      default: p.defaultValue,
      what: p.what
    }, {
      where: {
        pid: p.pid
      }
    })
  },
  searchbyId(p) {
    return params.findAll({
      where: {
        id: p.id
      }
    })
  }
}