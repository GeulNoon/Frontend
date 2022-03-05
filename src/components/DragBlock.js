//요약하기 순서배열 문제
import React, { useState } from 'react';
import '../App.css';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

//블럭 요소
const MovableItem = ({name, setItems, item}) => {
    //다른 박스로 블럭 옮길 때 기존 박스에서 해당 블럭 제거 후 다른 박스 가장 뒤에 배치
    const changeItemColumn = (currentItem, columnName) => {
        const newList = item.filter((it) => it.name !== currentItem.name);
        setItems(newList);
        const newItem = {
            id: currentItem.name,
            name: currentItem.name,
            column: columnName,
        }
        setItems(newList.concat(newItem))
        /*
        setItems((prevState) => {
            return prevState.map(e => {
              return {
                ...e,
                column: e.name === currentItem.name ? columnName : e.column,
              }
            })
          })
        */
    }

    const [{ isDragging }, drag] = useDrag({
        type: 'Our first type',
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if(dropResult && dropResult.name === 'Example'){
                changeItemColumn(item, 'Example')
            } else {
                changeItemColumn(item, 'Answer')
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} className='movable-item' style={{ opacity }}>
            {name}
        </div>
    )
}

//블럭 담는 박스
const Column = ({children, className, title}) => {
    const [, drop] = useDrop({
        accept: 'Our first type',
        drop: () => ({name: title}),
    });

    return (
        <div ref={drop} className={className}>
            {title}
            {children}
        </div>
    )
}

export const DragBlock = (data) => {
    //임시 데이터(요약문 결과 입력)
    let arr = [];
    const sum = data['data'];
    for (let i = 0; i < sum.length; i++) {
        arr.push({
            id: i,
            name: sum[i],
            column: 'Example'
        });
    }

    const [items, setItems] = useState(arr);
    //입력받은 데이터 토대로 드래그 가능한 블럭 생성
    const returnItemsForColumn = (columnName) => {
        return items
        .filter((item)=>item.column === columnName)
        .map((item) => (
            <MovableItem key={item.id} name={item.name} setItems={setItems} item={items}/>
        ))
        
    }
    return (
        <div className="container">
            {/* Wrap components that will be "draggable" and "droppable" */}
            <DndProvider backend={HTML5Backend}>
                <Column title='Example' className='column first-column'>
                    {returnItemsForColumn('Example')}
                </Column>
                <Column title='Answer' className='column second-column'>
                    {returnItemsForColumn('Answer')}
                </Column>
            </DndProvider>
        </div>
    );
}