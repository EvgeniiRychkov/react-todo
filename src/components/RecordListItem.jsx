import PropTypes from 'prop-types'
import styles from './RecordListItem.module.css';

const RecordListItem = ({item, onDoneRecord, onCancelRecord}) => {
  const created_at = new Date(item.created_at);

  return (
    <tr>
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
    </tr>
  );
}

RecordListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDoneRecord: PropTypes.func.isRequired,
  onCancelRecord: PropTypes.func.isRequired,
};

export default RecordListItem