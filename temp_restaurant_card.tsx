        <div className="min-w-0">
          <h3 className="text-lg md:text-xl font-bold tracking-tight text-charcoal mb-2 truncate flex items-center gap-2">
            {restaurant.name}
            {restaurant.verified && (
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            )}
          </h3>
          
          <div className="flex flex-wrap gap-2 mb-3">
