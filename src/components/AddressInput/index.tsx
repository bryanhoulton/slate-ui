import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import { createPortal } from 'react-dom'

import {
  Loader2,
  MapPin
} from 'lucide-react'

import { cn } from '../../utilities'
import { Icon } from '../Icon'
import { LabelStyles } from '../Label/Label.types'
import { TextInput } from '../TextInput'
import {
  AddressInputProps,
  AddressValue
} from './AddressInput.types'

export * from './AddressInput.types'

interface NominatimResult {
  display_name: string
  lat: string
  lon: string
  address?: {
    city?: string
    town?: string
    village?: string
    state?: string
    postcode?: string
    country?: string
  }
}

async function fetchNominatimSuggestions(
  query: string
): Promise<AddressValue[]> {
  const url =
    'https://nominatim.openstreetmap.org/search' +
    `?format=jsonv2&addressdetails=1&limit=5&q=${encodeURIComponent(query)}`
  const response = await fetch(url, {
    headers: { Accept: 'application/json' }
  })
  if (!response.ok) return []
  const results: NominatimResult[] = await response.json()
  return results.map((result) => ({
    formatted: result.display_name,
    lat: parseFloat(result.lat),
    lon: parseFloat(result.lon),
    city:
      result.address?.city ?? result.address?.town ?? result.address?.village,
    state: result.address?.state,
    postalCode: result.address?.postcode,
    country: result.address?.country
  }))
}

const MIN_QUERY_LENGTH = 3
const DEBOUNCE_MS = 300

export function AddressInput({
  label,
  error,
  placeholder = 'Search for an address...',
  disabled,
  value,
  onChange,
  fetchSuggestions = fetchNominatimSuggestions,
  styles,
  ref
}: AddressInputProps) {
  const [query, setQuery] = useState(value?.formatted ?? '')
  const [suggestions, setSuggestions] = useState<AddressValue[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  // Only fetch when the user has typed since the last selection/value sync.
  const [dirty, setDirty] = useState(false)

  const requestIdRef = useRef(0)
  const fetchSuggestionsRef = useRef(fetchSuggestions)
  fetchSuggestionsRef.current = fetchSuggestions

  // Keep the input text in sync with an externally-set value.
  useEffect(() => {
    if (value) {
      setQuery(value.formatted)
      setDirty(false)
      setOpen(false)
    }
  }, [value?.formatted])

  useEffect(() => {
    if (!dirty) return
    if (query.trim().length < MIN_QUERY_LENGTH) {
      requestIdRef.current++
      setSuggestions([])
      setLoading(false)
      setOpen(false)
      return
    }
    const requestId = ++requestIdRef.current
    setLoading(true)
    setOpen(true)
    const timeout = setTimeout(() => {
      fetchSuggestionsRef
        .current(query)
        .then((results) => {
          // Ignore stale (out-of-order) responses.
          if (requestIdRef.current !== requestId) return
          setSuggestions(results)
          setLoading(false)
        })
        .catch(() => {
          if (requestIdRef.current !== requestId) return
          setSuggestions([])
          setLoading(false)
        })
    }, DEBOUNCE_MS)
    return () => clearTimeout(timeout)
  }, [query, dirty])

  const inputRef = useRef<HTMLInputElement>(null)
  const [triggerRect, setTriggerRect] = useState<DOMRect>()

  useLayoutEffect(() => {
    const el = inputRef.current
    if (!el) return
    const update = () => setTriggerRect(el.getBoundingClientRect())
    update()
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null
    resizeObserver?.observe(el)
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [])

  const selectSuggestion = (suggestion: AddressValue) => {
    requestIdRef.current++
    setDirty(false)
    setQuery(suggestion.formatted)
    setSuggestions([])
    setLoading(false)
    setOpen(false)
    onChange(suggestion)
  }

  return (
    <div ref={ref} className="flex flex-col" style={styles?.root}>
      <TextInput
        ref={inputRef}
        label={label}
        error={error}
        value={query}
        placeholder={placeholder}
        disabled={disabled}
        iconLeft={MapPin}
        styles={{
          input: styles?.input,
          label: styles?.label as LabelStyles | undefined,
          error: styles?.error
        }}
        onChange={(text) => {
          setQuery(text)
          setDirty(true)
          if (value) onChange(null)
        }}
        onFocus={() => {
          if (dirty && (loading || suggestions.length > 0)) setOpen(true)
        }}
        onBlur={() => setOpen(false)}
        autoComplete="off"
      />

      {typeof document !== 'undefined' &&
        open &&
        triggerRect &&
        createPortal(
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              top: triggerRect.bottom + 4,
              left: triggerRect.left,
              width: triggerRect.width
            }}
          >
            <div
              className={cn(
                'w-full rounded-lg p-1 flex flex-col gap-1 border bg-white',
                'pointer-events-auto shadow-sm',
                'animate-slideDownAndFade max-h-72 overflow-auto overscroll-contain'
              )}
              style={styles?.content}
            >
              {loading && (
                <div className="flex items-center justify-center gap-2 text-muted text-sm py-2">
                  <Icon icon={Loader2} spin />
                  Searching...
                </div>
              )}

              {!loading &&
                suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.lat},${suggestion.lon},${index}`}
                    type="button"
                    className={cn(
                      'flex items-center rounded-lg text-sm p-2 gap-2 text-left',
                      'bg-white hover:bg-muted-light cursor-pointer'
                    )}
                    style={styles?.option}
                    // Select on mousedown so it runs before the input's blur.
                    onMouseDown={(e) => {
                      e.preventDefault()
                      selectSuggestion(suggestion)
                    }}
                  >
                    <Icon icon={MapPin} className="shrink-0" />
                    <span className="truncate">{suggestion.formatted}</span>
                  </button>
                ))}

              {!loading && suggestions.length === 0 && (
                <div className="text-muted text-center text-sm py-2">
                  No results found!
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
AddressInput.displayName = 'AddressInput'
