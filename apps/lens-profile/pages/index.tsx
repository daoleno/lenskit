import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [search, setSearch] = useState('')
  const handleSumbit = (e: any) => {
    e.preventDefault()
    window.open(`/${search}`, '_blank')
  }
  return (
    <>
      <section className="mt-32 flex flex-col space-y-6">
        <div className="mx-auto max-w-screen-xl px-4 pb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Lens Profile </h1>
          <h2 className="mt-4 text-gray-700">Explore Lens Protocol Profiles and Publications</h2>
          <div className="mx-auto mt-4 grid max-w-lg text-sm leading-relaxed text-gray-500">
            Available ranks are S+ (&gt; 1000), S (&gt; 500), A++ (&gt; 100), A+ (&gt; 50), and B+
            (everyone). The values are calculated by using the total publications.
          </div>
        </div>
        <form className="mx-auto mb-0 flex" onSubmit={handleSumbit}>
          <div className="relative">
            <input
              className="h-10 rounded-lg border border-gray-200 pr-10 pl-3 text-sm placeholder-gray-300 focus:z-10"
              placeholder="Search Handle..."
              type="text"
              onInput={(e) => setSearch(e.currentTarget.value)}
            />

            <button
              type="submit"
              className="absolute inset-y-0 right-0 mr-px rounded-r-lg p-2 text-gray-600"
            >
              <MagnifyingGlassIcon className="h-5 w-5 font-bold" />
            </button>
          </div>
        </form>
        <div className="mx-auto flex space-x-3 text-gray-400 underline">
          <Link href="/lensprotocol" target={'_blank'}>
            lensprotocol
          </Link>
          <Link href="/stani.lens" target={'_blank'}>
            stani.lens
          </Link>
          <Link href="/lenster.lens" target={'_blank'}>
            lenster.lens
          </Link>
        </div>
        <div className="mx-auto flex flex-col space-y-3 px-4 pb-12 sm:space-x-0 md:flex-row md:space-y-0 md:space-x-3">
          <Image
            className="rounded-lg"
            src="/profile1.png"
            width={400}
            height={300}
            alt="profile1"
          />
          <Image
            className="rounded-lg"
            src="/profile2.png"
            width={400}
            height={300}
            alt="profile2"
          />
          <Image
            className="rounded-lg"
            src="/profile3.png"
            width={400}
            height={300}
            alt="profile3"
          />
        </div>
      </section>
      <footer className="border-t border-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-12">
          <Link className="inline-flex gap-1.5 text-lg  font-medium" href="/">
            <span>LensKit</span>
            <span aria-hidden="true" role="img">
              🚀
            </span>
          </Link>
          <div className="mt-6 lg:flex lg:items-end lg:justify-between">
            <div>
              <p className="relin-paragraph-target max-w-md leading-relaxed text-gray-500">
                A set of libraries for integrating lens protocol into your application.
              </p>
              <div className="mt-4 flex space-x-3">
                <a
                  href="https://github.com/daoleno/lenskit"
                  rel="noreferrer"
                  target="_blank"
                  className="hover:opacity-75"
                >
                  <span className="sr-only"> GitHub </span>
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/dao_leno"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:opacity-75"
                >
                  <span className="sr-only">Twitter</span>

                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <p className="relin-paragraph-target mt-4 text-sm text-gray-500 lg:mt-0">
              Created by daoleno.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
