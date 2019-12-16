const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

/* GET users listing. */
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send({ e })
  }
})

router.post('/signup', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    if (e.code == 11000) {
      res.status(450).send({ e }) // custom code for duplicate email
    } else {
      res.status(400).send({ e })
    }
  }
})

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token
    })

    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/me', auth, async (req, res) => {
  res.send(req.user)
})

router.delete('/me', auth, async (req, res) => {
  try {
    await req.user.remove()

    res.send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/saveOrder', auth, async (req, res) => {
  req.user.currentOrder = req.body

  try {
    await req.user.save()
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/getOrder', auth, async (req, res) => {
  res.send(req.user.currentOrder)
})

router.delete('/orderItem/:name', auth, async (req, res) => {
  let { name } = req.params;

  req.user.currentOrder = req.user.currentOrder.filter(orderItem => {
    return orderItem.name !== name
  })

  console.log(req.user.currentOrder);

  try {
    await req.user.save()

    res.send(req.user)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.delete('/removeCurrentOrder', auth, async (req, res) => {
  req.user.currentOrder = []

  try {
    await req.user.save()
    res.status(200).send()
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router
