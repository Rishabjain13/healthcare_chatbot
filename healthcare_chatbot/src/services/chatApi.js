export function analyzeSymptoms(symptom, duration) {
  let severity = 'mild'

  if (duration >= 2) severity = 'moderate'
  if (
    symptom.includes('chest pain') ||
    symptom.includes('breathing') ||
    duration >= 5
  ) severity = 'emergency'

  let advice
  if (severity === 'mild') {
    advice =
      'Your symptoms appear mild at this stage. Rest, hydration, and observation are advised.'
  } else if (severity === 'moderate') {
    advice =
      'Since your symptoms have persisted for several days, medical consultation is advisable.'
  } else {
    advice =
      '⚠ These symptoms may indicate a serious condition. Immediate medical attention is advised.'
  }

  return { severity, advice }
}
