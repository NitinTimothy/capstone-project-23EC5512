import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import CalculatorForm from './components/CalculatorForm';
import SummaryCards from './components/SummaryCards';
import CashflowSchedule from './components/CashflowSchedule';
import SavedScenarios from './components/SavedScenarios';
import { calculateBuyStrategy } from './utils/calculatorEngine';
import { storageService } from './utils/storageService';

const INITIAL_FORM_DATA = {
  itemName: 'iPhone 16 Pro (128GB)',
  totalPrice: 120000,
  downPayment: 0,
  tenureMonths: 12,
  emiScheme: 'nocost',
  annualInterestRate: 14,
  processingFeePercent: 1,
  annualRoi: 12,
  salaryPledgePercent: 0,
  additionalCapital: 0,
};

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [savedScenarios, setSavedScenarios] = useState([]);

  useEffect(() => {
    const list = storageService.getSavedScenarios();
    setSavedScenarios(list);
  }, []);

  const calculationResult = useMemo(() => {
    return calculateBuyStrategy(formData);
  }, [formData]);

  const handleSelectPreset = (preset) => {
    setFormData((prev) => ({
      ...prev,
      itemName: preset.label.replace(/^[^\s]+\s/, ''),
      totalPrice: preset.price,
      tenureMonths: preset.tenure,
      annualRoi: preset.roi,
      emiScheme: preset.scheme,
      annualInterestRate: preset.rate || prev.annualInterestRate,
    }));
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
  };

  const handleSaveScenario = () => {
    const updated = storageService.saveScenario(calculationResult);
    setSavedScenarios(updated);
    alert(`Saved scenario "${calculationResult.itemName}" to Local Storage!`);
  };

  const handleLoadScenario = (item) => {
    setFormData({
      itemName: item.itemName || 'Saved Scenario',
      totalPrice: item.totalPrice || 100000,
      downPayment: item.downPayment || 0,
      tenureMonths: item.tenureMonths || 12,
      emiScheme: item.emiScheme || 'nocost',
      annualInterestRate: item.annualInterestRate || 14,
      processingFeePercent: item.processingFeePercent || 1,
      annualRoi: item.annualRoi || 12,
      salaryPledgePercent: item.salaryPledgePercent || 0,
      additionalCapital: item.additionalCapital || 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteScenario = (id) => {
    const updated = storageService.deleteScenario(id);
    setSavedScenarios(updated);
  };

  const handleClearAllScenarios = () => {
    if (window.confirm('Are you sure you want to clear all saved scenarios?')) {
      const updated = storageService.clearAll();
      setSavedScenarios(updated);
    }
  };

  return (
    <div className="container">
      <Header onSelectPreset={handleSelectPreset} />

      <main>
        <CalculatorForm
          formData={formData}
          onChange={setFormData}
          onReset={handleReset}
        />

        <SummaryCards
          result={calculationResult}
          onSave={handleSaveScenario}
        />

        <CashflowSchedule schedule={calculationResult.monthlySchedule} />

        <SavedScenarios
          scenarios={savedScenarios}
          onLoad={handleLoadScenario}
          onDelete={handleDeleteScenario}
          onClearAll={handleClearAllScenarios}
        />
      </main>
    </div>
  );
}
