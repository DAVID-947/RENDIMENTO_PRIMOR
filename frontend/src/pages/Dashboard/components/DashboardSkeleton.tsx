/**
 * DashboardSkeleton — placeholder animado durante o carregamento.
 * Mantém a estrutura visual do Dashboard para evitar saltos de layout.
 */
function DashboardSkeleton() {
  return (
    <div
      className="dashboard dashboard--skeleton"
      aria-busy="true"
      aria-label="A carregar o Dashboard"
    >
      <div className="skeleton dashboard-skeleton__banner" />
      <div className="skeleton dashboard-skeleton__heading" />

      <div className="dashboard__kpis">
        <div className="skeleton dashboard-skeleton__kpi" />
        <div className="skeleton dashboard-skeleton__kpi" />
        <div className="skeleton dashboard-skeleton__kpi" />
      </div>

      <div className="dashboard__grid">
        <div className="skeleton dashboard-skeleton__chart" />
        <div className="skeleton dashboard-skeleton__side" />
      </div>

      <div className="skeleton dashboard-skeleton__table" />
    </div>
  );
}

export default DashboardSkeleton;
