'use client'

import { useState, useEffect, useRef } from "react"
// import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [booting, setBooting] = useState(true)
  const [logs, setLogs] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Boot sequence
  useEffect(() => {
    const bootLines = [
      'Initializing system...',
      'Detecting devices...',
      'Monitor: online',
      'Keyboard: connected',
      'Speaker: standby',
      'Mouse: ready',
      'Microphone: listening',
      'Main unit: active',
      'Loading compeleted!',
      'System ready.',
      'Welcome! Kokoro Hoshi Interface v1.0'
    ]
    
    let i = 0;

    const interval = setInterval(() => {
      if (i < bootLines.length-1) {
        setLogs(prev => [...prev, bootLines[i]])
        i++
      } else {
        clearInterval(interval)
        setBooting(false)
        inputRef.current?.focus()
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-start justify-center min-h-screen bg-background text-foreground font-mono p-4 sm:p-8">
      <div className="max-w-3xl mx-1 w-full">
        {logs.map((line, i) => (
          <div 
            key={i}
            className="mb-1 text-base sm:text-xl md:text-2xl text-shadow-(--text-glow)"
          >
            {'>'} {line}
            { i === logs.length - 1 && (
                <span className="inline animate-[pulse_0.6s_infinite]">|</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
