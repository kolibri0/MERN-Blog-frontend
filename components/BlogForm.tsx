import * as React from 'react';
import 'easymde/dist/easymde.min.css'
import styles from '../styles/add.module.css'
import '../types'
import dynamic from 'next/dynamic'
import { IBlogForm } from '../Interface/IProps'
import '../pages/_app'


const SimpleMdeReact = dynamic(() => import("react-simplemde-editor"), {ssr: false})

interface IAutofocusNoSpellcheckerOptions{
  autofocus: boolean,
  spellChecker: boolean,
  sideBySideFullscreen: boolean,
}

const BlogForm: React.FC<IBlogForm> = (
    {onSubmit, text, title, setTitle, imgUrl, removeImgUrl, inputFileRef, onChange, changedInput, tags, setTags}
) => {
    
  const autofocusNoSpellcheckerOptions: IAutofocusNoSpellcheckerOptions = React.useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      sideBySideFullscreen: false,
    };
  }, []);

    return(<>
    {
      imgUrl
      ?<>
        <img className={styles.img} src={process.env.NEXT_PUBLIC_URL_REQUEST+`${imgUrl}`} />
        <button className={styles.delete} onClick={() => removeImgUrl()}>Delete</button>
       </>
      :null
    }
    <button className={styles.picture} onClick={() => inputFileRef.current.click()}>Add picture</button>
    <input ref={inputFileRef} type='file' onChange={changedInput} hidden/>
    <input className={styles.inputs} placeholder="Enter title..." value={title} onChange={(e) => setTitle(e.target.value)}/>
    <input className={styles.inputs} type='text' placeholder="Exemple tag,tag,tag" value={tags} onChange={(e) => setTags(e.target.value)} />
    <SimpleMdeReact className={styles.markdown} value={text} onChange={onChange} options={autofocusNoSpellcheckerOptions}/>
    <button className={styles.submit} onClick={() => onSubmit()}>Submit</button>
    </>)
}
 
export default BlogForm;