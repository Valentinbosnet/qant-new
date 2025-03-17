export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-4xl p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
        <h1 className="text-4xl font-bold text-white text-center mb-8">About TradeAssist</h1>

        <p className="text-gray-300 text-lg mb-12">
          TradeAssist is your intelligent investment companion, designed to help you make smarter investment decisions
          through advanced AI-powered insights and real-time market analysis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-emerald-500 mb-6">Key Features</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-300">AI-Powered Market Analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-300">Real-time Portfolio Tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-300">Automated Risk Assessment</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-300">Custom Investment Strategies</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-emerald-500 mb-6">Benefits</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-300">Make Informed Decisions</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-300">Reduce Investment Risks</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-300">Track Performance Easily</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-300">Stay Updated with Markets</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

