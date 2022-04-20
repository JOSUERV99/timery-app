const express = require("express");
const conf = require("../database/conf");
const query = require("../database/db");
const router = express.Router();

const MAIN_TABLE = process.env.MYSQL_MAIN_TABLE;

router.get('/get', async (_, res) => {
  try {
    const result = await query(`SELECT creationDate, rest, work, sets, totalTime, name FROM ${MAIN_TABLE}`);
    res.json({result});
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
    res.json({affectedRows : result.affectedRows});
  } catch (err) {
    res.json({error:err.message, affectedRows : 0});
  }
});

router.put('/modify', async (req, res) => {
  try {
    const updatedElement = req.body.timer;
    const result = await query(
      `UPDATE ${MAIN_TABLE} 
       SET sets = ${updatedElement.sets},
        rest = ${updatedElement.rest},
        work = ${updatedElement.work},
        totalTime = ${updatedElement.totalTime}
        WHERE
        name = '${updatedElement.name}' 
      `
    );
    res.json({affectedRows : result.affectedRows});
  } catch (err) {
    res.json({error:err.message, affectedRows : 0});
  }
});

router.delete('/delete', async (req, res) => {
  try {
    const name = req.body.name;
    const result = await query(
      `DELETE FROM ${MAIN_TABLE} WHERE name = '${name}'`
    );

    res.json({affectedRows : result.affectedRows});
  } catch (err) {
    res.json({error:err.message, affectedRows : 0});
  }
});

module.exports = router;