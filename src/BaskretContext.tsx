import axios from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface CommitContextType {}

const CommitContext = createContext<CommitContextType | undefined>(undefined);

export const useCommit = () => useContext(CommitContext);
const CommitContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const API_COMMIT_CONTEXT =
    "https://65f2daee105614e6549f1bec.mockapi.io/book_shop/commits";
    
  const [commit, setCommit] = useState([]);
  async function addCommit(obj: object) {
    await axios.post(API_COMMIT_CONTEXT, obj);
    getCommit()
  }
  async function getCommit() {
   let {data} = await axios.get(API_COMMIT_CONTEXT)
   setCommit(data.reverse())
  }
  async function basketRemove(id:any){
    await axios.delete(`${API_COMMIT_CONTEXT}/${id}`)
    getCommit()
  }
  async function EditCommit(object:any) {
    await axios.put(`${API_COMMIT_CONTEXT}/${object.id}`, object)
    getCommit()
  }

  useEffect(() => {
    getCommit();
  }, []);
  const values: CommitContextType = {
    addCommit,
    commit,
    basketRemove,
    EditCommit
  };
  return (
    <CommitContext.Provider value={values}>{children}</CommitContext.Provider>
  );
};

export default CommitContextProvider;
