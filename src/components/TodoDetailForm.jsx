import React from 'react'
import PropTypes from 'prop-types'
import styles from './TodoDetailForm.module.css';
import { Link, useParams } from 'react-router-dom'
import RecordListItem from './RecordListItem.jsx'
import CompletedListItem from './CompletedListItem.jsx'
import InputWithLabel from './InputWithLabel.jsx'
import { Nav, Tab } from 'react-bootstrap';

const url = `${import.meta.env.VITE_RAILS_API_PATH}`

const TodoDetailForm = ({ todoList }) => {
  const { id } = useParams();
  const todo = todoList.find(item => item.id === parseInt(id));
  const [records, setRecords] = React.useState([]);
  const [completedRecords, setCompletedRecords] = React.useState([]);
  const [canceledRecords, setCanceledRecords] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [recordTitle, setRecordTitle] = React.useState("");

  React.useEffect(() => {
    fetchData();   
  }, []);

  const handleTitleChange = (event) => {
    const recordTitle = event.target.value;
    setRecordTitle(recordTitle);
  }

  const handleAddRecord = (event) => {
    event.preventDefault(); 
    addRecord(); 
  }

  const addRecord = async() => {
    const newRecordData = {
      record: {
        text: recordTitle,
      },
    };

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecordData),
    }

    try {
      const response = await fetch(url + `/tasks/${id}/records`, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
    } catch (error) {
      console.log(error.message)
    }
    setRecordTitle(""); 
    fetchData();
  }

  const fetchData = async() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }

    try {
      const response = await fetch(url + '/tasks/' + id + '.json', options);

      if (!response.ok) {
        console.log(response);
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      const newRecords = data.records.map((record) => {
        const newRecord = {
          id: record.id,
          text: record.text,
          created_at: record.created_at,
          task_id: id,
        };
        return newRecord;
      });

      const newCompletedRecords = data.completed_records.map((record) => {
        const newRecord = {
          id: record.id,
          text: record.text,
          created_at: record.created_at,
          updated_at: record.updated_at,
          task_id: id,
        };
        return newRecord;
      });

      const newCanceledRecords = data.canceled_records.map((record) => {
        const newRecord = {
          id: record.id,
          text: record.text,
          created_at: record.created_at,
          updated_at: record.updated_at,
          task_id: id,
        };
        return newRecord;
      });

      setRecords(newRecords);
      setCompletedRecords(newCompletedRecords);
      setCanceledRecords(newCanceledRecords);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleDoneRecord = async (record_id) => {
    setIsLoading(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }

    try {
      const response = await fetch(`${url}/tasks/${id}/records/${record_id}/done`, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
    } catch (error) {
      console.log(error.message)
    }

    fetchData();
  };

  const handleCancelRecord = async (record_id) => {
    setIsLoading(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }

    try {
      const response = await fetch(`${url}/tasks/${id}/records/${record_id}/cancel`, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
    } catch (error) {
      console.log(error.message)
    }

    fetchData();
  };

  const handleReactivateRecord = async (record_id) => {
    setIsLoading(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }

    try {
      const response = await fetch(`${url}/tasks/${id}/records/${record_id}/activate`, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
    } catch (error) {
      console.log(error.message)
    }

    fetchData();
  };

  return (
    <>
      <div className="d-flex justify-content-start">
        <Link to={import.meta.env.VITE_BASE_PATH}>
          <button className="btn p-0">
            <i className={`bi bi-reply-fill fs-2 text-secondary ${styles.backArrow}`}></i>            
          </button>
        </Link>
      </div>

      <h2 style={{ marginBottom: '30px' }}>{todo.title}</h2>
      
      <form onSubmit={handleAddRecord}>
        <div className='container row align-items-center' style={{ marginBottom: '40px' }}>
            <InputWithLabel title={recordTitle} handleTitleChange={handleTitleChange} inputID='recordTitle'>
              New task:
            </InputWithLabel>
          <div className="col-auto">
            <button className='btn btn-success' type="submit">Add</button>
          </div>
        </div>
      </form>

      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <Tab.Container defaultActiveKey="active">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="active">Active</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="completed">Completed</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="canceled">Deleted</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="active">
                <table className="table" style={{ marginTop: '20px' }}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Created at</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map(item => (
                      <RecordListItem 
                        key={item.id} 
                        item={item} 
                        onDoneRecord={handleDoneRecord} 
                        onCancelRecord={handleCancelRecord} 
                      />
                    ))}
                  </tbody>
                </table>
              </Tab.Pane>

              <Tab.Pane eventKey="completed">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Completed at</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedRecords.map(item => (
                      <CompletedListItem 
                        key={item.id} 
                        item={item} 
                        onReactivateRecord={handleReactivateRecord} 
                      />
                    ))}
                  </tbody>
                </table>
              </Tab.Pane>

              <Tab.Pane eventKey="canceled">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Deleted at</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {canceledRecords.map(item => (
                      <CompletedListItem 
                        key={item.id} 
                        item={item} 
                        onReactivateRecord={handleReactivateRecord} 
                      />
                    ))}
                  </tbody>
                </table>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </>
      )}
    </>
  )
}

TodoDetailForm.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default TodoDetailForm