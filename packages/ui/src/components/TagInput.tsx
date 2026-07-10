"use client"

import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input"

interface TagInputProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

function TagInput({ value = [], onChange, placeholder }: TagInputProps) {
  const [pendingValue, setPendingValue] = React.useState("")

  const addTag = () => {
    const trimmed = pendingValue.trim()
    if (!trimmed) return
    const exists = value.some((tag) => tag === trimmed)
    if (!exists) {
      onChange([...value, trimmed])
      setPendingValue("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    } else if (e.key === "Backspace" && !pendingValue && value.length > 0) {
      e.preventDefault()
      const tagToRemove = value[value.length - 1] ?? ""
      removeTag(tagToRemove)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2 p-1 border rounded-md min-h-10 items-center bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        {value.map((tag) => (
          <Badge key={tag} variant='secondary' className="pl-1.5 pr-0.5 ">
            <span className="text-sm">{tag} </span>
            <button
              aria-label={`Remove ${tag}`}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => removeTag(tag)}
              className="rounded-full outline-none hover:bg-muted-foreground/20 p-0.5"

            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input
          type="text"
          value={pendingValue}
          onChange={(e) => setPendingValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-7 px-1 bg-transparent min-w-md"
        />
      </div>
    </div>
  )
}


export {TagInput}
