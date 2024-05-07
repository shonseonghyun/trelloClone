import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";
import { useRecoilState } from "recoil";
import { toDoState } from "../../atoms/toDoAtom";

const  Wrapper = styled.div`
  display:flex;
  width:100px;
  min-width:680px;
  margin: 0 auto;
  justify-content:center;
  align-items:center;
  height:100vh;
`;


const BoardWrapper = styled.div`
    display:grid;
    width:100%;
    grid-template-columns : repeat(3,1fr);
    gap:10px;
`;



function MyBoards(){
    const [allBoards,setAllBoards] = useRecoilState(toDoState); 

    const onDragEnd=({source,destination,type}:DropResult)=>{
        if (!destination) return;

        if (
            destination?.droppableId === source.droppableId &&
            source.index === destination?.index
        ) return;

        //Column 드래그 case
        if(type=="column"){
            setAllBoards((list)=>{
                //1. 객체를 배열로 변경
                const copyArr = Object.entries(allBoards);
                //2. 드래그된 컬럼 삭제
                copyArr.splice(source.index,1);
                //3. 드래그된 컬럼 원하는 순서에 삽입
                copyArr.splice(destination?.index as number,0,Object.entries(allBoards)[source.index]);
                //4. 배열을 객체로 변경
                const newObj = Object.fromEntries(copyArr);
                //5. 반환
                return newObj;
            })
            return;
        }


        //다른 droppableId에서 이동하는 경우
        if(destination?.droppableId !== source.droppableId){
            setAllBoards((list)=>{
                //1. 배열 불변 생성
                const sourceCopy = [...allBoards[source.droppableId]];
                const targetCopy = [...allBoards[destination?.droppableId]];
                const taskObj = sourceCopy[source.index];

                sourceCopy.splice(source.index,1);
                targetCopy.splice(destination?.index,0,taskObj);

                return {
                    ...list,
                    [source.droppableId]:sourceCopy,
                    [destination.droppableId]:targetCopy
                }
            })

        }

        //같은 droppableId에서 이동하는 경우
        if(destination?.droppableId === source.droppableId){
            setAllBoards((list)=>{
                //1. 기존 배열 불변생성
                const copy = [...allBoards[source.droppableId]];
                const taskObj = copy[source.index];
    
                //2. 삭제
                copy.splice(source.index,1);
                //3. 추가
                copy.splice(destination.index,0,taskObj);
                return {
                    ...list,
                    [source.droppableId]:copy
                }
            })
        }



    }

    return (
        <Wrapper>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="all-columns" direction="horizontal" type="column">
                    {
                        (provided)=>(
                            <BoardWrapper ref={provided.innerRef} {...provided.droppableProps}>
                                {
                                    Object.keys(allBoards).map((column,index)=>
                                        <Column key={column} draggableId={column} index={index} data={allBoards[column]}/>
                                    )
                                }
                                {provided.placeholder}
                            </BoardWrapper>
                        )
                    }
                </Droppable>
            </DragDropContext>
        </Wrapper>

    );
}

export default MyBoards;