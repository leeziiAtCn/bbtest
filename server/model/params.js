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
    max: 500,
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
    isheader: Sequelize.STRING,
    did: Sequelize.STRING,
    default: Sequelize.STRING,
    description: Sequelize.STRING,
    required: Sequelize.INTEGER,
  }, {
    freezeTableName: true,
    tableName: 'params',
    timestamps: false
  }
)
module.exports = {
  add(param){
    return params.create({
      id: param.id,
      did: param.did,
      pid: param.pid,
      isheader: param.isheader,
      key: param.key,
      default: param.default,
      required: param.required,
      description: param.description
    })
  },
  delAll(){
    return params.destroy({
      where: {}
    })
  }
}