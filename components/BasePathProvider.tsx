"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { getBasePath } from "../utils/basePath"

const BasePathContext = createContext<string>("")

export function useBasePath() {
  return useContext(BasePathContext)
}

export function BasePathProvider({ children }: { children: React.ReactNode }) {
  const [basePath, setBasePath] = useState<string>("")

  useEffect(() => {
    setBasePath(getBasePath())
  }, [])

  return <BasePathContext.Provider value={basePath}>{children}</BasePathContext.Provider>
}

