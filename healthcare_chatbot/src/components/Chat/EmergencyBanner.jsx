import { useSelector } from 'react-redux'

export default function EmergencyBanner() {
  const active = useSelector(state => state.emergency.active)

  if (!active) return null

  return (
    <div className="bg-red-50 border-l-4 border-red-600 px-6 py-4 text-red-800">
      <p className="font-semibold">🚨Medical Emergency Detected</p>
      <p className="text-sm mt-1">
        Please contact emergency services or visit the nearest hospital immediately.
      </p>
    </div>
  )
}
