/**
 * Formulário de parâmetros da comparação.
 * Componente controlado — toda a validação e chamada ao simulador pertencem à
 * página/hook; aqui só existe apresentação e recolha de dados.
 */
import type { FormEvent } from 'react';
import { InterestType } from '../../../types';
import type { Asset } from '../../Assets';
import {
  MAX_COMPARISON_ASSETS,
  MAX_COMPARISON_CAPITAL,
  MAX_COMPARISON_PERIOD_MONTHS,
} from '../constants';
import type { ComparisonFormErrors, PeriodUnit } from '../types';
import AssetPicker from './AssetPicker';

interface ComparisonFormProps {
  assets: Asset[];
  assetsLoading: boolean;
  selectedIds: string[];
  initialCapital: string;
  periodValue: string;
  periodUnit: PeriodUnit;
  interestType: InterestType;
  periodMonths: number;
  errors: ComparisonFormErrors;
  isLoading: boolean;
  onAssetToggle: (assetId: string) => void;
  onCapitalChange: (value: string) => void;
  onPeriodValueChange: (value: string) => void;
  onPeriodUnitChange: (unit: PeriodUnit) => void;
  onInterestTypeChange: (type: InterestType) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUseExample: () => void;
  onClear: () => void;
}

function ComparisonForm({
  assets,
  assetsLoading,
  selectedIds,
  initialCapital,
  periodValue,
  periodUnit,
  interestType,
  periodMonths,
  errors,
  isLoading,
  onAssetToggle,
  onCapitalChange,
  onPeriodValueChange,
  onPeriodUnitChange,
  onInterestTypeChange,
  onSubmit,
  onUseExample,
  onClear,
}: ComparisonFormProps) {
  const selectedCount = selectedIds.length;
  const canCompare = selectedCount >= 2 && !isLoading;

  return (
    <form className="comparison-form" onSubmit={onSubmit} noValidate>
      <div className="comparison-form__section">
        <div className="comparison-form__section-header">
          <div>
            <span className="comparison-form__step">1</span>
            <h2>Escolher activos</h2>
            <p>
              Seleccione entre 2 e {MAX_COMPARISON_ASSETS} investimentos do
              catálogo académico.
            </p>
          </div>

          <div className="comparison-form__section-actions">
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onUseExample}
              disabled={isLoading || assetsLoading}
            >
              Usar exemplo
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onClear}
              disabled={isLoading}
            >
              Limpar
            </button>
          </div>
        </div>

        {assetsLoading && (
          <p className="comparison-form__hint" role="status">
            A carregar o catálogo de activos…
          </p>
        )}

        <AssetPicker
          assets={assets}
          selectedIds={selectedIds}
          disabled={isLoading || assetsLoading}
          onToggle={onAssetToggle}
        />

        {errors.assets && (
          <p className="comparison-form__error" role="alert">
            {errors.assets}
          </p>
        )}
      </div>

      <div className="comparison-form__section">
        <div className="comparison-form__section-header">
          <div>
            <span className="comparison-form__step">2</span>
            <h2>Definir parâmetros</h2>
            <p>
              O mesmo capital e prazo são enviados ao simulador para cada
              activo, permitindo uma comparação directa.
            </p>
          </div>
        </div>

        <div className="comparison-form__grid">
          <div className="comparison-field">
            <label htmlFor="comparison-capital">Capital inicial</label>
            <div className="comparison-field__control">
              <input
                id="comparison-capital"
                type="number"
                min={1}
                max={MAX_COMPARISON_CAPITAL}
                step={1000}
                inputMode="decimal"
                value={initialCapital}
                onChange={(event) => onCapitalChange(event.target.value)}
                disabled={isLoading}
                aria-invalid={Boolean(errors.capital)}
                aria-describedby={
                  errors.capital ? 'comparison-capital-error' : undefined
                }
              />
              <span className="comparison-field__suffix">Kz</span>
            </div>
            {errors.capital ? (
              <p
                id="comparison-capital-error"
                className="comparison-form__error"
                role="alert"
              >
                {errors.capital}
              </p>
            ) : (
              <p className="comparison-field__hint">
                Máximo aceite pelo simulador: 1 000 000 000 Kz.
              </p>
            )}
          </div>

          <div className="comparison-field">
            <label htmlFor="comparison-period">Período de investimento</label>
            <div className="comparison-field__control comparison-field__control--split">
              <input
                id="comparison-period"
                type="number"
                min={1}
                max={
                  periodUnit === 'years'
                    ? MAX_COMPARISON_PERIOD_MONTHS / 12
                    : MAX_COMPARISON_PERIOD_MONTHS
                }
                step={1}
                inputMode="numeric"
                value={periodValue}
                onChange={(event) => onPeriodValueChange(event.target.value)}
                disabled={isLoading}
                aria-invalid={Boolean(errors.period)}
                aria-describedby={
                  errors.period ? 'comparison-period-error' : undefined
                }
              />
              <select
                aria-label="Unidade do período"
                value={periodUnit}
                onChange={(event) =>
                  onPeriodUnitChange(event.target.value as PeriodUnit)
                }
                disabled={isLoading}
              >
                <option value="years">Anos</option>
                <option value="months">Meses</option>
              </select>
            </div>
            {errors.period ? (
              <p
                id="comparison-period-error"
                className="comparison-form__error"
                role="alert"
              >
                {errors.period}
              </p>
            ) : (
              <p className="comparison-field__hint">
                Equivale a {periodMonths > 0 ? periodMonths : 0} meses.
              </p>
            )}
          </div>

          <div className="comparison-field">
            <label htmlFor="comparison-interest-type">Tipo de cálculo</label>
            <div className="comparison-field__control">
              <select
                id="comparison-interest-type"
                value={interestType}
                onChange={(event) =>
                  onInterestTypeChange(event.target.value as InterestType)
                }
                disabled={isLoading}
              >
                <option value={InterestType.COMPOSTOS}>
                  Juros compostos
                </option>
                <option value={InterestType.SIMPLES}>Juros simples</option>
              </select>
            </div>
            <p className="comparison-field__hint">
              Aplicado igualmente a todos os activos pelo simulador.
            </p>
          </div>
        </div>

        {errors.currency && (
          <p className="comparison-form__error" role="alert">
            {errors.currency}
          </p>
        )}
      </div>

      <div className="comparison-form__footer">
        <p className="comparison-form__engine-note">
          O comparador não calcula juros. Envia os parâmetros ao módulo de
          simulação e apresenta os resultados devolvidos.
        </p>

        <button
          type="submit"
          className="btn btn--primary comparison-form__submit"
          disabled={!canCompare}
        >
          {isLoading ? 'A comparar investimentos…' : 'Comparar investimentos'}
        </button>
      </div>
    </form>
  );
}

export default ComparisonForm;
