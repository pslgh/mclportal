// Simplified version of use-toast.ts
import { useState } from "react"

type ToastProps = {
  title: string
  description: string
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const toast = ({ title, description }: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, { title, description }])
    // In a real implementation, you'd want to remove the toast after a delay
  }

  return { toast, toasts }
}