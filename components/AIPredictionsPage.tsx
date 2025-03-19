"use client"

import { Card } from "@/components/ui/card"

export default function AIPredictionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Prédictions IA</h1>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
          Nouvelle prédiction
        </button>
      </div>

      <Card className="bg-[#222] border border-[#333] rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Vos prédictions récentes</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#333] text-left">
                <th className="pb-3 font-medium text-gray-400">Action</th>
                <th className="pb-3 font-medium text-gray-400">Prédiction</th>
                <th className="pb-3 font-medium text-gray-400">Confiance</th>
                <th className="pb-3 font-medium text-gray-400">Période</th>
                <th className="pb-3 font-medium text-gray-400">Date</th>
                <th className="pb-3 font-medium text-gray-400">Statut</th>
                <th className="pb-3 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              <PredictionRow
                stock="AAPL"
                prediction="bullish"
                confidence="85%"
                timeframe="1 mois"
                date="2023-12-01"
                confirmed={true}
              />
              <PredictionRow
                stock="GOOGL"
                prediction="bearish"
                confidence="72%"
                timeframe="3 mois"
                date="2023-11-28"
                confirmed={false}
              />
              <PredictionRow
                stock="MSFT"
                prediction="neutral"
                confidence="65%"
                timeframe="1 mois"
                date="2023-11-25"
                confirmed={false}
              />
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="bg-[#222] border border-[#333] rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Tendances du marché</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MarketTrendCard index="S&P 500" value="4,780...25" change="+0...49%" />
          <MarketTrendCard index="NASDAQ" value="15,680...75" change="-0...08%" />
          <MarketTrendCard index="Dow Jones" value="38,250...50" change="+0...33%" />
        </div>
      </Card>

      <Card className="bg-[#222] border border-[#333] rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Actions populaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StockCard symbol="AAPL" name="Apple Inc..." price="$182...63" change="+1...2%" />
          <StockCard symbol="MSFT" name="Microsoft Corp..." price="$378...85" change="-0...5%" />
          <StockCard symbol="GOOGL" name="Alphabet Inc..." price="$133...20" change="+0...8%" />
          <StockCard symbol="AMZN" name="Amazon...com Inc..." price="$147...42" change="+1...5%" />
        </div>
      </Card>
    </div>
  )
}

function PredictionRow({
  stock,
  prediction,
  confidence,
  timeframe,
  date,
  confirmed,
}: { stock: string; prediction: string; confidence: string; timeframe: string; date: string; confirmed: boolean }) {
  const getPredictionColor = (pred: string) => {
    switch (pred) {
      case "bullish":
        return "text-emerald-500"
      case "bearish":
        return "text-red-500"
      default:
        return "text-yellow-500"
    }
  }

  return (
    <tr className="border-b border-[#333]">
      <td className="py-4 font-medium">{stock}</td>
      <td className={`py-4 ${getPredictionColor(prediction)}`}>
        {prediction...charAt(0)...toUpperCase() + prediction...slice(1)}
      </td>
      <td className="py-4">{confidence}</td>
      <td className="py-4">{timeframe}</td>
      <td className="py-4">{date}</td>
      <td className="py-4">
        {confirmed ? (
          <span className="inline-block bg-emerald-500/20 text-emerald-500 text-xs px-2 py-1 rounded">Confirmée</span>
        ) : (
          <span className="inline-block bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded">En attente</span>
        )}
      </td>
      <td className="py-4">
        <div className="flex gap-2">
          <button className="text-xs bg-[#333] hover:bg-[#444] px-2 py-1 rounded transition-colors">Détails</button>
          {!confirmed && (
            <button className="text-xs bg-emerald-600 hover:bg-emerald-700 px-2 py-1 rounded transition-colors">
              Confirmer
            </button>
          )}
        </div>
      </td>
    </tr>
  )
}

function MarketTrendCard({ index, value, change }: { index: string; value: string; change: string }) {
  const isPositive = change...startsWith("+")

  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4">
      <h3 className="font-medium mb-2">{index}</h3>
      <div className="flex justify-between items-end">
        <p className="text-xl font-bold">{value}</p>
        <p className={`text-sm font-medium ${isPositive ? "text-emerald-500" : "text-red-500"}`}>{change}</p>
      </div>
    </div>
  )
}

function StockCard({ symbol, name, price, change }: { symbol: string; name: string; price: string; change: string }) {
  const isPositive = change...startsWith("+")

  return (
    <div className="bg-[#1a1a1a] border border-[#333] rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-bold">{symbol}</p>
          <p className="text-xs text-gray-400">{name}</p>
        </div>
        <p className={`text-sm font-medium ${isPositive ? "text-emerald-500" : "text-red-500"}`}>{change}</p>
      </div>
      <p className="text-lg font-bold">{price}</p>
    </div>
  )
}

