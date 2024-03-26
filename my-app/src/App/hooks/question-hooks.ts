import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';
import { API, hasUser } from "@/utils";

type Props ={
handleShowAddQ:()=> void;
}

export const useGetQuestions = ({handleShowAddQ}:Props)=>{
          const navigate = useNavigate();
          const {data:questions, isLoading} = useQuery<any>({
                    queryKey:['question'],
                    queryFn:async()=>{
                              const response = await API.get("/getSubject");
                              if (hasUser) navigate("/shared");
                              handleShowAddQ();
                              return response.data
                    }
          })
                                                                                                    
          return {questions , isLoading}
}