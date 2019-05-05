import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import classNames from "classnames/bind";
import styles from "./Enrolment.scss";

const cx = classNames.bind(styles);

const insertNthumbs = {
  display: 'block',
  width: '100%',
  height: '80%',
  border: '1px solid #707070',
  boxSizing: 'border-box'
}

const textStyle = {
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0'
};

const thumbsContainer = {
  display: 'flex',
  marginTop: 16,
  overflowX: 'auto' 
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const fullThumb = {
  width: '100%',
  height: '100%'
}

const thumbInner = {
  display: 'flex',
  position: 'relative',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const addImgae = {
  display: 'block',
  width: '90px',
  height: '100%',
}

const EnrolmentStep3 = (props) => {
  const [files, setFiles] = useState([]);
  let fileIndex = [];
  const selectThumb = (file) => {
    document.querySelector("#imgThumb").src = file.preview;
  }

  const deleteThumb = (thisFile, fileIdx) => {
    let thumb = document.querySelector("#imgThumb").src;
    let fileIndex = files.findIndex(file => file.name === thisFile.name);

    if (fileIdx.length === 1) {
      fileIdx.pop();
      // document.querySelector("#insertContainer").style.visibility = 'visible';
      // document.querySelector("#thumbContainer").style.visibility = 'hidden';
    } else if (thumb === files[fileIndex].preview) {
      fileIdx.splice(fileIndex, 1);
      document.querySelector("#imgThumb").src = files[0].preview;
    } else fileIdx.splice(fileIndex, 1);

    props.saveImage(files, fileIndex);

    document.querySelector(`#${thisFile.idx}`).style.display = 'none';
  }

  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map((file, idx) => {
        fileIndex.push(idx);
        return Object.assign(file, {
        preview: URL.createObjectURL(file),
        idx: `image${idx}`
      })
    }));
      // document.querySelector("#imgThumb").src = acceptedFiles[0].preview;
      // document.querySelector("#insertContainer").style.visibility = 'hidden';
      // document.querySelector("#thumbContainer").style.visibility = 'visible';

      props.saveImage(acceptedFiles, fileIndex);
    }
  });
  
  const images = files.map(file => (
    <div id={file.idx} style={Object.assign({}, thumb, file.display ? "display : block" : "display : none")} key={file.name}>
      <div style={thumbInner}>
        <span className={cx("delete-thumb")} onClick={deleteThumb.bind(this, file, fileIndex)}></span>
        <img
          onClick={selectThumb.bind(this, file)}
          alt="cockatil"
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className={cx("step", "step3")}>
        <div className={cx("step3-container")}>
          <div id="insertContainer" style={insertNthumbs} {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p style={textStyle}>Drag 'n' drop some photo here, or click to select files</p>

            <div id="thumbContainer" style={Object.assign({}, insertNthumbs, {visibility: 'hidden', position: 'absolute', top: 0, left: 0})}>
              <div style={Object.assign({}, thumb, fullThumb)}>
                <div style={thumbInner}>
                  <img id="imgThumb" alt="Thumb"/>
                </div>
              </div>
            </div>
          </div>

          <aside style={thumbsContainer}>
            <div style={thumb}>
              <div style={thumbInner}>
                <span
                  style={addImgae}
                />
              </div>
            </div>

            {files && files.length ? images : ""}
          </aside>
        </div>
    </div>
  );
};

export default EnrolmentStep3;