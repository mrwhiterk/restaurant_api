const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Order = require('../models/order')
const auth = require('../middleware/auth')

/* GET order listing. */
router.get('/', auth, async (req, res) => {
  try {
    let data = await Order.find({ userId: req.user._id });
    res.send(data)
  } catch (e) {
    res.status(400).send(e)
  }
})

/* GET all order listing. */
router.get('/all', auth, async (req, res) => {
  try {
    let data = await Order.find().populate('userId').exec();
    console.log(data);
    res.send(data)
  } catch (e) {
    res.status(500).send(e)
  }
})

/* POST add order. */
router.post('/', auth, async (req, res) => {
  let newOrder = new Order({
    content: req.body,
    userId: req.user._id
  })

  try {
    await newOrder.save()

    res.status(201).send(newOrder)
  } catch (e) {
    res.status(400).send(e)
  }
})

/* PUT cancel order. */
router.put('/cancel/:id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    order.submitted = false
    await order.save()

    res.send(order)
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
})

router.put('/resume/:id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    order.submitted = true
    await order.save()

    res.send(order)
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
})

router.put('/complete/:id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    order.completed = true
    await order.save()

    res.send(order)
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
})


router.put('/incomplete/:id', auth, async (req, res) => {
  try {
    let order = await Order.findById(req.params.id);

    order.completed = false
    await order.save()

    res.send(order)
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
})

module.exports = router
