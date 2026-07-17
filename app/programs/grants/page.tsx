import ProgramsTypePage from '@/components/programs/ProgramsTypePage'

export default async function GrantsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <ProgramsTypePage type="grants" searchParams={searchParams} />
}
