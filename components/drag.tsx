import React, { Children } from "react";
import { DndProvider, DragSourceMonitor, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Drag() {
  const [drop, dropRef] = useDrop(() => {
    return {
      accept: "BOX",
      drop: (item) => console.log(item),

      //   collect: (monitor) => ({
      //     isOver: monitor.isOver(),
      //     canDrop: monitor,
      //   }),
    };
  });

  const [isDragging, dragRef, dragPreview] = useDrag(() => {
    return {
      type: "BOX",
      item: {
        id: "sir",
      },

      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        ids: monitor.receiveHandlerId(""),
      }),
    };
  });

  return (
    <div>
      <div>hello</div>
    </div>
  );
}

export default Drag;

const DragWrapper = ({ children }: any) => {
  const [isDragging, dragRef, dragPreview] = useDrag(() => {
    return {
      type: "BOX",
      item: {
        id: "some things",
      },

      collect: (monitor: any) => ({
        isDragging: !!monitor.isDragging(),
        ids: monitor.receiveHandlerId(""),
      }),
    };
  });

  return <div ref={dragRef}>{...children}</div>;
};
