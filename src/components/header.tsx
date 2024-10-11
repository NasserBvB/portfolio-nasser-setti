'use client'

import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { ModeToggle } from './theme-provider'

const HeaderComponent = () => {
  const [open, setOpen] = useState(false)
  return (
    <header className="flex-1 flex items-center justify-between gap-4 py-4">
      <Link href="/">
        <h1 className="text-4xl font-bold">Nasser Setti</h1>
      </Link>

      <div className="hidden sm:flex gap-4">
        <Links
          close={() => {
            setOpen(false)
          }}
        />
        <div>
          <ModeToggle />
        </div>
      </div>
      <div className="flex sm:hidden gap-4">
        <Button
          onClick={() => {
            setOpen(true)
          }}
        >
          <HamburgerMenuIcon />
        </Button>
      </div>
      <MobileMenu open={open} setOpen={setOpen} />
    </header>
  )
}

const Links = ({ close }: { close: () => void }) => {
  return (
    <Fragment>
      <Link onClick={close} className="text-lg font-medium line-clamp-1" href="/projects">
        Projects
      </Link>
      <Link onClick={close} className="text-lg font-medium line-clamp-1" href="/experiences">
        Experiences
      </Link>
      <Link onClick={close} className="text-lg font-medium line-clamp-1" href="/blogs">
        Blogs
      </Link>
    </Fragment>
  )
}

const MobileMenu = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  if (!open) return null
  return (
    <div className="z-10 flex sm:hidden flex-col gap-10 fixed top-0 left-0 h-screen w-full bg-white dark:bg-black py-4 px-4">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          onClick={() => {
            setOpen(false)
          }}
        >
          <h1 className="text-4xl font-bold">Nasser Setti</h1>
        </Link>
        <Button
          onClick={() => {
            setOpen(false)
          }}
        >
          <Cross1Icon />
        </Button>
      </div>
      <Separator />
      <div className="flex flex-col gap-4">
        <Links
          close={() => {
            setOpen(false)
          }}
        />
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <h4>Switch theme</h4>
        <ModeToggle />
      </div>
      <Button className="flex">Download CV</Button>
    </div>
  )
}

export default HeaderComponent
