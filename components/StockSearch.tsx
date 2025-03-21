"use client"

import { useState, useEffect } from "react"
import { Search, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useMarketData } from "@/hooks/useMarketData"
import { useDebounce } from "@/hooks/useDebounce"

interface StockSearchProps {
  onSelect: (symbol: string, name: string) => void
}

export default function StockSearch({ onSelect }: StockSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const debouncedQuery = useDebounce(query, 500)
  const { searchStocks, isLoading } = useMarketData()

  // Effectuer la recherche lorsque la requête change
  useEffect(() => {
    const search = async () => {
      if (debouncedQuery.length < 2) {
        setResults([])
        return
      }

      setIsSearching(true)
      try {
        const data = await searchStocks(debouncedQuery)
        setResults(data)
        setIsVisible(true)
      } finally {
        setIsSearching(false)
      }
    }

    search()
  }, [debouncedQuery, searchStocks])

  // Gérer la sélection d'une action
  const handleSelect = (symbol: string, name: string) => {
    onSelect(symbol, name)
    setQuery("")
    setResults([])
    setIsVisible(false)
  }

  // Gérer l'effacement de la recherche
  const handleClear = () => {
    setQuery("")
    setResults([])
    setIsVisible(false)
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search for stocks (e.g. AAPL, MSFT)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-8 pr-8 bg-[#333333] border-gray-700 text-white"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white"
          >
            {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
          </button>
        )}
      </div>

      {isVisible && results.length > 0 && (
        <Card className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-[#2a2a2a] border-gray-800 shadow-lg">
          <ul className="py-1">
            {results.map((result) => (
              <li key={result["1. symbol"]}>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-left hover:bg-[#333333] text-white"
                  onClick={() => handleSelect(result["1. symbol"], result["2. name"])}
                >
                  <div>
                    <div className="font-medium">{result["1. symbol"]}</div>
                    <div className="text-xs text-gray-400 truncate">{result["2. name"]}</div>
                  </div>
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {isVisible && query.length >= 2 && results.length === 0 && !isSearching && (
        <Card className="absolute z-10 mt-1 w-full bg-[#2a2a2a] border-gray-800 shadow-lg">
          <div className="p-3 text-center text-gray-400">No results found for "{query}"</div>
        </Card>
      )}
    </div>
  )
}

