const router = require('express').Router();
const matchController = require('../controllers/match');

router.get('/', matchController.getAllMatches);
router.get('/:matchId', matchController.getMatch);
router.post('/', matchController.addMatch);
router.patch('/:matchId', matchController.updateMatch);
router.delete('/:matchId', matchController.deleteMatch);

module.exports = router;