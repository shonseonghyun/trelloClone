import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "../../atoms/toDoAtom";

const Card = styled.div<{isDragging:boolean}>`
  background-color:${(props)=>props.isDragging? '#74b9ff' : props.theme.cardColor};
  border-radius:5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  display:flex;
  justify-content: space-between;
  `;

interface IDraggableCardProps{
    boardId:string;
    toDoId:number, //날짜
    toDoText:string, //할일
    index:number; //인덱스
}

function DraggableCard({toDoId,toDoText,index,boardId}:IDraggableCardProps){
  const [allBoards,setAllBoards] = useRecoilState(toDoState);
  const delClick = ()=>{
    setAllBoards((list)=>{
      console.log("ss");
      console.log(list);
      const copyBoard = [...allBoards[boardId]];
      copyBoard.splice(index,1);

      return {
        ...allBoards,
        [boardId]:copyBoard
      }
    })
  }
 
  console.log(toDoText,"has been rendered");

    return (
        <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
                    {(magic,snapshot)=> 
                      <Card 
                        isDragging={snapshot.isDragging}
                          ref={magic.innerRef} 
                          {...magic.draggableProps} 
                          {...magic.dragHandleProps}
                      >
                          <div>
                            {toDoText}
                          </div>
                          <div>
                            <button onClick={delClick}>del</button>
                          </div>
                      </Card>
                    }
        </Draggable>
    );
}

export default React.memo(DraggableCard);