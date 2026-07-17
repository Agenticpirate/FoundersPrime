/**
 * Shared type mapping for Student Benefits directory.
 * Keeps sidebar, hero stats, filter bar, and grid in sync.
 */

import type { StudentBenefit } from '@/data/student-benefits-2026'

export type StudentBenefitType =
  | 'all'
  | 'free-access'
  | 'credits-savings'
  | 'funding'
  | 'programs'

/** appCategory values that roll into each sidebar type */
export const STUDENT_TYPE_CATEGORIES: Record<
  Exclude<StudentBenefitType, 'all'>,
  string[]
> = {
  'free-access': [
    'Software & Tools',
    'UI/UX Tools',
    'AI App Builders',
    'Password Manager',
    'Personal CRM',
  ],
  'credits-savings': [
    'Credits & Savings',
    'Lifestyle',
    'Fashion & Apparel',
    'Sales & Prospecting',
    'Cloud Credits',
  ],
  funding: [
    'Funding & Opportunities',
    'Venture Capital',
    'Competitions',
    'Government Grants',
    'Grants & Fellowships',
  ],
  programs: ['Programs', 'Incubators', 'Accelerators'],
}

export const STUDENT_TYPE_LABELS: Record<StudentBenefitType, string> = {
  all: 'All Benefits',
  'free-access': 'Campus Edge',
  'credits-savings': 'Credits & Savings',
  funding: 'Funding & Opps',
  programs: 'Programs',
}

export function matchesStudentBenefitType(
  benefit: Pick<StudentBenefit, 'appCategory'>,
  type: StudentBenefitType
): boolean {
  if (type === 'all') return true
  const cats = STUDENT_TYPE_CATEGORIES[type]
  return cats.includes(benefit.appCategory)
}
