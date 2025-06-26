import React from 'react'

const ProjectFilters = ({ 
  filters, 
  activeFilters, 
  onFilterChange, 
  searchTerm, 
  onSearchChange, 
  isDarkMode,
  projectCount
}) => {
  const { categories, types, complexities } = filters

  return (
    <div className="mb-8 space-y-6">
      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full px-4 py-3 pl-12 rounded-xl border ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <span className="text-gray-400">🔍</span>
          </div>
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-4">
        {/* Category Filters */}
        <div className="text-center">
          <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Category
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onFilterChange('category', category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilters.category === category
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg scale-105'
                    : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filters */}
        <div className="text-center">
          <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Type
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => onFilterChange('type', type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilters.type === type
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg scale-105'
                    : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Complexity Filters */}
        <div className="text-center">
          <h4 className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Complexity
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {complexities.map((complexity) => (
              <button
                key={complexity}
                onClick={() => onFilterChange('complexity', complexity)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilters.complexity === complexity
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg scale-105'
                    : isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {complexity}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-center">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showing {projectCount} project{projectCount !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Clear Filters */}
      {(activeFilters.category !== 'All' || activeFilters.type !== 'All' || activeFilters.complexity !== 'All' || searchTerm) && (
        <div className="text-center">
          <button
            onClick={() => {
              onFilterChange('category', 'All')
              onFilterChange('type', 'All')
              onFilterChange('complexity', 'All')
              onSearchChange('')
            }}
            className={`px-4 py-2 text-sm ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            } transition-colors duration-200`}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}

export default ProjectFilters
