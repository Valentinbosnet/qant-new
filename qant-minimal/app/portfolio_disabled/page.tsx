export default function PortfolioPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Portfolio</h1>
        
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Portfolio Summary</h2>
            <p className="text-gray-600 mt-1">Overview of your investment portfolio</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
                <p className="text-2xl font-bold">$24,567.89</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Return</h3>
                <p className="text-2xl font-bold text-green-600">+$1,234.56 (5.2%)</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Assets</h3>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
              <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div className="bg-blue-500 h-full" style={{ width: "40%" }}></div>
                  <div className="bg-green-500 h-full" style={{ width: "30%" }}></div>
                  <div className="bg-yellow-500 h-full" style={{ width: "20%" }}></div>
                  <div className="bg-red-500 h-full" style={{ width: "10%" }}></div>
                </div>
              </div>
              <div className="flex flex-wrap mt-4 gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">Stocks (40%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Bonds (30%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm">Real Estate (20%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">Cash (10%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Holdings</h2>
            <p className="text-gray-600 mt-1">Your investment holdings</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: "AAPL", quantity: 10, price: 150.25, value: 1502.50, change: "+2.3%" },
                  { name: "MSFT", quantity: 5, price: 280.75, value: 1403.75, change: "+1.5%" },
                  { name: "GOOGL", quantity: 2, price: 2750.80, value: 5501.60, change: "+0.8%" },
                  { name: "AMZN", quantity: 3, price: 3300.45, value: 9901.35, change: "-0.5%" },
                  { name: "TSLA", quantity: 4, price: 650.60, value: 2602.40, change: "+3.2%" },
                ].map((asset) => (
                  <tr key={asset.name}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{asset.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{asset.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${asset.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${asset.value.toFixed(2)}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${asset.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                      {asset.change}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }