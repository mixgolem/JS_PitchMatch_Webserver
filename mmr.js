// 초기 레이팅 설정 및 티어에 따른 초기 레이팅의 보정
/*
const default_rating = 1500;
const tier1_rating = default_rating + 300;
const tier2_rating = default_rating + 150;
const tier3_rating = default_rating;
const tier4_rating = default_rating - 150;
const tier5_rating = default_rating - 300;
*/

// rating 계산 함수: 승률 보정이 존재하지 않는 버전
var k = 39.473;

function mmr(tier, prev_win, prev_lose, curr_win, curr_lose){
    let prev_mmr = 1200 + (5-tier)*150 + prev_win*k - prev_lose*k;
    let soft_mmr = (prev_mmr - 1500) * 0.5 + 1500;
    let mmr = soft_mmr + curr_win*k - curr_lose*k;
    return mmr;
}

module.exports = mmr;
//const mmr = require('./mmr.js');