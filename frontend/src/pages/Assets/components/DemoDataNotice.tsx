/**
 * Aviso transversal que identifica os dados do catálogo como fictícios.
 */
import { IconInfo } from '../../../components/Icons';
import { DEMO_DATA_DESCRIPTION, DEMO_DATA_TITLE } from '../constants';

interface DemoDataNoticeProps {
  /** Versão mais compacta para páginas de detalhe. */
  compact?: boolean;
}

function DemoDataNotice({ compact = false }: DemoDataNoticeProps) {
  return (
    <div
      className={`assets-demo-notice${
        compact ? ' assets-demo-notice--compact' : ''
      }`}
      role="note"
    >
      <span className="assets-demo-notice__icon" aria-hidden="true">
        <IconInfo size={18} />
      </span>

      <div>
        <strong>{DEMO_DATA_TITLE}</strong>
        <p>{DEMO_DATA_DESCRIPTION}</p>
      </div>
    </div>
  );
}

export default DemoDataNotice;
