const express = require("express");
const conf = require("../database/conf");
const query = require("../database/db");
const router = express.Router();

const MAIN_TABLE = process.env.MYSQL_MAIN_TABLE;

router.get('/', async (req, res) => {
  const result = await query(`SELECT id, creationDate, rest, work, sets, totalTime FROM ${MAIN_TABLE}`);
  try {
    res.json(result);
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/create', (req, res) => {
    
});

router.put('/modify', (req, res) => {

});

router.delete('/delete', (req, res) => {

});

module.exports = router;