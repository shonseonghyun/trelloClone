import { useRecoilState } from "recoil";
import { toDoState } from "../../atoms/toDoAtom";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import Board from "./Board";

const  Wrapper = styled.div`
  display:flex;
  width:100px;
  min-width:680px;
  margin: 0 auto;
  justify-content:center;
  align-items:center;
  height:100vh;
`;

const BoardsWrapper = styled.div`
  display:grid;
  width:100%;
  grid-template-columns : repeat(3,1fr);
  gap:10px;
`;

function Boards(){
    const [allBoards,setAllBoards] = useRecoilState(toDoState); 

  const onDragEnd = (info:DropResult)=>{
    const {destination,source} = info;
    if(!destination) return;
    
    //같은 droppableId에서 이동하는 case
    if(destination?.droppableId === source.droppableId){
      setAllBoards((list)=>{
        //1. copy 불변 생성
        const boardCopy = [...list[source.droppableId]];
        const taskObj = boardCopy[source.index];
        
        //2. 기존 삭제
        boardCopy.splice(source.index,1);
        
        //3. 선택한 index에 두기
        boardCopy.splice(destination?.index , 0 ,taskObj);
        
        return {
          ...list,
          [source.droppableId]:boardCopy
        };
      })
    }
     
    //다른 droppableId에서 이동하는 case
    if(destination?.droppableId !== source.droppableId){
      setAllBoards((list)=>{
        const targetDroppableId = destination?.droppableId as string;
        const index = destination?.index as number;

        const boardSourceCopy = [...list[source.droppableId]];
        const taskObj = boardSourceCopy[source.index];
        const boardTargetCopy = [...list[targetDroppableId]];

        boardSourceCopy.splice(source.index,1);
        boardTargetCopy.splice(index,0,taskObj);
        return {
          ...list,
          [source.droppableId]:boardSourceCopy,
          [targetDroppableId]:boardTargetCopy
        };
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <BoardsWrapper>
          {
            Object.keys(allBoards).map(boardId =>
              <Board key={boardId} boardId={boardId} toDos={allBoards[boardId]}/>
            )
          }
        </BoardsWrapper>
      </Wrapper>
    </DragDropContext>
  );
}

export default Boards;