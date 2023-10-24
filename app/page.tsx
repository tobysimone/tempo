
import Link from 'next/link';

export default async function Index() {
  return (
    <>
      <div className="w-full flex flex-col items-center">
          <div className="flex justify-center text-center text-xs">
            <p>
              Powered by{' '}
              <Link
                href="https://supabase.com/"
                target="_blank"
                className="font-bold"
              >
                Supabase
              </Link>
            </p>
          </div>
        </div>
    </>
  )
}