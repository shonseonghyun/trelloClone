import { Draggable, Droppable } from 'react-beautiful-dnd';
import Task from './Task';
import { IToDo, toDoState } from '../../atoms/toDoAtom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import React, { useRef } from 'react';
import { useRecoilSnapshot, useRecoilState } from 'recoil';

const Wrapper = styled.div`
  background-color:${(props)=>props.theme.boardColor};
  padding-top:10px;
  padding: 10px 0px;
  border-radius:5px;
  min-height: 300px;
  display:flex;
  flex-direction:column;
`;

const Title = styled.h2`
    text-align:center;
    font-weight:600;
    margin-bottom:10px;
    font-size:18px;
`;

const Form = styled.form`
    width:100%;
    margin-bottom:10px;
`;

interface IColumnProps{
    draggableId:string,
    index: number;
    data: IToDo[] ,
}

interface IFormProps{
    content:string
}

const Column = ({draggableId,index,data}:IColumnProps) => {
    const [allBoards,setAllBoards] = useRecoilState(toDoState); 
    const {register,getValues,setValue,handleSubmit,formState} = useForm<IFormProps>();

    const onValid = (data:IFormProps)=>{
        const content = data.content;

        const newContent = {
            id:Date.now(),
            text: content
        }

        setAllBoards((boards)=>{
            return {
                ...boards,
                [draggableId]:[...allBoards[draggableId],newContent]
            }
        })
        
        setValue("content","");
    }

    const onInValid=(data:any)=>{
        alert(formState.errors.content?.message);
    }

    return (
        <Draggable draggableId={draggableId} index={index}>
            {
                (provided)=>(
                    <Wrapper ref={provided.innerRef} {...provided.draggableProps}>
                        <Title {...provided.dragHandleProps}>{draggableId}</Title>
                        <div>
                            <Form onSubmit={handleSubmit(onValid,onInValid)}>
                                <input type="text" {...register("content",{
                                    required:"입력 바랍니다."
                                })}/>
                                <button>입력</button>
                            </Form>
                        </div>
                        <Droppable droppableId={draggableId}>
                            {
                                (provided)=>(
                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                        {
                                            data.map((content,index)=>(
                                                <Task key={content.id} boardId={draggableId} data={content} index={index}></Task>
                                            ))
                                        }
                                        {provided.placeholder}
                                    </div>
                                )
                            }
                        </Droppable>
                    </Wrapper>
                )
            }
        </Draggable>
    );
};

export default React.memo(Column);