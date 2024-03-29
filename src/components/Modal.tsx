interface IModalData {
  name: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLElement>) => void;
}

const Modal = ({ name, isOpen, onClose, onSubmit }: IModalData) => {
  if (!isOpen) return;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Delete product</h2>
        <form onSubmit={(e) => onSubmit(e)} className="flex flex-col space-y-4">
          <p>Are you sure you want to delete the product '{name}'?</p>
          <div className="flex justify-between items-center">
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              type="submit"
            >
              Delete
            </button>
            <button
              className="mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
