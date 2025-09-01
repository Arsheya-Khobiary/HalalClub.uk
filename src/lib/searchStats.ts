// Validate UK postcode format
export function isValidUKPostcode(postcode: string): boolean {
  if (!postcode) return false
  
  // UK postcode regex pattern
  const ukPostcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i
  const cleanPostcode = postcode.trim().toUpperCase()
  
  return ukPostcodeRegex.test(cleanPostcode)
}

// Generate realistic search statistics for valid postcodes only
export function generateSearchStats(postcode: string): number {
  if (!postcode || !isValidUKPostcode(postcode)) return 0
  
  // Use postcode to generate consistent but realistic numbers
  const cleanPostcode = postcode.toUpperCase().replace(/\s/g, '')
  
  // Create a hash from postcode for consistency
  let hash = 0
  for (let i = 0; i < cleanPostcode.length; i++) {
    const char = cleanPostcode.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  
  // Use hash to generate number between 286 and 3000
  const min = 286
  const max = 3000
  const range = max - min
  
  // Make it positive and within range
  const normalizedHash = Math.abs(hash) % range
  const baseNumber = min + normalizedHash
  
  // Add some randomness but keep it realistic (not round numbers)
  const variance = Math.abs(hash % 100) - 50 // -50 to +49
  const finalNumber = Math.max(min, Math.min(max, baseNumber + variance))
  
  return finalNumber
}

// Get area name from postcode for display
export function getAreaFromPostcode(postcode: string): string {
  if (!postcode) return 'this area'
  
  const cleanPostcode = postcode.toUpperCase().replace(/\s/g, '')
  const prefix = cleanPostcode.substring(0, 2)
  
  // Map common UK postcode prefixes to areas
  const areaMap: Record<string, string> = {
    'B1': 'Birmingham City Centre',
    'B2': 'Birmingham',
    'B3': 'Birmingham',
    'B4': 'Birmingham',
    'B5': 'Birmingham',
    'M1': 'Manchester City Centre',
    'M2': 'Manchester',
    'M3': 'Manchester',
    'M4': 'Manchester',
    'E1': 'East London',
    'E2': 'East London',
    'E7': 'East London',
    'E8': 'East London',
    'SW1': 'Central London',
    'SW2': 'South London',
    'NW1': 'North London',
    'NW2': 'North London',
    'SE1': 'South East London',
    'SE2': 'South East London',
    'W1': 'West London',
    'W2': 'West London',
    'LS1': 'Leeds City Centre',
    'LS2': 'Leeds',
    'S1': 'Sheffield City Centre',
    'S2': 'Sheffield',
    'L1': 'Liverpool City Centre',
    'L2': 'Liverpool',
    'BD1': 'Bradford',
    'BD2': 'Bradford',
    'OL1': 'Oldham',
    'OL2': 'Oldham',
  }
  
  return areaMap[prefix] || 'this area'
} 