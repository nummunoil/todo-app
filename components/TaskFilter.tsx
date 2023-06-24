import { useState, ChangeEvent } from "react";

type TaskFilterProps = {
  onFilterChange: (selectedStatus: string) => void;
};

type Option = {
  value: string;
  label: string;
};

const options: Option[] = [
  { value: "all", label: "All" },
  { value: "completed", label: "Done" },
  { value: "pending", label: "Undone" },
];

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Option>(options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: Option) => {
    const newStatus = option.value;
    setSelectedStatus(option);
    setIsOpen(false);
    onFilterChange(newStatus);
  };

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedStatus ? selectedStatus.label : "Select an option"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </div>
      {isOpen && (
        <div className="dropdown-options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`option ${
                selectedStatus.value === option.value ? "option-selected" : ""
              }`}
              onClick={() => handleSelectOption(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskFilter;
