import ProgramsTypePage from '@/components/programs/ProgramsTypePage'

export default async function IncubatorsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <ProgramsTypePage type="incubators" searchParams={searchParams} />
}
