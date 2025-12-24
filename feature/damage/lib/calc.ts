// [OO강화배율] : (1+OO강화/8500) * (1+OO피해%) -1
export function calcStatScaling(v: number, statDamage: number) {
  // 여기는 %임 수정해야함 임시로 v
  return (1 + v / 8500) * (1 + statDamage) - 1;
}

// [주피증배율] * [받피증배율]
export function calcDamageIncrease(outgoing: number, incoming: number) {
  return outgoing * incoming;
}

// [주피증배율] : (1+ 스위/8500)*(1+스킬피해%) + 헬리오% + 일부스킬피증% + 템주피증% + [시너지]대미지증가%(힐러, 사제, 수도, 음유 등 버프형 [시너지]스킬, 중첩불가)
export function calcOutgoingDamageIncreaseMultiplier() {}

// [받피증배율] : 1 + 방어구파괴%(영수 등, 중첩불가) + [시너지]받는대미지증가%(산성유탄, 대검심찌 등 디버프형 [시너지]스킬, 중첩불가)
export function calcIncomingDamageIncreaseMultiplier() {}

export function calcComboScaling(v: number, combo: number) {
  let comboValue = 1;
  if (combo >= 100) comboValue = 4;
  if (combo >= 50) comboValue = 3;
  if (combo >= 10) comboValue = 2;

  return (1 + v / 17500) * (1 + v) * (comboValue / 4);
}

export function calcUltimateScaling(v: number) {
  return v / 8750;
}

// [치명타확률] : MIN( 0.5 - 1/(2+치명타/1000) + 룬치확% + 캐릭크확증% + 치확보너스%(레이드입문 등) , 100%)
export function calcCreticalProb(
  v: number,
  runProb: number,
  characterProb: number,
  creticalBonus = 0
) {
  return Math.min(
    0.5 - 1 / (2 + v / 1000) + runProb + characterProb + creticalBonus,
    100
  );
}

// [치명타배율] : (1.4 + 치명타/5000) * (1 + 치명타피해% + 캐릭크댐증%)
export function calcCreticalScaling(
  v: number,
  creticalDamageStat: number,
  characterCreticalDamageStat: number
) {
  return (
    (1.4 + v / 5000) * (1 + creticalDamageStat + characterCreticalDamageStat)
  );
}
