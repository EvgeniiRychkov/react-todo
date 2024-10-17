import PropTypes from 'prop-types'

const CompletedListItem = ({item, onReactivateRecord}) => {
  const updated_at = new Date(item.updated_at);

  return (
    <tr>
      <td className='title-column'>{item.text}</td>
      <td>{updated_at.toLocaleString('en-US').replace(',', '')}</td>
      <td className='button-column'>
        <button type="button" className="btn btn-success" onClick={() => onReactivateRecord(item.id)}>
          Reactivate
        </button>  
      </td>
    </tr>
  );
}

CompletedListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onReactivateRecord: PropTypes.func.isRequired,
};

export default CompletedListItem