import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import { IToDo, toDoState } from "../../atoms/toDoAtom";
import { useForm } from "react-hook-form";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  background-color:${(props)=>props.theme.boardColor};
  padding-top:10px;
  padding: 10px 0px;
  border-radius:5px;
  min-height: 300px;
  display:flex;
  flex-direction:column;
`;

interface IAreaProps{
    isDraggingOver:boolean,
    isDraggingFrom:boolean
}

const Area = styled.div<IAreaProps>`
    background-color:${props=>props.isDraggingOver ? '#dfe6e9' : props.isDraggingFrom ? '#b2bec3': "transparent"};
    flex-grow:1;
    transition:background-color .3s ease-in-out;
    padding:20px;
`;

const Title = styled.h2`
    text-align:center;
    font-weight:600;
    margin-bottom:10px;
    font-size:18px;
`;

const Form = styled.form`
    width:100%;
`;

const Input = styled.input`
    width:100%;
`;
interface IBoardProps{
    toDos:IToDo[],
    boardId:string
}

interface IForm{
    toDo:string
}


function Board({toDos,boardId}:IBoardProps){
    const {register,setValue,handleSubmit} = useForm<IForm>();
    const [allBoards,setAllBoards] = useRecoilState(toDoState); 

    const onValid= (data:IForm)=>{
        if(!data.toDo){
            alert("fill out toDo");
            return;
        }

        const newToDo = {
            id:Date.now(),
            text: data.toDo
        }
        setAllBoards((list)=>{
            return {
                ...allBoards,
                [boardId]:[...allBoards[boardId],newToDo]
            }
        })
        setValue("toDo","");
    }

    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input type="text" placeholder="fill out" {...register("toDo")}/>
            </Form>
            
            <Droppable droppableId={boardId}>
                {(magic,snapshot)=>
                <Area isDraggingOver={snapshot.isDraggingOver} isDraggingFrom={Boolean(snapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
                    {
                        toDos.map((toDo,index) =>
                            <DraggableCard boardId={boardId} toDoId={toDo.id} toDoText={toDo.text} index={index} key={toDo.id}/>
                    )}
                {magic.placeholder}
                </Area>
                }
            </Droppable>
        </Wrapper>
    );
}

// export default React.memo(Board);
export default Board;