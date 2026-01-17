import styled from "styled-components";

interface props {
  id: string;
  content: string;
  time: string;
  name: string;
  canDelete: boolean;
  onDelete: () => void;
}

const Card = ({ name, content, time, canDelete, onDelete }: props) => {
  return (
    <StyledWrapper>
      <article className="card">
        <header className="card-header">
          <span className="name">{name}</span>
          <span className="time">{time}</span>
        </header>

        <section className="card-body">
          <p>{content}</p>
          
        </section>

        {canDelete && (
          <footer className="card-footer">
            <button onClick={onDelete}>Delete</button>
          </footer>
        )}
      </article>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
.card {
  width: 100%;          /* Let it fill parent container */
  max-width: 360px;     /* Fixed max width on larger screens */
  min-width: 250px;     /* Prevent it from shrinking too small */
  height: 250px;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  background:
    linear-gradient(#fff, #fff) padding-box,
    linear-gradient(135deg, #7c3aed, #6366f1, #ec4899) border-box;
  border: 2px solid transparent;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.18);
  overflow: hidden;
}

/* Header */
.card-header {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.85rem;
}

.name {
  font-weight: 700;
  color: #4c1d95;
}

.time {
  color: #6b7280;
}

/* Body */
.card-body {
  position: relative;
  padding: 16px;
  height: 160px;
  overflow-y: auto;
  font-size: 0.95rem;
}

.card-body::after {
  content: "";
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  height: 32px;
  background: linear-gradient(to top, rgba(124, 58, 237, 0.4), transparent);
  pointer-events: none;
}

/* Footer */
.card-footer {
  padding: 14px 16px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
}

.card-footer button {
  background: linear-gradient(135deg, #7c3aed, #6366f1);
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  border: none;
}

.card-footer button:hover {
  opacity: 0.9;
}

/* Responsive tweaks */
@media (max-width: 768px) {
  .card {
    max-width: 100%;   /* Allow card to shrink inside the grid */
    min-width: 200px;  /* Prevent too small */
    height: 250px;
  }

  .card-body {
    height: 140px;
  }
}
`;


export default Card;
