export default function Ticket({ amount, variant, label }) {
  return (
    <span className={`ticket ${variant ? `ticket-${variant}` : ''}`}>
      {label && <span className="ticket-currency">{label}</span>}
      {typeof amount === 'number' && (
        <>
          <span className="ticket-currency">$</span>
          {amount.toFixed(2)}
        </>
      )}
    </span>
  );
}
