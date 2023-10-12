// routes/epl.js
const mmr = require('../mmr.js');
const express = require('express');
const router = express.Router();
const db = require('../models');

// EPL 순위 페이지 라우트
router.get('/', async (req, res) => {
  try {
    //데이터베이스로부터 정보 가져옴
    const eplTeams = await db.Epl.findAll();       // epl팀정보 가져오기
    const transfers = await db.transfer.findAll(); // transfer 데이터 가져오기

    // curr_mmr 계산하여 데이터베이스 업데이트
    await Promise.all(
      eplTeams.map(async (team) => {
        const { tier, prev_win, prev_lose, curr_win, curr_lose } = team;
        const calculatedMmr = mmr(tier, prev_win, prev_lose, curr_win, curr_lose);
        await db.Epl.update({ curr_mmr: calculatedMmr }, { where: { num: team.num } });
      })
    );
    //epl.pug 렌더링
    res.render('epl', { eplTeams: eplTeams || [], transfer: transfers }); // transfer 데이터도 함께 전달
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// 매치 정보 페이지 라우트
router.get('/match', async (req, res) => {
  try {
    const matches = await db.match.findAll();
    
    //매치데이터를 데이터베이스로부터 가져옴
    for (const match of matches) {
      const eplTeam = await db.Epl.findOne({
        where: { name: match.home },
      });


      //데이터베이스로부터 홈 팀의 레이팅 정보를 가져옴
      if (eplTeam) {
        match.home_mmr = eplTeam.curr_mmr;
        await match.save();
      }
      const eplAwayTeam = await db.Epl.findOne({
        where: { name: match.away },
      });
      //데이터베이스로부터 어웨이 팀의 레이팅 정보를 가져옴
      if (eplAwayTeam) {
        match.away_mmr = eplAwayTeam.curr_mmr;
        await match.save();
      }
    }
    //매치 데이터를 넘겨서 렌더링
    res.render('match', { matches: matches });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


module.exports = router;
