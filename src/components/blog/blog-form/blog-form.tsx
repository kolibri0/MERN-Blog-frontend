import React, { LegacyRef } from "react";
import SimpleMdeReact from "react-simplemde-editor";

import styles from '../add-post/add.module.css'

interface IProps{
  onSubmit: any,
  text: string,
  title: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>,
  imgUrl: string,
  removeImgUrl: any,
  inputFileRef: any,
  onChange: any,
  changedInput: any,
  tags: string,
  setTags: React.Dispatch<React.SetStateAction<string>>
  
}


const BlogForm: React.FC<IProps> = (
    {onSubmit, text, title, setTitle, imgUrl, removeImgUrl, inputFileRef, onChange, changedInput, tags, setTags}
) => {

    const autofocusNoSpellcheckerOptions = React.useMemo(() => {
        return {
          autofocus: true,
          spellChecker: false,
          
        };
    }, []);

    return(<>
        {imgUrl
            ?<>
              <img className={styles.img} src={ process.env.REACT_APP_URL_REQUEST_IMG + `${imgUrl}`} />
              <button className={styles.delete} onClick={() => removeImgUrl()}>Delete</button>
             </>
            :null}
            <button className={styles.picture} onClick={() => inputFileRef.current.click()}>Add picture</button>
            <input ref={inputFileRef} type='file' onChange={changedInput} hidden/>
            <input className={styles.inputs} placeholder="Enter title..." value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input className={styles.inputs} type='text' placeholder="Exemple tag,tag,tag" value={tags} onChange={(e) => setTags(e.target.value)} />
            <SimpleMdeReact className={styles.markdown} value={text} onChange={onChange} options={autofocusNoSpellcheckerOptions}/>
            <button className={styles.submit} onClick={() => onSubmit()}>Submit</button>
        </>)

}

export default BlogForm