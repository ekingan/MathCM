import db from '../core/database'
export default function (router) {
  router.get('/Quizzes/', function (req, res) {
    db.quiz.findAll().then((quizzes) => {
      res.json({success: true, quizzes})
    })
  })
  // I made a stupid mistake and forgot to include the where clause in the update statement...
  // What can ya do?
  router.post('/Quizzes', function (req, res) {
    if (req.body.id) {
      db.quiz.update({id: req.body.id, lastName: req.body.lastName,
                    firstName: req.body.firstName, email: req.body.email,
                    isActive: req.body.isActive}, {where: {id: req.body.id}}).then((result) => {
                      res.json({success: true, id: req.body.id})
                    }).catch((error) => {
                      res.json({success: false, error})
                    })
    } else {
      db.quiz.create({id: req.body.id, lastName: req.body.lastName,
                  firstName: req.body.firstName, email: req.body.email,
                  isActive: req.body.isActive}).then((result) => {
                    res.json({success: true, id: result.id})
                  }).catch((error) => {
                    res.json({success: false, error})
                  })
    }
  })
  router.delete('/Quizzes/:id', function (req, res) {
    console.log(req.params, req.params.id)
    db.quiz.destroy({where: {id: req.params.id}}).then((result) => {
      res.json({success: true, result})
    }).catch((error) => {
      res.json({success: false, error})
    })
  })

  router.put('/Quizzes/:id', function (req, res) {
    let value = {}
    if (typeof req.body.value === 'boolean') {
      value[req.body.name] = req.body.value ? new Date() : null
    } else {
      value[req.body.name] = req.body.value
    }
    db.quiz.update(value, {where: {id: req.params.id}}).then((result) => {
      res.json({success: true, result})
    }).catch((error) => {
      res.json({success: false, error})
    })
  })
}

