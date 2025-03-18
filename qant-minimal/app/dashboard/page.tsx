export default function DashboardPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Portfolio Value</h2>
            <p className="text-3xl font-bold text-green-600">$24,567.89</p>
            <p className="text-sm text-gray-500 mt-1">Updated: Today</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Monthly Change</h2>
            <p className="text-3xl font-bold text-green-600">+5.2%</p>
            <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Total Assets</h2>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-gray-500 mt-1">Across 4 categories</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Portfolio Update</p>
                    <p className="text-sm text-gray-500">Added new stock: AAPL</p>
                  </div>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Top Performers</h2>
            <div className="space-y-4">
              {[
                { name: "AAPL", change: "+8.2%" },
                { name: "MSFT", change: "+6.5%" },
                { name: "GOOGL", change: "+4.3%" },
              ].map((stock) => (
                <div key={stock.name} className="flex justify-between items-center">
                  <span className="font-medium">{stock.name}</span>
                  <span className="text-green-600">{stock.change}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Reports</h2>
            <div className="space-y-4">
              {[
                { name: "Q2 Financial Summary", date: "Jun 30, 2023" },
                { name: "Tax Report", date: "Jul 15, 2023" },
                { name: "Portfolio Analysis", date: "Jul 22, 2023" },
              ].map((report) => (
                <div key={report.name} className="flex justify-between items-center">
                  <span className="font-medium">{report.name}</span>
                  <span className="text-gray-500">{report.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }