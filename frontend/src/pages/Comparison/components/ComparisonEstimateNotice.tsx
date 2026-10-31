/**
 * Aviso que separa explicitamente rendimento estimado de rendimento garantido.
 */
import { IconInfo } from '../../../components/Icons';
import {
  ESTIMATE_NOTICE_DESCRIPTION,
  ESTIMATE_NOTICE_TITLE,
} from '../constants';

function ComparisonEstimateNotice() {
  return (
    <aside className="comparison-estimate-notice" role="note">
      <span className="comparison-estimate-notice__icon" aria-hidden="true">
        <IconInfo size={20} />
      </span>

      <div className="comparison-estimate-notice__content">
        <strong>{ESTIMATE_NOTICE_TITLE}</strong>
        <p>{ESTIMATE_NOTICE_DESCRIPTION}</p>

        <div className="comparison-estimate-notice__legend">
          <span className="comparison-badge comparison-badge--estimate">
            Estimado
          </span>
          <span>
            Valor projectado pelo simulador, sujeito a variação.
          </span>
          <span className="comparison-badge comparison-badge--guaranteed">
            Garantido
          </span>
          <span>
            Só é apresentado quando essa informação vem do simulador.
          </span>
        </div>
      </div>
    </aside>
  );
}

export default ComparisonEstimateNotice;
