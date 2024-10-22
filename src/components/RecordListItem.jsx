import PropTypes from 'prop-types'
import styles from './RecordListItem.module.css';

const RecordListItem = ({item, onDoneRecord, onCancelRecord, onSetPriority}) => {
  const created_at = new Date(item.created_at);

  let rowPriorityClass = '';
  if (item.priority === 2) {
    rowPriorityClass = styles.rowGreen;
  } else if (item.priority === 0) {
    rowPriorityClass = styles.rowPink;
  }

  return (
    <tr className={rowPriorityClass}>
      <td className='title-column'>{item.text}</td> 
      <td>{created_at.toLocaleString('en-US').replace(',', '')}</td>
      <td className='button-column'>
        <button type="button" className="btn btn-success" onClick={() => onDoneRecord(item.id)}>
          Done
        </button>
      </td>
      <td className='delete-column button-column'>
        <button type="button" className={`btn ${styles.pinkButton}`} onClick={() => onCancelRecord(item.id)}>
          <i className="bi bi-trash"></i>
        </button>
      </td>
      <td>
        <button type="button" className="btn btn-light btn-sm" onClick={() => onSetPriority(item.id, 0)}>
          <i className="bi bi-arrow-down"></i>
        </button>
      </td>
      <td>
        <button type="button" className="btn btn-light btn-sm" onClick={() => onSetPriority(item.id, 1)}>
          <i className="bi bi-circle"></i>
        </button>
      </td>
      <td>
        <button type="button" className="btn btn-light btn-sm" onClick={() => onSetPriority(item.id, 2)}>
          <i className="bi bi-arrow-up"></i>
        </button>    
      </td>
    </tr>
  );
}

RecordListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDoneRecord: PropTypes.func.isRequired,
  onCancelRecord: PropTypes.func.isRequired,
  onSetPriority: PropTypes.func.isRequired,
};

export default RecordListItem