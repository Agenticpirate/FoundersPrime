#!/usr/bin/env node

const fs = require('fs');
const path = 'public/data/all-deals.json';
const deals = JSON.parse(fs.readFileSync(path, 'utf8'));

// Fields to remove if they have generic/placeholder values
const genericValues = {
  difficulty: ['easy', 'medium', 'hard'],
  timeToApply: ['15 minutes', 'Varies', '10 minutes', '5 minutes', '30 minutes'],
  successRate: ['', 'Varies', 'High', 'Medium', 'Low'],
  eligibility: ['Startups', 'Early-stage startups'],
  requirements: ['Valid business email', 'Business email required']
};

let cleanedCount = 0;

const cleanedDeals = deals.map(deal => {
  let modified = false;
  
  // Remove generic difficulty
  if (genericValues.difficulty.includes(deal.difficulty)) {
    delete deal.difficulty;
    modified = true;
  }
  
  // Remove generic timeToApply
  if (genericValues.timeToApply.includes(deal.timeToApply)) {
    delete deal.timeToApply;
    modified = true;
  }
  
  // Remove generic successRate
  if (!deal.successRate || genericValues.successRate.includes(deal.successRate)) {
    delete deal.successRate;
    modified = true;
  }
  
  // Remove generic eligibility
  if (deal.eligibility && deal.eligibility.length === 1 && 
      genericValues.eligibility.includes(deal.eligibility[0])) {
    deal.eligibility = [];
    modified = true;
  }
  
  // Remove generic requirements
  if (deal.requirements && deal.requirements.length === 1 && 
      genericValues.requirements.includes(deal.requirements[0])) {
    deal.requirements = [];
    modified = true;
  }
  
  // Remove empty proTips
  if (deal.proTips && deal.proTips.length === 0) {
    delete deal.proTips;
    modified = true;
  }
  
  // Remove generic applicationProcess
  if (deal.applicationProcess && deal.applicationProcess.length <= 3 &&
      deal.applicationProcess.some(p => p.includes('Visit provider website') || p.includes('Complete application'))) {
    deal.applicationProcess = [];
    modified = true;
  }
  
  if (modified) cleanedCount++;
  return deal;
});

fs.writeFileSync(path, JSON.stringify(cleanedDeals, null, 2));
console.log('✅ Cleaned ' + cleanedCount + ' deals');
console.log('Total deals: ' + cleanedDeals.length);
