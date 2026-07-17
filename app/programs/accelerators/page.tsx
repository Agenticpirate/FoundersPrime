import ProgramsTypePage from '@/components/programs/ProgramsTypePage'

export default async function AcceleratorsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <ProgramsTypePage type="accelerators" searchParams={searchParams} />
}
