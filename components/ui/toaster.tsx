"use client"

import { useToast } from "./use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {toasts.map((toast, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 mb-2">
          <h3 className="font-bold">{toast.title}</h3>
          <p>{toast.description}</p>
        </div>
      ))}
    </div>
  )
}