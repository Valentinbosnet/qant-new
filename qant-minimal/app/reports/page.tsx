export default function ReportsPage() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Reports</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Monthly Report</h2>
            <p className="text-gray-600 mb-4">Summary of your portfolio performance for the current month.</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View Report</button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Quarterly Analysis</h2>
            <p className="text-gray-600 mb-4">Detailed analysis of your investments over the last quarter.</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View Report</button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Tax Report</h2>
            <p className="text-gray-600 mb-4">Summary of taxable events and estimated tax liability.</p>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View Report</button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Recent Reports</h2>
            <p className="text-gray-600 mt-1">Your recently generated reports</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {[
              { name: "May 2023 Performance Report", date: "Jun 1, 2023", type: "Monthly" },
              { name: "Q1 2023 Portfolio Analysis", date: "Apr 15, 2023", type: "Quarterly" },
              { name: "2022 Tax Summary", date: "Jan 31, 2023", type: "Annual" },
              { name: "April 2023 Performance Report", date: "May 1, 2023", type: "Monthly" },
              { name: "March 2023 Performance Report", date: "Apr 1, 2023", type: "Monthly" },
            ].map((report) => (
              <div key={report.name} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{report.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Generated: {report.date}</p>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded">
                    {report.type}
                  </span>
                </div>
                <div className="mt-4 flex space-x-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Report
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Custom Reports</h2>
            <p className="text-gray-600 mt-1">Generate custom reports based on your criteria</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Type
                </label>
                <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Performance Report</option>
                  <option>Tax Report</option>
                  <option>Asset Allocation</option>
                  <option>Dividend Report</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Period
                </label>
                <select className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option>Last Month</option>
                  <option>Last Quarter</option>
                  <option>Last Year</option>
                  <option>Custom Range</option>
                </select>
              </div>
            </div>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    )
  }