import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') {
      setDark(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    } else if (stored === 'light') {
      setDark(false)
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDark(prefersDark)
    }
  }, [])

  function toggle() {
    const next = !dark
    setDark(next)
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 flex items-center justify-center rounded-[10px] border border-card-border bg-card text-text-muted hover:text-text cursor-pointer"
      style={{ transition: 'color 200ms cubic-bezier(0.23, 1, 0.32, 1)' }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center justify-center"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
