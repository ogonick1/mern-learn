const {Router} = require('express')
const router = Router()

router.get('/ok', async (req, res) => {
  try {
    res.status(200).json({message: 'Ok'})
  } catch (error) {
    res.status(500).json({message: 'Somthing error'})
    
  }
})

module.exports = router