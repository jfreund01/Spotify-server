import { MouseEvent } from "react";
import { useState } from "react";

// { items: [], heading: string }

interface ListGroupProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: ListGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>List Group</h1>
      {items.length === 0 && <p>No items to display</p>}
      <ul className='list-group'>
        {items.map((items, index) => (
          <li
            key={items}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              onSelectItem(items);
              setSelectedIndex(index);
            }}
          >
            {items}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
