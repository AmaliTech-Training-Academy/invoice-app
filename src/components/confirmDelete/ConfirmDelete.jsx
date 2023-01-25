import './ConfirmDelete.css'


const ConfirmDelete = ({darkMode}) => {
  return (
    <section className='delete-modal'>
        <div className={`delete-container ${darkMode ? 'delete-container-dark' :'delete-container-light'}`}>
            <div className="delete-content">
              <p className={`heading ${darkMode ? 'heading-dark' : 'heading-light'}`}>Confirm Deletion</p>
              <p className={`delete-paragraph ${darkMode ? 'delete-paragraph-dark' : 'delete-paragraph-light'}`}>
              Are you sure you want to delete invoice #XM9141? This action cannot be undone.
              </p>
              <div className="cancel-delete-btn">
                <button className={`confirm-button ${darkMode ? 'cancel-btn-dark' : 'cancel-btn-light'}`}>Cancel</button>
                <button className="confirm-button delete-btn">Delete</button>
              </div>
            </div>
        </div>
    </section>
  )
}

export default ConfirmDelete