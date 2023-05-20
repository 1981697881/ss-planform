export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/basic': () => import('@/layout'),
  'clerk': () => import('@/views/basic/clerk'),
  'essential': () => import('@/views/basic/essential'),
  'dictionaries': () => import('@/views/basic/dictionaries'),
  'duties': () => import('@/views/basic/duties'),
  'organizational': () => import('@/views/basic/organizational'),
  'team': () => import('@/views/basic/team'),
  'commissionRatio': () => import('@/views/basic/commissionRatio'),
  'contractTerms': () => import('@/views/basic/contractTerms'),
  'bdRoll': () => import('@/views/basic/bdRoll'),

  'workTeam': () => import('@/views/information/workTeam'),
  'outsourcedProjects': () => import('@/views/information/outsourcedProjects'),
  'opening': () => import('@/views/information/opening'),
  'outsourcingBonus': () => import('@/views/information/outsourcingBonus'),
  'bonusPlan': () => import('@/views/information/bonusPlan'),
  'recruitmentBonus': () => import('@/views/information/recruitmentBonus'),
  'bdBonus': () => import('@/views/information/bdBonus'),
  'teamBonus': () => import('@/views/information/teamBonus'),

  'bonusSummary': () => import('@/views/reportForm/bonusSummary'),
  'incomeDetail': () => import('@/views/reportForm/incomeDetail'),
  'outsourcingBonusDetails': () => import('@/views/reportForm/outsourcingBonusDetails'),
  'outsourcingBonusSummary': () => import('@/views/reportForm/outsourcingBonusSummary'),

}
