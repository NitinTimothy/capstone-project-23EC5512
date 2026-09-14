/**
 * Smart Buy Advisor - LocalStorage Service
 * Handles client-side CRUD persistence for saved scenarios.
 */

const STORAGE_KEY = 'smart_buy_saved_scenarios';

const DEFAULT_SCENARIOS = [
  {
    id: 'demo-1',
    timestamp: new Date().toISOString(),
    itemName: 'iPhone 16 Pro (128GB)',
    totalPrice: 120000,
    tenureMonths: 12,
    emiScheme: 'nocost',
    annualRoi: 12,
    netSavings: 14250,
    isEmiBetter: true,
  },
  {
    id: 'demo-2',
    timestamp: new Date().toISOString(),
    itemName: 'MacBook Air M3',
    totalPrice: 114900,
    tenureMonths: 18,
    emiScheme: 'standard',
    annualInterestRate: 14,
    annualRoi: 12,
    netSavings: 2100,
    isEmiBetter: true,
  },
];

export const storageService = {
  getSavedScenarios() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SCENARIOS));
        return DEFAULT_SCENARIOS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read from localStorage', e);
      return DEFAULT_SCENARIOS;
    }
  },

  saveScenario(calculationResult) {
    try {
      const current = this.getSavedScenarios();
      const newEntry = {
        id: 'scenario-' + Date.now(),
        timestamp: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        ...calculationResult,
      };
      const updated = [newEntry, ...current];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to save scenario', e);
      return [];
    }
  },

  deleteScenario(id) {
    try {
      const current = this.getSavedScenarios();
      const updated = current.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to delete scenario', e);
      return [];
    }
  },

  clearAll() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    } catch (e) {
      console.error('Failed to clear scenarios', e);
      return [];
    }
  },
};
