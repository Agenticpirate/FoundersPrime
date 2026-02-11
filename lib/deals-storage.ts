// Simple file-based storage for deals
import { Deal } from './deals-database'

// In a real application, this would be a database
// For now, we'll use localStorage in the browser and file system on server
let dealsStorage: Deal[] = []

export function initializeDealsStorage() {
  // Load deals from localStorage if available (client-side)
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('foundersprime-deals')
    if (stored) {
      try {
        dealsStorage = JSON.parse(stored)
      } catch (error) {
        console.error('Error loading deals from storage:', error)
        dealsStorage = []
      }
    }
  }
}

export function saveDealsToStorage(deals: Deal[]) {
  dealsStorage = deals
  
  // Save to localStorage if available (client-side)
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('foundersprime-deals', JSON.stringify(deals))
    } catch (error) {
      console.error('Error saving deals to storage:', error)
    }
  }
}

export function getDealsFromStorage(): Deal[] {
  // Initialize if empty and we're on client side
  if (dealsStorage.length === 0 && typeof window !== 'undefined') {
    initializeDealsStorage()
  }
  
  return dealsStorage
}

export function addDealsToStorage(newDeals: Deal[]) {
  const existingDeals = getDealsFromStorage()
  const allDeals = [...existingDeals, ...newDeals]
  
  // Remove duplicates based on ID
  const uniqueDeals = allDeals.filter((deal, index, self) => 
    index === self.findIndex(d => d.id === deal.id)
  )
  
  saveDealsToStorage(uniqueDeals)
  return uniqueDeals
}

export function clearDealsStorage() {
  dealsStorage = []
  if (typeof window !== 'undefined') {
    localStorage.removeItem('foundersprime-deals')
  }
}

// Initialize storage when module loads
if (typeof window !== 'undefined') {
  initializeDealsStorage()
}