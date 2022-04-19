const express = require("express");
const conf = require("../database/conf");
const query = require("../database/db");
const router = express.Router();

const MAIN_TABLE = process.env.MYSQL_MAIN_TABLE;

router.get('/', async (req, res) => {
  try {
    const result = await query(`SELECT id, creationDate, rest, work, sets, totalTime FROM ${MAIN_TABLE}`);
    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/create', async (req, res) => {
  try {
    const element = req.body.timer;
    const result = await query(
      `INSERT INTO ${MAIN_TABLE} (rest, sets, work, creationDate, totalTime, name) VALUES (?, ?, ?, ?, ?, ?)`, 
      [element.rest, element.sets, element.work, new Date(), element.totalTime, element.name]
    );

    if (result.affectedRows) {
      res.json({...result});
    }
  } catch (err) {
    res.json({error:err.message, affectedRows : 0});
  }
});

router.put('/modify', (req, res) => {

});

router.delete('/delete', (req, res) => {

});

module.exports = router;