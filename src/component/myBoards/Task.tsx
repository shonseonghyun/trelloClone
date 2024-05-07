import { IToDo, toDoState } from '../../atoms/toDoAtom';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';
import { Draggable } from 'react-beautiful-dnd';

const Wrapper = styled.div<{isDragging:boolean}>`
  background-color:${(props)=>props.isDragging? '#74b9ff' : props.theme.cardColor};
  border-radius:5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  display:flex;
  justify-content: space-between;
`;

const Form = styled.form`
    width:100%;
`;

interface ITaskProps {
    boardId:string,
    data:IToDo,
    index:number
}

interface IUpdateInputProps{
    updateContent:string,
}

const Task = ({boardId,data,index}:ITaskProps) => {
    const [allBoards,setAllBoards] = useRecoilState(toDoState);
    const [isUpate,setIsUpdate] = useState(false);
    const {register,handleSubmit,getValues} = useForm<IUpdateInputProps>();

    console.log(data.text,"has been rendered");

    const onValid= ()=>{

    }

    const updateClick=()=>{
        if(!isUpate){
            console.log("업데이트위해 클릭");
            setIsUpdate(true);
        }
        else{
            setIsUpdate(!isUpate);
            //전과 같다면 set하지 않기
            // if(getValues("updateContent")==)

            setAllBoards((boards)=>{
                const newContent = getValues("updateContent");
                const copy = [...allBoards[boardId]];
                const newContentData = {
                    id: Date.now(),
                    text:newContent
                }
                copy.splice(index,1);
                copy.splice(index,0,newContentData)

                return {
                    ...boards,
                    [boardId]: copy
                }
            })

        }
        
    }

    const delClick = ()=>{
        setAllBoards((list)=>{
          const copyBoard = [...allBoards[boardId]];
          copyBoard.splice(index,1);
          return {
            ...allBoards,
            [boardId]:copyBoard
          }
        })
      }

    return (
        <Draggable draggableId={data.id+""} index={index}>
    {
        (provided,snapshot)=>(
            <Wrapper ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} isDragging={snapshot.isDragging}>
                    {
                        isUpate 
                        ? 
                            <Form onSubmit={handleSubmit(onValid)}>
                                <input type="text" {...register("updateContent")} defaultValue={data.text} />
                            </Form> 
                        :
                        <div > 
                            <span style={{verticalAlign:"center"}}>
                                {data.text}
                            </span>
                        </div>
                    }
                <div>
                    <button onClick={updateClick}>update</button>
                    <button onClick={delClick}>del</button>
                </div>
            </Wrapper>
        )
    }
</Draggable>       
    );
}

export default React.memo(Task);