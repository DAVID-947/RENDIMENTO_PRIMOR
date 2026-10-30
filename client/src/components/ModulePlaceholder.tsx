/**
 * ModulePlaceholder — ecrã de reserva para módulos em desenvolvimento.
 * Permite que as rotas fiquem já integradas no layout sem implementar
 * funcionalidades que pertencem a outros integrantes.
 */
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { IconArrowUpRight, IconInfo } from './Icons';
import './ModulePlaceholder.css';

interface ModulePlaceholderProps {
  /** Nome curto do módulo (ex.: "Simulador"). */
  title: string;
  /** Descrição do objetivo do módulo. */
  description: string;
  /** Área/módulo a que pertence o ecrã. */
  area: string;
  /** Funcionalidades previstas para o módulo. */
  plannedFeatures: string[];
  /** Ícone representativo do módulo. */
  icon: ReactNode;
}

function ModulePlaceholder({
  title,
  description,
  area,
  plannedFeatures,
  icon,
}: ModulePlaceholderProps) {
  return (
    <div className="module-placeholder">
      <header className="module-placeholder__header">
        <p className="module-placeholder__eyebrow">Módulo reservado</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      <section className="module-placeholder__card" aria-label={area}>
        <div className="module-placeholder__icon" aria-hidden="true">
          {icon}
        </div>

        <div className="module-placeholder__content">
          <span className="module-placeholder__badge">
            <IconInfo size={14} />
            Em desenvolvimento
          </span>

          <h2>{area}</h2>
          <p>
            Este ecrã está preparado para receber o módulo desenvolvido pelo
            integrante responsável. A rota, o layout e a navegação já estão
            integrados.
          </p>

          <h3>Funcionalidades previstas</h3>
          <ul>
            {plannedFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <Link to="/" className="module-placeholder__link">
            Voltar ao Dashboard
            <IconArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ModulePlaceholder;
