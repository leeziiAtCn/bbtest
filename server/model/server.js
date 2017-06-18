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
    max: 50,
    min: 0,
    idle: 10000
  }
})
let ser = sequelize.define(
  'server',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    status: Sequelize.INTEGER,
    createTime: Sequelize.INTEGER,
    did: Sequelize.STRING
  },
  {
    freezeTableName: true,
    tableName: 'serverlist',
    timestamps: false
  })

module.exports = {
  add(params){
    return ser.create({
      id: params.id,
      name: params.name,
      description: params.description,
      status: params.status,
      createTime: params.createTime,
      did: params.did
    })
  },
  delAll(){
    return ser.destroy({
      where: {}
    })
  },
  searchAll(){
    return ser.findAll({
      where: {}
    })
  },
  searchByid (params) {
    return ser.findAll({
      where: {
        did: params.id
      }
    })
  },
  searchLive(){
    return ser.findAll({
      where: {
        status: 0
      }
    })
  }
}