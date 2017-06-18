/**
 * Created by leezi on 6/16/2017.
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
let prod = sequelize.define(
  'pro',
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    interfaceCount: Sequelize.INTEGER,
    userCount: Sequelize.INTEGER,
    status: Sequelize.INTEGER,
    createTime: Sequelize.INTEGER,
    updateTime: Sequelize.INTEGER
  }, {
    freezeTableName: true,
    tableName: 'proList',
    timestamps: false
  }
)
module.exports = {
  search (params) {
    return prod.findAll({
      where: {
        id: params.id
      }
    })
  },
  searchAll () {
    return prod.findAll({
      where: {}
    })
  },
  add (params) {
    return prod.create({
      id: params.id,
      name: params.name,
      interfaceCount: params.interfaceCount,
      userCount: params.userCount,
      status: params.status,
      createTime: params.createTime,
      updateTime: params.updateTime || 0
    })
  },
  del (params) {
    return prod.destroy({
      where: {
        id: params.id
      }
    })
  },
  delAll () {
    return prod.destroy({
      where: {}
    })
  }
}
