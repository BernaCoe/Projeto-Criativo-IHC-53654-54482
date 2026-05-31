/* Feito por 54482 */

import './AppCard.css';

function AppCard({ title, children }) {
  return (
    <div className="app-card">
      {title && <div className="app-card-title">{title}</div>}
      {children}
    </div>
  );
}

export default AppCard;