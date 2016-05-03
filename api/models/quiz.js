import Sequelize from 'sequelize'

export default (db) => {
  let Quiz = db.define('Quiz', {
    lastName: Sequelize.STRING,
    firstName: Sequelize.STRING,
    email: Sequelize.STRING,
    received: Sequelize.DATEONLY,
    completed: Sequelize.DATEONLY,
    scanned: Sequelize.DATEONLY,
    printed: Sequelize.DATEONLY,
    signed: Sequelize.DATEONLY,
    efiled: Sequelize.DATEONLY,
    fedAccepted: Sequelize.DATEONLY,
    stateAccepted: Sequelize.DATEONLY,
    paid: Sequelize.DATEONLY,
    amount: Sequelize.FLOAT
  })
  return Quiz
}
