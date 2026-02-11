import { LucideIcon } from 'lucide-react'

interface AdminStatsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: LucideIcon
  iconColor?: string
  subtitle?: string
  onClick?: () => void
}

export default function AdminStatsCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'bg-blue-500',
  subtitle,
  onClick
}: AdminStatsCardProps) {
  const changeColors = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-600'
  }

  return (
    <div 
      className={`bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 ${
        onClick ? 'cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`${iconColor} border-3 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className={`text-sm font-bold ${changeColors[changeType]}`}>
            {changeType === 'positive' ? '+' : changeType === 'negative' ? '-' : ''}{change}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-black mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </h3>
      <p className="text-sm text-gray-600">{title}</p>
      {subtitle && (
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  )
}